import { ReactNode, useEffect, useState, Suspense, lazy } from "react"

import { css } from "@emotion/css"
import { useSpring } from '@react-spring/core'
import { a as three } from '@react-spring/three'
import { Environment, ContactShadows } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from "framer-motion"
import tw from "twin.macro"

import useAnimations from "../../hooks/useAnimations"
import { interpolate } from "../../utils/utils"
import { ATagButton, Col, isDark, Row, theme, Typography } from "../UI"
import { useMain } from "../../context"
import useDimensions from "../../hooks/useDimensions"


const LaptopModel = lazy(() => import('./LaptopModel'))

interface HomeProps {
	name: string,
	secondaryTitle: string
	description: ReactNode
	resumeLink: string
	innerRef: (node?: Element | null) => void
}

const Home = (props: HomeProps) => {
	const { name, secondaryTitle, description, resumeLink, innerRef } = props

	const {isAnimationsActive} = useMain()

	const [laptopAnimDuration, setLaptopAnimDuration] = useState(isAnimationsActive ? 600 : 450)
	const [colInView, setColInView]                   = useState(false)
	const [laptopColInView, setLaptopColInView]       = useState(false)

	const { t }                         = useTranslation()
	const animations                    = useAnimations()
	const { windowWidth, windowHeight } = useDimensions()

	const delay = 6

	const [open, setOpen] = useState(!isAnimationsActive)

	const spring = useSpring({ open: Number(open), config: { duration: laptopAnimDuration } })

	useEffect(() => {
		if (isAnimationsActive) {
			if (laptopColInView) {
				setTimeout(() => {
					setOpen(true)
				}, 1000)
				setTimeout(() => {
					setLaptopAnimDuration(450)
				}, 1600)
			}


			if (!laptopColInView) {
				setLaptopAnimDuration(600)
				setOpen(false)
			}
		}
	}, [laptopColInView])


	return (
		<Row ref={innerRef}
		     className={`${windowWidth > 1500 ? 'flex-row' : `flex-col`} ${css`
			     padding-top: ${interpolate(windowHeight, [20, 200], [400, 902]) - interpolate(windowWidth, [30, 40], [1920, 0])}px;
		     `} h-full`}
		     id="home">
			<Col className="max-w-[920px]"
			     viewport={{ once: true }}
			     onViewportEnter={() => setColInView(true)}>

				<motion.div
					{...animations.home.homeItem}
					transition={{ delay: delay + 0.2, duration: 0.5 }}>
					<Typography
						className="pl-[5px] whitespace-nowrap"
						variant="bold"
						size={windowWidth > 1300 ? '' : interpolate(windowWidth, [0.876, 1], [400, 1300])}
						color={theme.colorScheme.primary}>
						{t('home.hello')}
					</Typography>
				</motion.div>

				<motion.div
					initial={animations.home.homeItem.initial}
					animate={colInView ? animations.home.homeItem.inView : animations.home.homeItem.outOfView}
					transition={{ delay: delay + 0.3, duration: 0.5 }}>
					<Typography
						className="pt-1.5 whitespace-nowrap"
						variant="h1"
						size={windowWidth > 1300 ? '' : interpolate(windowWidth, [2, 4], [375, 1300])}
						color={isDark() ? theme.colorScheme.light : theme.colorScheme.header1}>
						{name}
					</Typography>
				</motion.div>

				<motion.div
					initial={animations.home.homeItem.initial}
					animate={colInView ? animations.home.homeItem.inView : animations.home.homeItem.outOfView}
					transition={{ delay: delay + 0.5, duration: 0.5 }}>
					<Typography className={` ${windowWidth > 700 ? 'whitespace-nowrap pt-2' : ''}`}
					            variant="h1"
					            size={windowWidth > 1300 ? '' : interpolate(windowWidth, [1.6, 4], [200, 1300])}
					            color={theme.colorScheme.secondary}>
						{secondaryTitle}
					</Typography>
				</motion.div>


				<motion.div
					initial={animations.home.homeItem.initial}
					animate={colInView ? animations.home.homeItem.inView : animations.home.homeItem.outOfView}
					transition={{ delay: delay + 0.7, duration: 0.5 }}>
					<Typography
						className={`pt-2 max-w-[702px]  ${windowWidth > 1100 ? 'pl-1.5 min-w-[600px]' : 'pl-0.5'}`}
						variant="body"
						size={windowWidth > 1300 ? '' : interpolate(windowWidth, [0.875, 1], [375, 1300])}
						color={isDark() ? theme.colorScheme.subtitle2 : theme.colorScheme.subtitle1}>
						{description}
					</Typography>
				</motion.div>

				<ATagButton
					initial={animations.home.homeItem.initial}
					animate={colInView ? animations.home.homeItem.inView : animations.home.homeItem.outOfView}
					transition={{ delay: delay + 0.8, duration: 0.5 }}
					className={`mt-4 ${windowWidth > 1100 ? 'ml-1.5' : 'ml-1'} flex items-center justify-center`}
					href={resumeLink}
					colorsForStates={theme.colorSchemeByState.primary}
					width="175px"
					height="40px">
					<Typography centered variant="bold" color={theme.colorScheme.light}>
						{t('home.resume')}
					</Typography>
				</ATagButton>
			</Col>

			<Col
				className={`w-full ${windowWidth > 1500 ? '' : 'mt-14'} `}
				viewport={{ once: true }}
				onViewportEnter={() => setLaptopColInView(true)}>
				<motion.div
					className="w-full h-full z-[20]"
					initial={animations.home.homeItem.initial}
					animate={laptopColInView ? animations.home.homeItem.inView : animations.home.homeItem.outOfView}
					transition={{ delay: delay + 1, duration: 0.5 }}>
					<Canvas
						className={css`
							& > div {
								${tw`mx-auto`};
								${windowWidth > 1500 ? tw`max-w-[420px]` : css`
									min-height: ${interpolate(windowWidth, [220, 340], [280, 1300])}px;
								`};
							}
						`}
						dpr={[1, 2]}
						camera={{ position: [0, 0, -30], fov: 35 }}>
						{/* @ts-expect-error - types comes from the package and is out of my control.  */}
						<three.pointLight position={[10, 10, 10]} intensity={1.5} color={spring.open.to([0, 1], ['#f0f0f0', '#d25578'])}/>
						<Suspense fallback={null}>
							<group visible={laptopColInView}
							       rotation={[0, Math.PI, 0]}
							       onClick={(e) => {
								       e.stopPropagation()
								       setOpen(!open)
							       }}>
								<LaptopModel open={open} scale={1.4} hinge={spring.open.to([0, 1], [1.575, -0.425])}/>
							</group>
							<Environment preset="city"/>
						</Suspense>
						<ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5}/>
					</Canvas>
				</motion.div>
			</Col>
		</Row>
	)
}

export default Home
