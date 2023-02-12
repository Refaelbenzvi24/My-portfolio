import { AnimatePresence, motion } from "framer-motion"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { interpolate, scrollToElement } from "../../utils/utils"
import Logo from "../../assets/LogoSmall.webp"
import { ATagButton, Button, Col, HamburgerSideBar, isDark, Navigation, Row, theme, ThemeToggle, Tooltip, Typography } from "../UI"
import LanguageSelector from "../LanguageSelector"
import useAnimations from "../../hooks/useAnimations"
import { ReactNode, useState } from "react"
import { NavigationItemType } from "./AppBar"
import AnimationsToggle from "../AnimationsToggle"
import useDimensions from "../../hooks/useDimensions"


interface MainLayoutMobileAppBarProps {
	navigationOptions: NavigationItemType[]
	currentNavigation: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType) => void
	linksList: { tooltip: string, link: string, icon: ReactNode, [key: string]: any }[]
	email: string
}

const MainLayoutMobileAppBar = (props: MainLayoutMobileAppBarProps) => {
	const { navigationOptions, currentNavigation, setCurrentNavigation, email, linksList } = props

	const [isHamburgerSideBarOpen, setIsHamburgerSideBarOpen] = useState<boolean>(false)

	const animations      = useAnimations()
	const { windowWidth } = useDimensions()

	const { t } = useTranslation()

	return (
		<Row className="w-full items-center">

			<motion.img
				{...animations.appBar.logo}
				className={css`
					${tw`h-[72px] w-[72px]`};

					[dir="ltr"] & {
						margin-left: ${windowWidth > 1200 ? '60' : `${Math.max(interpolate(windowWidth, [20, 60], [700, 1200]), 20)}`}px;
					}

					[dir="rtl"] & {
						margin-right: ${windowWidth > 1200 ? '60' : `${Math.max(interpolate(windowWidth, [20, 60], [700, 1200]), 20)}`}px;
					}
				`}
				src={Logo}
				alt="RBZ"/>

			<HamburgerSideBar
				className="overflow-hidden"
				isOpen={isHamburgerSideBarOpen}
				bgColor={isDark() ? theme.colorScheme.dark : theme.colorScheme.light}
				onIsOpenChange={setIsHamburgerSideBarOpen}>
				<AnimatePresence>
					{isHamburgerSideBarOpen ? (
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
									         placement="top-center">
										<ThemeToggle
											color={theme.colorScheme.secondary}/>
									</Tooltip>

									<Tooltip tooltip={t('animations')}
									         color={theme.colorScheme.overlaysDark}
									         placement="bottom-center">
										<AnimationsToggle
											color={theme.colorScheme.secondary}/>
									</Tooltip>

									<Tooltip tooltip={t('language')}
									         color={theme.colorScheme.overlaysDark}
									         placement="top-center">
										<LanguageSelector
											color={theme.colorScheme.secondary}/>
									</Tooltip>
								</Row>

								<Navigation
									className="space-y-4 mt-[-80px] items-center justify-center mt-auto"
									vertical
									options={navigationOptions}
									selected={currentNavigation}>
									{({ label, value }, index) => (
										<Button
											key={index}
											width="fit-content"
											onClick={() => {
												setIsHamburgerSideBarOpen(false)
												setTimeout(() => {
													if (setCurrentNavigation) setCurrentNavigation({ label, value })
													scrollToElement(value)
												}, 800)
											}}
											text>
											<Typography
												variant="button"
												className="w-fit"
												size={1}
												weight={500}
												strokeSize={0.45}
												strokeColor={`${isDark() ? theme.colorScheme.light : theme.colorScheme.header1}`}
												color={`${isDark() ? theme.colorScheme.light : theme.colorScheme.header1} !important`}>
												{label}
											</Typography>
										</Button>
									)}
								</Navigation>

								<Col className="mb-[40px] mt-auto z-[300]">
									<Row className="justify-center">
										<Typography variant="button"
										            color={isDark() ? theme.colorScheme.light : theme.colorScheme.header1}
										            size={0.8}
										            weight={400}>
											{t('getInTouch')}
										</Typography>
									</Row>

									<Row className="pt-[12px] justify-center space-x-[18px] rtl:space-x-reverse">
										<ATagButton
											className="p-2"
											{...animations.bottomLinks}
											aria-label="Email"
											animate={{
												opacity:    1,
												transition: {
													duration: 0.5,
												},
											}}
											whileHover={{
												translateY: -5,
												transition: { duration: 0.25, delay: 0 },
											}}
											colorsForStates={theme.colorSchemeByState.primary}
											href={`mailto:${email}`}
											text
											icon
											size="18px">
											<IconIcOutlineEmail/>
										</ATagButton>

										{linksList.map(({ tooltip, link, icon }, index) => (
											<ATagButton
												className="p-2"
												key={index}
												aria-label={tooltip}
												{...animations.bottomLinks}
												animate={{
													opacity:    1,
													transition: {
														delay:    0.1 + index * 0.1,
														duration: 0.5,
													},
												}}
												whileHover={{
													translateY: -5,
													transition: { duration: 0.25, delay: 0 },
												}}
												colorsForStates={theme.colorSchemeByState.primary}
												href={link}
												text
												icon
												size="18px">
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
									background-color: ${isDark() ? theme.colorScheme.overlaysDark : theme.colorScheme.light2};
								`}/>
							</motion.div>
						</>
					) : null}
				</AnimatePresence>
			</HamburgerSideBar>
		</Row>
	)
}

export default MainLayoutMobileAppBar
