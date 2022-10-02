import {
	useRoutes,
} from 'react-router-dom'

import ErrorsBoundary from "./components/ErrorsBoundary"
import ReloadPrompt from './components/ReloadPrompt'
import Providers, { useTheme } from "./context"
import routes from '~react-pages'
import { ReactElement } from "react"
import { ToastContainer } from 'react-toastify'


function Pages(): ReactElement | null {
	return useRoutes(routes)
}

const App = () => {
	const { theme } = useTheme()

	return (
		<>
			<ReloadPrompt/>
			<ToastContainer theme={theme}
			                closeButton={false}
			                limit={3}/>
			<Pages/>
		</>
	)
}

export default App
