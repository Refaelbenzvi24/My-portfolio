import { AppBar, Navigation, NavigationItem, Row, theme, ThemeToggle, Tooltip } from "../UI"
import { motion } from "framer-motion"
import { css } from "@emotion/css"
import tw from "twin.macro"
import { interpolate, scrollToElement } from "../../utils/utils"
import Logo from "../../assets/LogoSmall.webp"
import LanguageSelector from "../LanguageSelector"
import useAnimations from "../../hooks/useAnimations"
import AnimationsToggle from "../AnimationsToggle"
import useDimensions from "../../hooks/useDimensions"


export interface NavigationItemType {
	label: string,
	value: string,
	isInView?: string,

	[key: string]: any
}

interface MainLayoutAppBarProps {
	navigationOptions: NavigationItemType[]
	currentNavigation: NavigationItemType
	setCurrentNavigation?: (navigation: NavigationItemType) => void
	delay: number
}


const MainLayoutAppBar = (props: MainLayoutAppBarProps) => {
	const { delay, setCurrentNavigation, navigationOptions, currentNavigation } = props

	const animations      = useAnimations()
	const { windowWidth } = useDimensions()

	const { t } = useTranslation()

	return (
		<AppBar className="justify-between">
			<Row className="items-center">
				<motion.img
					{...animations.appBar.logo}
					transition={{
						delay,
						duration: 1,
					}}
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
					options={navigationOptions}>
					{({ label, value }, index) => (
						<NavigationItem
							{...{ label, value }}
							{...animations.appBar.navigationItem}
							transition={{
								delay:    delay + 0.1 + index * 0.2,
								duration: 0.5,
							}}
							key={index}
							selected={currentNavigation}
							onSelect={() => {
								if (setCurrentNavigation) setCurrentNavigation({ label, value })
								scrollToElement(value)
							}}/>
					)}
				</Navigation>
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
				         placement="bottom-center">
					<LanguageSelector
						{...animations.appBar.themeToggle}
						transition={{
							delay:    delay + 1,
							duration: 0.5,
						}}
						color={theme.colorScheme.primary}/>
				</Tooltip>

				<Tooltip tooltip={t('animations')}
				         color={theme.colorScheme.overlaysDark}
				         placement="bottom-center">
					<AnimationsToggle {...animations.appBar.themeToggle}
					                  transition={{
						                  delay:    delay + 1.1,
						                  duration: 0.5,
					                  }}/>
				</Tooltip>

				<Tooltip tooltip={t('theme')}
				         color={theme.colorScheme.overlaysDark}
				         placement="bottom-center">
					<ThemeToggle
						{...animations.appBar.themeToggle}
						transition={{
							delay:    delay + 1.2,
							duration: 0.5,
						}}/>
				</Tooltip>
			</Row>
		</AppBar>
	)
}

export default MainLayoutAppBar
