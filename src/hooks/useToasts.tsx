import emailjs from "@emailjs/browser"
import i18n from "i18next"
import { toast } from "react-toastify"

import { Button, isDark, Row, theme, Typography } from "../components/UI"
import { Vars } from "../modules/vars"
import useWindowVars from "./useWindowVars"


const useToasts = () => {
	const isDarkMode      = isDark()
	const { isTouchable } = useWindowVars()
	const { windowWidth } = useWindowVars()

	const { t } = useTranslation()


	const sendEmail = async (values: { name: string, email: string, message: string }) => {
		return await toast.promise(emailjs.send(Vars.emailJs.serviceId, Vars.emailJs.templateId, values, Vars.emailJs.publicKey), {
			pending: {
				render: () => (
					<Row className="justify-between items-center">
						<Typography className={windowWidth > 410 ? "whitespace-nowrap" : ""} variant="body">
							{t('contact.emailSending')}
						</Typography>
					</Row>
				),
			},
			success: {
				render: () => (
					<Row className="justify-between items-center">
						<Typography className={windowWidth > 410 ? "whitespace-nowrap" : ""} variant="body">
							{t('contact.emailSent')}
						</Typography>
						<Button text
						        colorsForStates={isDarkMode ? theme.colorSchemeByState.accent : theme.colorSchemeByState.body2}
						        onClick={() => toast.dismiss('email-toast')}>
							<Typography variant="body" color="inherit">
								{t('dismiss')}
							</Typography>
						</Button>
					</Row>
				),
			},
			error:   {
				render: () => (
					<Row className="justify-between items-center">
						<Typography className={windowWidth > 530 ? "whitespace-nowrap" : ""} variant="body">
							{t('contact.sendingError')}
						</Typography>
						<Button text
						        colorsForStates={isDarkMode ? theme.colorSchemeByState.accent : theme.colorSchemeByState.body2}
						        onClick={() => toast.dismiss('email-toast')}>
							<Typography variant="body" color="inherit">
								{t('dismiss')}
							</Typography>
						</Button>
					</Row>
				),
			},
		}, {
			toastId:      'email-toast',
			position:     "bottom-left",
			rtl:          i18n.dir() === 'rtl',
			draggable:    isTouchable,
			pauseOnHover: true,
			closeOnClick: false,
			style:        {
				width: windowWidth > 530 ? 'fit-content' : '100%',
			},
		})
	}

	const reloadPrompt = (offlineReady: boolean, needRefresh: boolean, updateServiceWorker: (value: boolean) => Promise<void>, close: () => void) => {
		return toast.info(() => (
			<Row className="justify-between items-center">
				{offlineReady
					? (
						<Typography variant="body">
							{t('reloadPrompt.offlineReady')}
						</Typography>
					)
					: <Typography variant="body">{t('reloadPrompt.newContent')}</Typography>}

				{needRefresh ? (
					<Button
						text
						colorsForStates={isDarkMode ? theme.colorSchemeByState.accent : theme.colorSchemeByState.body2}
						onClick={() => toast.dismiss('reload-prompt-toast')}>
						{t('reloadPrompt.reload')}
					</Button>
				) : null}
				<Button
					text
					colorsForStates={isDarkMode ? theme.colorSchemeByState.accent : theme.colorSchemeByState.body2}
					onClick={() => toast.dismiss('reload-prompt-toast')}>
					{t('reloadPrompt.close')}
				</Button>
			</Row>
		), {
			onClose:      () => {
				needRefresh ? updateServiceWorker(false) : close()
			},
			toastId:      'reload-prompt-toast',
			position:     "bottom-left",
			rtl:          i18n.dir() === 'rtl',
			draggable:    isTouchable,
			pauseOnHover: true,
			closeOnClick: false,
			style:        {
				width: windowWidth > 530 ? 'fit-content' : '100%',
			},
		})
	}


	return { sendEmail, reloadPrompt }
}

export default useToasts
