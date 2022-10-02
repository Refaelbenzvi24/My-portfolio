import '@emotion/react'


declare module '@emotion/react' {
	export interface Theme {
		lang: string
		isDark: boolean;
	}
}
