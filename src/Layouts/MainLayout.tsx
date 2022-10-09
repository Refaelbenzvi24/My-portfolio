import { ReactNode, useEffect, useState } from "react"

import { css } from "@emotion/css"
import { motion } from "framer-motion"
import tw from "twin.macro"

import AnimatedLandingLogo from "../components/MainLayout/AnimatedLandingLogo"
import { ATagButton, Col, Divider, Main, Row, theme, Typography } from "../components/UI"
import { useMain } from "../context"
import useAnimations from "../hooks/useAnimations"
import useWindowVars from "../hooks/useWindowVars"
import { Vars } from "../modules/vars"
import MainLayoutAppBar, { NavigationItemType } from "../components/MainLayout/AppBar"
import MainLayoutMobileAppBar from "../components/MainLayout/MobileAppBar"


interface MainLayoutProps {
	children: ReactNode
	navigationOptions: NavigationItemType[]
	linksList: { tooltip: string, link: string, icon: ReactNode, [key: string]: any }[]
	currentNavigation: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType) => void
	email: string
}

const MainLayout = (props: MainLayoutProps) => {
	const { children, navigationOptions, currentNavigation, setCurrentNavigation, linksList, email } = props


	const [isLogoVisible, setIsLogoVisible] = useState<boolean>(Vars.showAnimations)

	const { disableAnimations } = useMain()

	const animations      = useAnimations()
	const { windowWidth } = useWindowVars()

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
					<MainLayoutAppBar {...{ setCurrentNavigation, navigationOptions, currentNavigation, delay }}/>
				) : (
					<MainLayoutMobileAppBar {...{ setCurrentNavigation, navigationOptions, currentNavigation, linksList, email }}/>
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
										aria-label={tooltip}
										{...animations.bottomLinks}
										animate={{
											opacity:    1,
											transition: {
												delay:    delay + 3.6 + index * 0.1,
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
										size="24px">

										{icon}
									</ATagButton>
								))}
							</Col>

							<Divider
								{...animations.fadeInOut}
								transition={{
									delay:    delay + 3.6,
									duration: 0.5,
								}}
								vertical
								size="90px"
								thickness="2px"/>
						</Col>

						<Col className="fixed bottom-0 right-[70px] items-center w-[30px] z-[300]">
							<Col className="rotate-90 space-y-[20px]">

								<ATagButton className="cursor-pointer px-14"
								            {...animations.email}
								            transition={{
									            delay:    delay + 3.6,
									            duration: 0.5,
								            }}
								            whileHover={{
									            translateX: -5,
									            transition: { duration: 0.25, delay: 0 },
								            }}
								            text
								            colorsForStates={theme.colorSchemeByState.primary}
								            href={`mailto:${email}`}>
									<Typography variant="body" weight={600} color={theme.colorScheme.primary}>
										{email}
									</Typography>
								</ATagButton>
							</Col>

							<Divider
								{...animations.fadeInOut}
								transition={{
									delay:    delay + 3.6,
									duration: 0.5,
								}}
								className="mt-[120px]"
								vertical
								size="90px"
								thickness="2px"/>
						</Col>
					</Row>
				)}
			</motion.div>
		</>
	)
}

export default MainLayout
