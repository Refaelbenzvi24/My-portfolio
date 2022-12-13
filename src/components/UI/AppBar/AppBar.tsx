import { useEffect, useState } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion, HTMLMotionProps } from "framer-motion"
import tw from "twin.macro"

import { useMain } from "../../../context"
import theme from "../Utils/theme"


interface AppBarWrapperProps {
	dark?: boolean
	height: number
	backgroundColor: `#${number}`
	darkBackgroundColor: `#${number}`
	hasBackground: boolean
}


const AppBarWrapper = styled(motion.div)(({ height, hasBackground, backgroundColor, darkBackgroundColor, dark }: AppBarWrapperProps) => [
	tw`flex flex-row fixed w-full items-center`,

	hasBackground && css`
		background-color: ${backgroundColor};
		box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
	`,

	css`
		z-index: ${theme.zIndex.appBar};
		transition: all 150ms linear;
		height: ${height}px;
	`,

	(props) => (hasBackground && (dark || props.theme.isDark)) && css`
		background-color: ${darkBackgroundColor};
	`,
])

const defaultProps = {
	backgroundColor:     theme.colorScheme.accent,
	darkBackgroundColor: theme.colorScheme.overlaysDark,
	height:              84,
}

interface AppBarProps extends HTMLMotionProps<"div"> {
	hideOnScroll?: boolean
	backgroundColor?: string
	darkBackgroundColor?: string
	height?: number
}

const AppBar = (props: AppBarProps & typeof defaultProps & Omit<AppBarWrapperProps, 'hasBackground'>) => {
	const { children, ...restProps } = props

	const { setAppBarState, setAppBarOpts } = useMain()

	const [show, setShow]                   = useState(false)
	const [lastScrollY, setLastScrollY]     = useState(0)
	const [hasBackground, setHasBackground] = useState(window.scrollY > 20)

	const controlAppbar = () => {
		if (typeof window !== 'undefined') {
			if (window.scrollY > lastScrollY && window.scrollY > 20) setShow(false)

			if (window.scrollY <= lastScrollY) setShow(true)

			setLastScrollY(window.scrollY)
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', controlAppbar)

			return () => {
				window.removeEventListener('scroll', controlAppbar)
			}
		}
	}, [lastScrollY])

	useEffect(() => {
		setAppBarState(() => true)
		setShow(() => true)

		return () => {
			setAppBarState(() => false)
			setShow(() => false)
		}
	}, [])

	useEffect(() => {
		if (window.scrollY > 20 && show) setHasBackground(true)

		if (window.scrollY <= 20 && show) setHasBackground(false)
	}, [window.scrollY])

	useEffect(() => {
		setAppBarOpts((prev) => ({
			...prev,
			height: props.height,
		}))
	}, [props.height])

	return (
		<AppBarWrapper
			hasBackground={hasBackground}
			animate={{
				translateY: show ? 0 : '-100%',
			}}
			transition={{
				duration: 0.3,
			}}
			{...restProps}
			id="app-bar">
			{children}
		</AppBarWrapper>
	)
}

AppBar.defaultProps = defaultProps

export default AppBar
