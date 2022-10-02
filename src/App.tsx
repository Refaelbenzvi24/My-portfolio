import { ReactElement } from "react"

import {
	useRoutes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import ReloadPrompt from './components/ReloadPrompt'
import { useTheme } from "./context"
import routes from '~react-pages'


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
