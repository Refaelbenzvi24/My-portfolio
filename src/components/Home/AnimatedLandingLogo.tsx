import { css } from "@emotion/css"
import { AnimatePresence, motion } from "framer-motion"
import i18n from "i18next"
import tw from "twin.macro"

import Logo from "../../assets/Logo.webp"
import { Col, isDark, Portal, Row, theme } from "../UI"


interface AnimatedLandingLogoProps {
	isVisible: boolean
}

const AnimatedLandingLogo = (props: AnimatedLandingLogoProps) => {
	const { isVisible } = props

	const isRTL = i18n.dir() === 'rtl'

	return (
		<AnimatePresence>
			{isVisible ? (
				<Portal>
					<Row className="fixed w-full h-full z-[1400]">
						<Col
							initial={{
								translateX: 0,
							}}
							exit={{
								translateX: isRTL ? '100%' : '-100%',
							}}
							transition={{
								bounce:   3,
								damping:  2,
								duration: 1.5,
							}}
							className={css`
								${tw`w-[52%] h-full overflow-y-hidden overflow-x-hidden justify-center`};
								background-color: ${isDark() ? theme.colorScheme.dark : theme.colorScheme.light};
							`}>
							<motion.img
								initial={{
									scale:      0.9,
									opacity:    0,
									translateY: '-10%',
									translateX: isRTL ? '-50%' : '50%',
								}}
								animate={{
									scale:      0.9,
									opacity:    1,
									translateY: 0,
								}}
								transition={{
									bounce:   3,
									delay:    0.5,
									duration: 1,
								}}
								src={Logo}
								alt=""/>
						</Col>

						<Col
							initial={{
								translateX: 0,
							}}
							exit={{
								translateX: isRTL ? '-100%' : '100%',
							}}
							transition={{
								bounce:   3,
								damping:  2,
								duration: 1.5,
							}}
							className={css`
								${tw`w-[52%] h-full overflow-y-hidden overflow-x-hidden justify-center`};
								background-color: ${isDark() ? theme.colorScheme.dark : theme.colorScheme.light};
							`}>
							<motion.img
								initial={{
									scale:      0.9,
									opacity:    0,
									translateY: '-10%',
									translateX: isRTL ? '50%' : '-50%',
								}}
								animate={{
									scale:      0.9,
									opacity:    1,
									translateY: 0,
								}}
								transition={{
									bounce:   3,
									delay:    0.5,
									duration: 1,
								}}
								src={Logo}
								alt=""/>
						</Col>
					</Row>
				</Portal>
			) : null}
		</AnimatePresence>
	)
}

export default AnimatedLandingLogo
