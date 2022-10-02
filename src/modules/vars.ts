import { ThemeName } from '../components/UI/Theme/types'
import { Language } from "../plugins/i18n"


export interface EnvFileProps {
	VITE_APP_NAME: string;
	VITE_ENV: string;
	VITE_DEFAULT_THEME: string;
	VITE_DEFAULT_LANGUAGE: string;
	VITE_EMAILJS_PUBLIC_KEY: string;
	VITE_EMAILJS_TEMPLATE_ID: string;
	VITE_EMAILJS_SERVICE_ID: string;
}

export class Vars {
	static appName: string

	static env: string

	static showAnimations: boolean

	static emailJs: { publicKey: string, templateId: string, serviceId: string }

	static language: { default: Language }

	static theme: { default: ThemeName }

	static setupVars(envVars: EnvFileProps) {
		Vars.appName        = envVars.VITE_APP_NAME
		Vars.env            = envVars.VITE_ENV
		Vars.showAnimations = envVars.VITE_ENV === 'production' || true
		Vars.emailJs        = {
			publicKey:  envVars.VITE_EMAILJS_PUBLIC_KEY,
			templateId: envVars.VITE_EMAILJS_TEMPLATE_ID,
			serviceId:  envVars.VITE_EMAILJS_SERVICE_ID,
		}
		Vars.language       = { default: envVars.VITE_DEFAULT_LANGUAGE as Language }
		Vars.theme          = { default: envVars.VITE_DEFAULT_THEME as ThemeName }
	}
}
