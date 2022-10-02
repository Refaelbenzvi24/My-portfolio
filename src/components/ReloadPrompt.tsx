import { useRegisterSW } from 'virtual:pwa-register/react'

import useToasts from "../hooks/useToasts"


const ReloadPrompt = () => {
	const {
		      offlineReady: [offlineReady, setOfflineReady],
		      needRefresh:  [needRefresh, setNeedRefresh],
		      updateServiceWorker,
	      } = useRegisterSW({
		// onRegistered(r) {
		// },
		// onRegisterError(error) {
		// },
	})

	const toasts = useToasts()

	const close = () => {
		setOfflineReady(false)
		setNeedRefresh(false)
	}

	if (offlineReady || needRefresh) {
		toasts.reloadPrompt(offlineReady, needRefresh, updateServiceWorker, close)
	}

	return (
		<></>
	)
}

export default ReloadPrompt
