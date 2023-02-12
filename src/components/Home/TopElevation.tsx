import { css } from "@emotion/css"
import { AnimatePresence, motion } from "framer-motion"
import tw from "twin.macro"

import useAnimations from "../../hooks/useAnimations"
import { interpolate, scrollToElement } from "../../utils/utils"
import { Button, isDark, theme } from "../UI"
import useDimensions from "../../hooks/useDimensions"


interface TopElevationProps {
	homeWrapperInView: boolean
	experienceWrapperInView: boolean
}

const TopElevation = ({ homeWrapperInView, experienceWrapperInView }: TopElevationProps) => {
	const isDarkMode                    = isDark()
	const { windowWidth, windowHeight } = useDimensions()

	const animations = useAnimations()

	return (
		<motion.div
			{...animations.fadeInOut}
			transition={{ duration: 1, delay: 7 }}>
			<AnimatePresence>
				{(homeWrapperInView && !experienceWrapperInView) ? (
					<motion.div
						initial={{
							opacity: 0,
							y:       -80,
						}}
						animate={{
							opacity: 1,
							y:       0,
						}}
						exit={{
							opacity: 0,
							y:       -40,
						}}
						transition={{ duration: 1 }}
						className={css`
							z-index: 100;
							position: absolute;
							transition: height 1s ease-in-out, filter 0.5s linear, top 1s ease-in-out;
							top: ${windowHeight - 320}px;
							width: ${windowWidth}px;
							left: 0;
							height: 750px;
							filter: ${!(homeWrapperInView && !experienceWrapperInView) ? 'drop-shadow(0px 10px 5px rgba(0, 0, 0, 0.1))' : ''};

							@media (max-width: 1500px) {
								z-index: 9;
								top: ${windowHeight - 150}px;
								height: 1160px;
								[dir=rtl] & {
									height: 1100px;
									top: ${windowHeight - 220}px;
								}
							}
						`}>
						<div className={css`
							${tw`w-full h-full items-center justify-center flex`}
							transition: background-color 0.2s linear, clip-path 0.5s ease-in-out;

							background-color: ${!(homeWrapperInView && !experienceWrapperInView) ? 'transparent' : (isDarkMode ? theme.colorScheme.dark2 : theme.colorScheme.light2)};
							clip-path: polygon(0 ${!(homeWrapperInView && !experienceWrapperInView) ? 0 : interpolate(windowWidth, [15,
								5], [1920, 200])}%, 100% 0, 100% 50%, 0 50%);


							[dir=rtl] & {
								clip-path: polygon(0 0, 100% ${!(homeWrapperInView && !experienceWrapperInView) ? 0 : interpolate((windowWidth), [15,
									5], [1920, 200])}%, 100% 50%, 0 50%);
							}

							@media (max-width: 1500px) {
								clip-path: polygon(0 ${interpolate(windowWidth, [15, 5], [1920, 200])}%, 100% 0, 100% 50%, 0 50%);


								[dir=rtl] & {
									clip-path: polygon(0 0, 100% ${interpolate((windowWidth), [15, 5], [1920, 200])}%, 100% 50%, 0 50%);
								}
							}
						`}>
							<Button
								className={`${windowWidth > 1500 ? 'mb-[250px]' : 'mb-[450px]'} `}
								onClick={() => scrollToElement('#experience')}
								aria-label="Scroll down"
								icon
								text
								colorsForStates={theme.colorSchemeByState.secondary}
								initial={{ opacity: 0, y: 100 }}
								animate={{
									opacity:    [1, 0.2],
									y:          [0, 20],
									transition: {
										y:       { duration: 0.7, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' },
										opacity: { duration: 0.7, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse' },
									},
								}}
								exit={{ opacity: 0, y: -100 }}
								transition={{ duration: 0.6 }}
								color={isDarkMode ? theme.colorScheme.subtitle2 : theme.colorScheme.subtitle1}
								size="30px">
								<IconFeMouse/>
							</Button>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</motion.div>
	)
}


export default TopElevation
