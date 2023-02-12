import { useEffect } from 'react'

import { css } from "@emotion/css"
import clsx from "clsx"
import tw from "twin.macro"
import type { ReactDivProps } from 'types'

import { useMain } from "../../../context"
import Backdrop from "../Backdrop/Backdrop"
import theme from "../Utils/theme"
import { marginTransition } from "../Utils/transitions"
import MainProvider from './MainProvider'
import useDimensions from "../../../hooks/useDimensions"


interface MainProps extends ReactDivProps {
	dark?: boolean
}


const Main = (props: MainProps) => {
	const { appBarState, appBarOpts, sideBarState: sideBar, sideBarOpts, overlayState, setSideBarState, setOverlayState } = useMain()

	const overlaysRoot    = document.querySelector('#portals-root')
	const { windowWidth } = useDimensions()

	const { children, className, dark } = props
	const { shrinkPoint }               = sideBarOpts

	useEffect(() => {
		if (overlaysRoot?.childNodes && overlaysRoot.childNodes.length > 0) {
			setOverlayState(true)
		} else if (overlaysRoot?.childNodes.length === 0) {
			setOverlayState(false)
		}
	}, [])


	const overlayAction = () => {
		if (sideBar) {
			setSideBarState(false)
			setOverlayState(false)
		}
	}

	const shouldApplyMargins = () => !!(shrinkPoint && sideBar && windowWidth > shrinkPoint)


	return (
		<MainProvider>
			<div {...props}
			     id="main"
			     className={css`
				     ${tw`h-full`}

				     ${appBarState && `padding-top: ${appBarOpts.height}px;`}

				     ${[
					     theme.transitions([marginTransition()]),
					     theme.utils.conditionalMargins(shouldApplyMargins(), `${sideBarOpts.width}px`),
				     ]}
				     ${clsx(className)}
			     `}>


				{
					sideBar ? (
						<Backdrop {...{ dark }}
						          active={overlayState}
						          id="overlay-background"
						          role="presentation"
						          onClick={overlayAction}/>
					) : null
				}

				{children}

			</div>
		</MainProvider>
	)
}

Main.defaultProps = {
	dark: undefined,
}

export default Main
