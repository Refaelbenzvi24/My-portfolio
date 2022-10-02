import { AnimatePresence, HTMLMotionProps, motion, MotionProps, SVGMotionProps, useCycle } from "framer-motion"
import { useEffect, useRef } from "react"
import { Button, isDark, theme } from "../index"
import { css } from "@emotion/css"
import tw from "twin.macro"
import useWindowVars from "../../../hooks/useWindowVars"
import clsx from "clsx"
import i18n from "i18next"


const sidebar = {
	open:   ({ height = 200, width, isRTL }: { height: number, width: number, isRTL: boolean }) => ({
		paddingTop: 60,
		clipPath:   `circle(${height * 2 + 200}px at ${isRTL ? 40 : width - 40}px 40px)`,
		transition: {
			staggerChildren: 0.07,
			delayChildren:   0.2,
			type:            "spring",
			stiffness:       20,
			restDelta:       2
		}
	}),
	closed: ({ width, isRTL }: { width: number, isRTL: boolean }) => ({
		paddingTop: 0,
		clipPath:   `circle(28px at ${isRTL ? 40 : width - 40}px 40px)`,
		transition: {
			staggerChildren:  0.05,
			staggerDirection: -1,
			delay:            0.5,
			type:             "spring",
			stiffness:        400,
			damping:          40
		}
	})
}

const Path = (props: SVGMotionProps<"path">) => {
	return (
		// @ts-ignore - for some reason the types don't match up.
		<motion.path
			strokeWidth="2.5"
			stroke="currentColor"
			strokeLinecap="round"
			{...props}
		/>
	)
}


const defaultProps = {
	width: 350
}

interface HamburgerSideBarProps extends HTMLMotionProps<"nav"> {
	width?: number
	isOpen?: boolean
	bgColor?: string
	onIsOpenChange?: (isOpen: boolean) => void
}


const HamburgerSideBar = (props: HamburgerSideBarProps & typeof defaultProps) => {
	const { children, bgColor, isOpen: isOpenProp, onIsOpenChange, className, width, ...restProps } = props

	const isDarkMode = isDark()
	const isRTL      = i18n.dir() === "rtl"

	const { isMobile }                      = useWindowVars()
	const { windowHeight, windowWidth } = useWindowVars()


	const [isOpen, toggleOpen] = useCycle(false, true)
	const containerRef         = useRef(null)

	useEffect(() => {
		if (isOpenProp !== isOpen) toggleOpen()
	}, [isOpenProp])


	useEffect(() => {
		if (onIsOpenChange) onIsOpenChange(isOpen)

		const root = document.querySelector("#root") as HTMLDivElement

		if (isOpen) {
			document.body.style.overflowY                   = "hidden"
			document.querySelector("html")!.style.overflowY = "hidden"
			root.style.overflowY                            = "hidden"
			if (!isMobile) root.style.paddingRight = "6px"
		}

		if (!isOpen) {
			setTimeout(() => {
				document.body.style.overflowY                   = "auto"
				document.querySelector("html")!.style.overflowY = "auto"
				root.style.overflowY                            = "auto"
				if (!isMobile) root.style.paddingRight = ""
			}, 900)
		}

		return () => {
			document.body.style.overflowY                   = "auto"
			document.querySelector("html")!.style.overflowY = "auto"
			root.style.overflowY                            = "auto"
			if (!isMobile) root.style.paddingRight = ""
		}
	}, [isOpen])


	return (
		<motion.nav
			initial={false}
			animate={isOpen ? "open" : "closed"}
			custom={windowHeight}
			ref={containerRef}>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						onClick={() => toggleOpen()}
						className={css`
							${tw`fixed top-0 right-0 bottom-0 h-full w-full bg-white`};
							z-index: ${theme.zIndex.appBar - 10};
							background-color: ${isDarkMode ? theme.colorScheme.dark : theme.colorScheme.light}bb;
						`}
						initial={{
							opacity: 0,
						}}
						animate={{
							opacity:    1,
							transition: {
								type:      "spring",
								duration:  0.5,
								stiffness: 20,
								restDelta: 2
							}
						}}
						exit={{
							opacity:    0,
							transition: {
								delay:     0.5,
								duration:  0.5,
								type:      "spring",
								stiffness: 400,
								damping:   40
							}
						}}
					/>
				)}
			</AnimatePresence>

			<motion.div
				{...restProps}
				className={`${clsx(className)} ${css`
					${tw`fixed top-0 bottom-0 h-full`};
					${isRTL ? tw`left-0` : tw`right-0`};
					background-color: ${bgColor || theme.colorScheme.light};
					width: ${windowWidth > 400 ? windowWidth / 2 : windowWidth}px;
					z-index: ${theme.zIndex.appBar};
				`}`}
				custom={{ width: windowWidth > 400 ? windowWidth / 2 : windowWidth, height: windowHeight, isRTL }}
				variants={sidebar}>
				{children}
			</motion.div>

			<motion.div className={css`
				${tw`fixed rounded-full bottom-0 h-full`};
				${isRTL ? tw`top-[14px] left-[14px]` : tw`top-[14px] right-[14px]`};
				background-color: transparent;
				box-shadow: ${isDarkMode ? theme.shadows["5"] : theme.shadows["3"]};
				width: 53px;
				height: 53px;
			`}/>

			<Button
				className={css`
					${tw`fixed top-0`};
					${isRTL ? tw`left-0 mt-[21px] ml-[18px]` : tw`right-0 mt-[20px] mr-[16px]`};
					z-index: ${theme.zIndex.appBar + 1};
				`}
				id="theme-toggle-button"
				icon
				text
				size={'28px'}
				colorsForStates={theme.colorSchemeByState.secondary}
				onClick={() => toggleOpen()}>
				<svg width="23" height="23" viewBox="0 0 23 23">
					<Path
						variants={{
							closed: { d: "M 2 2.5 L 20 2.5" },
							open:   { d: "M 3 16.5 L 17 2.5" }
						}}
					/>
					<Path
						d={isRTL ? "M 10 9.423 L 20 9.423" : "M 2 9.423 L 12 9.423"}
						variants={{
							closed: { opacity: 1 },
							open:   { opacity: 0 }
						}}
						transition={{ duration: 0.1 }}
					/>
					<Path
						variants={{
							closed: { d: "M 2 16.346 L 20 16.346" },
							open:   { d: "M 3 2.5 L 17 16.346" }
						}}
					/>
				</svg>
			</Button>
		</motion.nav>
	)
}

HamburgerSideBar.defaultProps = defaultProps

export default HamburgerSideBar
