import { Suspense } from 'react'

// @ts-expect-error react types not compatible yet.
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import './setup'
import './styles/main.css'
import '@fontsource/work-sans/400.css'
import '@fontsource/work-sans/500.css'
import '@fontsource/work-sans/700.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'
import { ProgressSpinner } from './components/UI'
import Plugins from "./plugins"
import GlobalStyles from "./styles/GlobalStyles"
import ErrorsBoundary from "./components/ErrorsBoundary"
import Providers from "./context"


const Main = () => {
	Plugins()

	return (
		<>
			<GlobalStyles/>
			<Suspense fallback={<ProgressSpinner/>}>
				<ErrorsBoundary>
					<Providers>
						<App/>
					</Providers>
				</ErrorsBoundary>
			</Suspense>
		</>
	)
}


// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const root = createRoot(document.querySelector('#root') as Element)

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
root.render(
	<Router>
		<Main/>
	</Router>,
)
