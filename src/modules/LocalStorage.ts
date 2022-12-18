import type { ThemeName } from '../components/UI/Theme/types'
import type { Language } from '../plugins/i18n'


export class LocalStorage {
	static THEME = 'theme'

	static LANGUAGE             = 'i18nextLng'
	static IS_ANIMATIONS_ACTIVE = 'is_animations_active'

	static getTheme(): ThemeName | undefined {
		const theme = localStorage.getItem(LocalStorage.THEME)
		return theme as ThemeName | undefined
	}

	static setTheme(theme: boolean | string) {
		localStorage.setItem(LocalStorage.THEME, theme.toString())
	}

	static getLanguage() {
		const language = localStorage.getItem(LocalStorage.LANGUAGE)
		return language as Language | undefined
	}

	static setLanguage(language: Language) {
		localStorage.setItem(LocalStorage.LANGUAGE, language)
	}

	static getIsAnimationsActive() {
		const isAnimationsActive = localStorage.getItem(LocalStorage.IS_ANIMATIONS_ACTIVE)
		return isAnimationsActive === null ? null : isAnimationsActive === 'true'
	}

	static setIsAnimationsActive(isAnimationsActive: boolean) {
		localStorage.setItem(LocalStorage.IS_ANIMATIONS_ACTIVE, String(isAnimationsActive))
	}
}

export default {}
