import type { Language } from 'plugins/i18n'

import { LocalStorage } from "../modules/LocalStorage"
import { IconButton } from './UI'
import { IconButtonProps } from "./UI/Buttons/IconButton"


const LanguageSelector = (props: IconButtonProps) => {
	const { i18n } = useTranslation()

	const changeLanguage = async (language: Language): Promise<void> => {
		await i18n.changeLanguage(language)
		LocalStorage.setLanguage(language)
		document.dir = i18n.dir()
	}

	const languageToggle = async (): Promise<void> => {
		await changeLanguage(i18n.language === 'en' ? 'he' : 'en')
	}

	return (
		<IconButton {...props}
		            aria-label="language"
		            id="language-toggle-button"
		            onClick={async () => await languageToggle()}>
			<IconCarbonLanguage/>
		</IconButton>
	)
}

export default LanguageSelector
