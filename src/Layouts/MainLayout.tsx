import AnimatedLandingLogo from "../components/Home/AnimatedLandingLogo"
import { AnimatePresence, motion } from "framer-motion"
import { css } from "@emotion/css"
import tw from "twin.macro"
import {
	AppBar, ATagButton, Button, Col, Divider, HamburgerSideBar, isDark, Main, Navigation, NavigationItem, Row, theme, ThemeToggle, Tooltip,
	Typography
} from "../components/UI"
import { interpolate, scrollToElement } from "../utils/utils"
import Logo from "../assets/Logo.png"
import useAnimations from "../hooks/useAnimations"
import { ReactNode, useEffect, useState } from "react"
import { useMain } from "../context"
import { Vars } from "../modules/vars"
import useWindowVars from "../hooks/useWindowVars"
import LanguageSelector from "../components/LanguageSelector"


type NavigationItemType = { label: string, value: string, isInView?: string, [key: string]: any }

interface MainLayoutProps {
	children: ReactNode
	navigationOptions: NavigationItemType[]
	linksList: { link: string, icon: ReactNode, [key: string]: any }[]
	currentNavigation?: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType) => void
	email: string
}

const MainLayout = (props: MainLayoutProps) => {
	const { children, navigationOptions, currentNavigation, setCurrentNavigation, linksList, email } = props

	const [isHamburgerSideBarOpen, setIsHamburgerSideBarOpen] = useState<boolean>(false)
	const [isLogoVisible, setIsLogoVisible]                   = useState<boolean>(Vars.showAnimations)

	const { disableAnimations } = useMain()

	const { t } = useTranslation()

	const animations      = useAnimations()
	const { windowWidth } = useWindowVars()
	const isDarkMode      = isDark()

	useEffect(() => {
		setTimeout(() => {
			setIsLogoVisible(false)
		}, 2500)
	}, [])

	const delay = 4.3

	return (
		<>
			<AnimatedLandingLogo isVisible={isLogoVisible}/>

			<motion.div
				className={css`
					${tw`h-full w-full mx-auto`}

					${disableAnimations && css` * {
						transition: none !important;
					}`}
				`}>
				{windowWidth > 800 ? (
					<AppBar className="justify-between">
						<Row className="items-center">
							<motion.img
								{...animations.appBar.logo}
								transition={{
									delay:    delay,
									duration: 1,
								}}
								className={css`
									${tw`h-[90px] w-[90px]`};

									[dir="ltr"] & {
										margin-left: ${windowWidth > 1200 ? '60' : `${Math.max(interpolate(windowWidth, [20, 60], [700, 1200]), 20)}`}px;
									}

									[dir="rtl"] & {
										margin-right: ${windowWidth > 1200 ? '60' : `${Math.max(interpolate(windowWidth, [20, 60], [700, 1200]), 20)}`}px;
									}
								`}
								src={Logo}
								alt="RBZ"/>


							<Navigation
								{...animations.fadeInOut}
								transition={{
									delay: delay + 0.1,
								}}
								className={css`
									[dir="ltr"] & {
										padding-left: ${windowWidth > 1200 ? '200' : `${Math.max(interpolate(windowWidth, [40, 200], [800, 1200]), 40)}`}px;
									}

									[dir="rtl"] & {
										padding-right: ${windowWidth > 1200 ? '200' : `${Math.max(interpolate(windowWidth, [40, 200], [800, 1200]), 40)}`}px;
									}
								`}
								selected={currentNavigation}
								options={navigationOptions}
								navigationItemComp={({ label, value }, index) => (
									<NavigationItem
										{...{ label, value }}
										{...animations.appBar.navigationItem}
										transition={{
											delay:    delay + 0.1 + index * 0.2,
											duration: 0.5
										}}
										key={index}
										selected={currentNavigation}
										onSelect={() => {
											if (setCurrentNavigation) setCurrentNavigation({ label, value })
											scrollToElement(value)
										}}/>
								)}/>
						</Row>

						<Row className={`space-x-[18px] rtl:space-x-reverse	${css`
							[dir="ltr"] & {
								margin-right: ${windowWidth > 1200 ? '90' : `${Math.max(interpolate(windowWidth, [20, 90], [700, 1200]), 20)}`}px;
							}

							[dir="rtl"] & {
								margin-left: ${windowWidth > 1200 ? '90' : `${Math.max(interpolate(windowWidth, [20, 90], [700, 1200]), 20)}`}px;
							}
						`}`}>
							<Tooltip tooltip={t('language')}
							         color={theme.colorScheme.overlaysDark}
							         placement={'bottom-center'}>
								<LanguageSelector
									{...animations.appBar.themeToggle}
									transition={{
										delay:    delay + 1,
										duration: 0.5
									}}
									color={theme.colorScheme.primary}/>
							</Tooltip>

							<Tooltip tooltip={t('theme')}
							         color={theme.colorScheme.overlaysDark}
							         placement={'bottom-center'}>
								<ThemeToggle
									{...animations.appBar.themeToggle}
									transition={{
										delay:    delay + 1.1,
										duration: 0.5
									}}/>
							</Tooltip>
						</Row>
					</AppBar>
				) : (
					<Row className="w-full items-center">
						<motion.img
							{...animations.appBar.logo}
							className={css`
								${tw`h-[90px] w-[90px]`};
								margin-left: ${windowWidth > 1200 ? '60' : `${Math.max(interpolate(windowWidth, [20, 60], [700, 1200]), 20)}`}px;
							`}
							src={Logo}
							alt="RBZ"/>

						<HamburgerSideBar
							className="overflow-hidden"
							isOpen={isHamburgerSideBarOpen}
							bgColor={isDarkMode ? theme.colorScheme.dark : theme.colorScheme.light}
							onIsOpenChange={setIsHamburgerSideBarOpen}>
							<AnimatePresence>
								{isHamburgerSideBarOpen && (
									<>
										<motion.div
											className="flex flex-col h-full w-full"
											initial={{
												opacity: 0,
											}}
											animate={{
												opacity: 1,
											}}
											exit={{
												opacity: 0,
											}}>
											<Row className="mt-[-34px] mx-[12px] space-x-[18px] rtl:space-x-reverse">
												<Tooltip tooltip={t('theme')}
												         color={theme.colorScheme.overlaysDark}
												         placement={'top-center'}>
													<ThemeToggle
														color={theme.colorScheme.secondary}/>
												</Tooltip>

												<Tooltip tooltip={t('language')}
												         color={theme.colorScheme.overlaysDark}
												         placement={'top-center'}>
													<LanguageSelector
														color={theme.colorScheme.secondary}/>
												</Tooltip>
											</Row>

											<Navigation
												className="space-y-4 mt-[-80px] items-center justify-center mt-auto"
												vertical
												options={navigationOptions}
												selected={currentNavigation}
												navigationItemComp={({ label, value }, index) => (
													<Button
														key={index}
														width={'fit-content'}
														onClick={() => {
															setIsHamburgerSideBarOpen(false)
															setTimeout(() => {
																if (setCurrentNavigation) setCurrentNavigation({ label, value })
																scrollToElement(value)
															}, 800)
														}}
														text>
														<Typography variant={'button'}
														            className="w-fit"
														            size={1}
														            weight={500}
														            strokeSize={0.45}
														            strokeColor={`${isDarkMode ? theme.colorScheme.light : theme.colorScheme.header1}`}
														            color={`${isDarkMode ? theme.colorScheme.light : theme.colorScheme.header1} !important`}>
															{label}
														</Typography>
													</Button>
												)}/>

											<Col className="mb-[40px] mt-auto z-[300]">
												<Row className="justify-center">
													<Typography variant={'button'}
													            color={isDarkMode ? theme.colorScheme.light : theme.colorScheme.header1}
													            size={0.8}
													            weight={400}>
														{t('getInTouch')}
													</Typography>
												</Row>

												<Row className="pt-[12px] justify-center space-x-[18px] rtl:space-x-reverse">
													<ATagButton
														className="p-2"
														{...animations.bottomLinks}
														animate={{
															opacity:    1,
															transition: {
																duration: 0.5
															}
														}}
														whileHover={{
															translateY: -5,
															transition: { duration: 0.25, delay: 0 }
														}}
														colorsForStates={theme.colorSchemeByState.primary}
														href={`mailto:${email}`} text icon size={'18px'}>
														<IconIcOutlineEmail/>
													</ATagButton>

													{linksList.map(({ tooltip, link, icon }, index) => (
														<ATagButton
															className="p-2"
															key={index}
															{...animations.bottomLinks}
															animate={{
																opacity:    1,
																transition: {
																	delay:    0.1 + index * 0.1,
																	duration: 0.5
																}
															}}
															whileHover={{
																translateY: -5,
																transition: { duration: 0.25, delay: 0 }
															}}
															colorsForStates={theme.colorSchemeByState.primary}
															href={link} text icon size={'18px'}>
															{icon}
														</ATagButton>
													))}
												</Row>
											</Col>

											<div className={css`
												position: absolute;
												bottom: -55px;
												left: -35px;
												height: 300px;
												width: ${windowWidth * 2}px;
												rotate: 165deg;
												background-color: ${isDarkMode ? theme.colorScheme.overlaysDark : theme.colorScheme.light2};
											`}/>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</HamburgerSideBar>
					</Row>
				)}

				<Main>
					{children}
				</Main>

				{windowWidth > 1300 && (
					<Row>
						<Col className="fixed bottom-0 left-[70px] w-[30px] items-center z-[300]">
							<Col className="pb-[24px] space-y-[22px]">
								{linksList.map(({ tooltip, link, icon }, index) => (
									<ATagButton
										className="p-2"
										key={index}
										{...animations.bottomLinks}
										animate={{
											opacity:    1,
											transition: {
												delay:    delay + 3.6 + index * 0.1,
												duration: 0.5
											}
										}}
										whileHover={{
											translateY: -5,
											transition: { duration: 0.25, delay: 0 }
										}}
										colorsForStates={theme.colorSchemeByState.primary}
										href={link} text icon size={'24px'}>

										{icon}
									</ATagButton>
								))}
							</Col>

							<Divider
								{...animations.fadeInOut}
								transition={{
									delay:    delay + 3.6,
									duration: 0.5
								}}
								vertical size={'90px'} thickness={'2px'}/>
						</Col>

						<Col className="fixed bottom-0 right-[70px] items-center w-[30px] z-[300]">
							<Col className="rotate-90 space-y-[20px]">

								<ATagButton className="cursor-pointer px-14"
								            {...animations.email}
								            transition={{
									            delay:    delay + 3.6,
									            duration: 0.5
								            }}
								            whileHover={{
									            translateX: -5,
									            transition: { duration: 0.25, delay: 0 }
								            }}
								            text
								            colorsForStates={theme.colorSchemeByState.primary}
								            href={`mailto:${email}`}>
									<Typography variant={'body'} weight={600} color={theme.colorScheme.primary}>
										{email}
									</Typography>
								</ATagButton>
							</Col>

							<Divider
								{...animations.fadeInOut}
								transition={{
									delay:    delay + 3.6,
									duration: 0.5
								}}
								className="mt-[120px]" vertical size={'90px'} thickness={'2px'}/>
						</Col>
					</Row>
				)}
			</motion.div>
		</>
	)
}

export default MainLayout
