import { Global } from '@emotion/react'
import tw, { css, theme } from 'twin.macro'

import { theme as uiTheme } from '../components/UI'


const customStyles = css({

	body: {
		WebkitTapHighlightColor: theme`colors.purple.500`,
		...tw`antialiased`,
	},
})

const GlobalStyles = () => (
	<>
		<Global styles={customStyles}/>
		<Global styles={css`
			html,
			body,
			#root {
				overflow-x: hidden;
				align-content: center;
				min-height: 100%;
			}


			body {
				transition: all 0.4s linear;
			}

			:root {
				min-height: 100%;
				background-color: #FAFCFE;
				--toastify-color-light: ${uiTheme.colorScheme.light};
				--toastify-color-dark: ${uiTheme.colorScheme.overlaysDark};
				--toastify-text-color-light: ${uiTheme.colorScheme.body2};
				--toastify-text-color-dark: ${uiTheme.colorScheme.accent};
			}

			:root .dark {
				background-color: #2A2A36;
			}

			html {
				background-color: #FAFCFE;
			}

			html.dark {
				background-color: #2A2A36;
			}

			#app {
				height: 100%;
				margin: 0;
				padding: 0;
			}

			body {
				color: black;
				background-color: #FAFCFE;
				height: 100%;
			}

			.dark body {
				color: white;
				background-color: #2A2A36;
			}

			#nprogress {
				pointer-events: none;
			}

			#nprogress .bar {
				z-index: 1031;
				background: #4592ea;
			}

			/* Designing for scroll-bar */

			::-webkit-scrollbar {
				width: 6px;
			}

			/* Track */

			::-webkit-scrollbar-track {
				border-radius: 20px;
				background-color: #FAFCFE;
				transition: all 400ms linear;
			}

			.dark ::-webkit-scrollbar-track {
				background-color: #2A2A36;
				transition: all 400ms linear;
			}

			/* Handle */

			::-webkit-scrollbar-thumb {
				background: #afafaf;
				border-radius: 60px;
			}

			/* Handle on hover */

			::-webkit-scrollbar-thumb:hover {
				background: #d5d5d5;
			}


			#nprogress .bar {
				position: fixed;
				z-index: 1031;
				top: 0;
				left: 0;

				width: 100%;
				height: 4px;
			}

			* {
				font-family: 'Work Sans', 'Heebo', sans-serif;
			}
		`}/>
	</>
)

export default GlobalStyles
