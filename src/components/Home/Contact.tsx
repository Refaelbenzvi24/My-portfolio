import { ReactNode, useRef, useState } from "react"

import { useFormik } from "formik"
import { motion } from "framer-motion"
import { Textfit } from "react-textfit"
import * as Yup from "yup"

import useAnimations, { generalAnimations } from "../../hooks/useAnimations"
import useToasts from "../../hooks/useToasts"
import useWindowVars from "../../hooks/useWindowVars"
import { ATagButton, Button, Col, Divider, isDark, Row, TextArea, TextField, theme, Typography } from "../UI"


interface ContactProps {
	innerRef: (node?: Element | null) => void
	email: string
	linksList: { link: string, icon: ReactNode, [key: string]: any }[]
}

const Contact = (props: ContactProps) => {
	const { innerRef, linksList, email } = props

	const nameTextFieldRef = useRef<HTMLInputElement>(null)
	const toasts           = useToasts()

	const [isTitleInView, setIsTitleInView]           = useState(false)
	const [nameIsInView, setNameIsInView]             = useState(false)
	const [emailIsInView, setEmailIsInView]           = useState(false)
	const [messageIsInView, setMessageIsInView]       = useState(false)
	const [submitBtnIsInView, setSubmitBtnIsInView]   = useState(false)
	const [getInTouchIsInView, setGetInTouchIsInView] = useState(false)

	const { t }           = useTranslation()
	const { windowWidth } = useWindowVars()
	const animations      = useAnimations()

	const formik = useFormik({
		initialValues:    {
			name:    '',
			email:   '',
			message: '',
		},
		validationSchema: Yup.object({
			name:    Yup.string()
				         .required('contact.nameRequired'),
			email:   Yup.string()
				         .required('contact.emailRequired')
				         .email('contact.emailInvalid'),
			message: Yup.string()
				         .required('contact.messageRequired'),
		}),
		validateOnChange: false,
		validateOnBlur:   false,
		onSubmit:         async (values) => {
			await toasts.sendEmail(values)
			formik.resetForm()
		},
	})

	return (
		<Col className="overflow-hidden" ref={innerRef} id="contact">
			<Col {...generalAnimations.fadeInOut}>
				<Row
					animate={isTitleInView ? (animations.sectionTitle.inView) : animations.sectionTitle.outOfView}
					viewport={{ once: true }}
					onViewportEnter={() => setIsTitleInView(true)}
					className="items-center w-[100%]">
					<Textfit className="w-fit max-w-[60%]" mode="single" forceSingleModeWidth min={30}>
						<Typography className={`whitespace-nowrap ${windowWidth > 1000 ? '' : 'w-fit'}`}
						            size={windowWidth > 1000 ? '' : 'inherit'}
						            variant="h2"
						            color={theme.colorScheme.primary}>
							{t('contact.title')}
						</Typography>
					</Textfit>

					<Divider className={`ml-[16px] rtl:mr-[16px] mt-[6px] ${windowWidth > 1000 ? 'mr-[330px] rtl:ml-[330px]' : 'w-[40%]'}`}
					         color={theme.colorScheme.primary}/>
				</Row>
				<form
					className={`pt-[96px] ${windowWidth > 600 ? 'px-[60px]' : (windowWidth > 350 ? 'px-4' : '')}`}
					onSubmit={formik.handleSubmit}>
					<Col>
						<motion.div
							viewport={{ once: true }}
							onViewportEnter={() => setNameIsInView(true)}
							animate={
								nameIsInView ? animations.contact.formItem.inView : animations.contact.formItem.outOfView
							}>
							<TextField
								innerRef={nameTextFieldRef}
								className="pt-2"
								id="name"
								label={t('contact.labels.name')}
								value={formik.values.name}
								onChange={formik.handleChange}
								onInput={() => !formik.isValid && formik.validateField('name')}
								onBlur={async () => formik.validateField('name')}
								helperText={formik.errors.name ? t(formik.errors.name) : ''}
								error={!!formik.errors.name}/>
						</motion.div>

						<motion.div
							viewport={{ once: true }}
							onViewportEnter={() => setEmailIsInView(true)}
							animate={
								emailIsInView ? animations.contact.formItem.inView : animations.contact.formItem.outOfView
							}>
							<TextField
								className="pt-2"
								id="email"
								label={t('contact.labels.email')}
								value={formik.values.email}
								onChange={formik.handleChange}
								onInput={() => !formik.isValid && formik.validateField('email')}
								onBlur={async () => formik.validateField('email')}
								helperText={formik.errors.email ? t(formik.errors.email) : ''}
								error={!!formik.errors.email}/>
						</motion.div>

						<motion.div
							viewport={{ once: true }}
							onViewportEnter={() => setMessageIsInView(true)}
							animate={
								messageIsInView ? animations.contact.formItem.inView : animations.contact.formItem.outOfView
							}>
							<TextArea
								className="pt-2"
								id="message"
								label={t('contact.labels.message')}
								minHeight="200px"
								value={formik.values.message}
								onChange={formik.handleChange}
								onBlur={async () => formik.validateField("message")}
								helperText={formik.errors.message ? t(formik.errors.message) : ''}
								error={!!formik.errors.message}/>
						</motion.div>
					</Col>


					<Button
						viewport={{ once: true }}
						onViewportEnter={() => setSubmitBtnIsInView(true)}
						animate={
							submitBtnIsInView ? animations.contact.formItem.inView : animations.contact.formItem.outOfView
						}
						className="mt-4 flex items-center justify-center"
						type="submit"
						width="175px"
						height="40px"
						disabled={formik.isSubmitting || !formik.isValid}
						colorsForStates={theme.colorSchemeByState.primary}>
						<Typography variant="bold" color={theme.colorScheme.light}>
							{t('contact.submit')}
						</Typography>
					</Button>
				</form>

				<Col
					viewport={{ once: true }}
					onViewportEnter={() => setGetInTouchIsInView(true)}
					animate={
						getInTouchIsInView ? animations.contact.formItem.inView : animations.contact.formItem.outOfView
					}>
					<Row className="pt-[48px] justify-center">
						<Typography variant="button"
						            color={isDark() ? theme.colorScheme.light : theme.colorScheme.header1}
						            size={0.8}
						            weight={400}>
							{t('getInTouch')}
						</Typography>
					</Row>

					<Row className="pt-[14px] pb-[24px] justify-center space-x-[18px] rtl:space-x-reverse">
						<ATagButton
							className="p-2"
							aria-label="Email"
							{...animations.bottomLinks}
							animate={{
								opacity:    1,
								transition: {
									duration: 0.5,
								},
							}}
							whileHover={{
								translateY: -5,
								transition: { duration: 0.25, delay: 0 },
							}}
							colorsForStates={theme.colorSchemeByState.primary}
							href={`mailto:${email}`}
							text
							icon
							size="18px">
							<IconIcOutlineEmail/>
						</ATagButton>

						{linksList.map(({ tooltip, link, icon }, index) => (
							<ATagButton
								key={index}
								className="p-2"
								aria-label={tooltip}
								{...animations.bottomLinks}
								animate={{
									opacity:    1,
									transition: {
										delay:    0.1 + index * 0.1,
										duration: 0.5,
									},
								}}
								whileHover={{
									translateY: -5,
									transition: { duration: 0.25, delay: 0 },
								}}
								colorsForStates={theme.colorSchemeByState.primary}
								href={link}
								text
								icon
								size="18px">
								{icon}
							</ATagButton>
						))}
					</Row>
				</Col>
			</Col>
		</Col>
	)
}

export default Contact
