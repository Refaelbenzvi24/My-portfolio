import { useEffect, useState } from 'react'
import type { ReactElement } from 'react'

import UAParser from "ua-parser-js"

import { defaultMainData, MainContext } from './MainContext'
import type { MainProviderOptions } from './types'

let lastScrollY = 0

const {
	      appBarState:  defaultAppBarState,
	      appBarOpts:   defaultAppBarOptions,
	      sideBarState: defaultSideBarState,
	      sideBarOpts:  defaultSideBarOptions,
	      overlayState: defaultOverlayState,
} = defaultMainData


const MainProvider = (props: MainProviderOptions): ReactElement => {
	const { children } = props

	const [appBarState, setAppBarState]             = useState(defaultAppBarState)
	const [appBarOptions, setAppBarOptions]         = useState(defaultAppBarOptions)
	const [sideBarState, setSideBarState]           = useState(defaultSideBarState)
	const [overlayState, setOverlayState]           = useState(defaultOverlayState)
	const [sideBarOptions, setSideBarOptions]       = useState(defaultSideBarOptions)
	const [disableAnimations, setDisableAnimations] = useState(false)
	const [isMobile, setIsMobile]                   = useState<boolean>(false)
	const [isTouchable, setIsTouchable]             = useState<boolean>(false)
	const [scrollDirection, setScrollDirection]     = useState<'up' | 'down'>('down')

	const isTouchListener = () => setIsTouchable(() => true)

	const scrollDirectionHandler = () => {
		const scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up'
		setScrollDirection(scrollDirection)
		lastScrollY = window.scrollY
	}

	useEffect(() => {
		window.addEventListener('touchstart', isTouchListener)
		window.addEventListener('scroll', scrollDirectionHandler)

		return () => {
			window.removeEventListener('touchstart', isTouchListener)
			window.removeEventListener('scroll', scrollDirectionHandler)
		}
	}, [])


	useEffect(() => {
		setIsTouchable(() => false)
		const userAgent = new UAParser(window.navigator.userAgent).getResult()

		setIsMobile(userAgent.device.type === "mobile" || userAgent.device.type === "tablet")
	}, [window.innerWidth, window.innerHeight])


	return (
		<MainContext.Provider value={
			// eslint-disable-next-line react/jsx-no-constructed-context-values -- should be re-rendered every time that values are changed - this has effect on whole contained items perspective
			{
				isMobile,
				isTouchable,
				scrollDirection,
				appBarState,
				setAppBarState,
				appBarOpts:     appBarOptions,
				setAppBarOpts:  setAppBarOptions,
				sideBarState,
				setSideBarState,
				sideBarOpts:    sideBarOptions,
				setSideBarOpts: setSideBarOptions,
				overlayState,
				setOverlayState,
				disableAnimations,
				setDisableAnimations,
			}
		}>
			{children}
		</MainContext.Provider>
	)
}

export default MainProvider
