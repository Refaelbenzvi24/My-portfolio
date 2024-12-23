import { useEffect, useState } from "react"

import { css } from "@emotion/css"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import tw from "twin.macro"

import Contact from "../components/Home/Contact"
import Credit from "../components/Home/Credit"
import Experience from "../components/Home/Experience"
import Home from "../components/Home/Home"
import Projects from "../components/Home/Projects"
import Skills from "../components/Home/Skills"
import TopElevation from "../components/Home/TopElevation"
import { Button, Col, Portal, theme, Tooltip } from "../components/UI"
import data from "../data"
import useAnimations, { generalAnimations } from "../hooks/useAnimations"
import MainLayout from "../Layouts/MainLayout"
import { interpolate, scrollToElement } from "../utils/utils"
import useDimensions from "../hooks/useDimensions"


export default () => {
	const { email, linksList, homeData, experience, flagshipProjects, projects, skillsList, navigationOptions } = data()
	const [currentNavigation, setCurrentNavigation]                                                             = useState<{
		label: string,
		value: string
	}>(navigationOptions[0])

	const { windowWidth } = useDimensions()

	const { t } = useTranslation()

	const animations = useAnimations()

	const { ref: homeWrapperRef, inView: homeWrapperInView }                         = useInView()
	const { ref: experienceWrapperRef, inView: experienceWrapperInView }             = useInView({ rootMargin: '-200px' })
	const { ref: flagshipProjectsWrapperRef, inView: flagshipProjectsWrapperInView } = useInView({ rootMargin: '-200px' })
	const { ref: projectsWrapperRef, inView: projectsWrapperInView }                 = useInView({ rootMargin: '-200px' })
	const { ref: skillsWrapperRef, inView: skillsWrapperInView }                     = useInView({ rootMargin: '-200px' })
	const { ref: contactWrapperRef, inView: contactWrapperInView }                   = useInView({ rootMargin: '-200px' })

	useEffect(() => {
		if (homeWrapperInView) setCurrentNavigation({ label: 'Home', value: '#main' })
		if (experienceWrapperInView) setCurrentNavigation({ label: 'Experience', value: '#experience' })
		if (flagshipProjectsWrapperInView) setCurrentNavigation({ label: 'Flagship Projects', value: '#flagship-projects' })
		if (projectsWrapperInView) setCurrentNavigation({ label: 'Projects', value: '#projects' })
		if (skillsWrapperInView) setCurrentNavigation({ label: 'Skills', value: '#skills' })
		if (contactWrapperInView) setCurrentNavigation({ label: 'Contact', value: '#contact' })
	}, [homeWrapperInView, experienceWrapperInView, projectsWrapperInView, skillsWrapperInView, contactWrapperInView])


	return (
		<MainLayout
			currentNavigation={currentNavigation}
			setCurrentNavigation={setCurrentNavigation}
			email={email}
			linksList={linksList}
			navigationOptions={navigationOptions}>

			<Col
				className={`${windowWidth > 1500 ? 'max-w-[1240px]' : (windowWidth > 1300 ? 'max-w-[920px]' : css`
					padding-left: ${interpolate(windowWidth, [160, 20], [1300, 200])}px;
					padding-right: ${interpolate(windowWidth, [160, 20], [1300, 200])}px;
				`)} z-[10] mx-auto`}
				{...animations.fadeInOut}
				transition={{
					delay:    1.5,
					duration: 0.5,
				}}>

				<Home innerRef={homeWrapperRef} {...homeData}/>

				<TopElevation {...{ homeWrapperInView, experienceWrapperInView }}/>

				<Col className="items-center z-[8]">
					<Col
						className={`${css`
							& > div {
								${tw`mt-[200px] pt-[220px]`};
							}
						`} ${windowWidth > 1300 ? 'max-w-[920px] mx-auto' : ''}`}>

						<Projects id="experience" title={t('experience.title')} innerRef={projectsWrapperRef} data={experience}/>

						<Experience innerRef={experienceWrapperRef} data={flagshipProjects}/>

						<Projects innerRef={projectsWrapperRef} data={projects}/>

						<Skills innerRef={skillsWrapperRef} data={skillsList}/>

						<Contact email={email} linksList={linksList} innerRef={contactWrapperRef}/>

						<Credit/>
					</Col>
				</Col>
			</Col>

			<AnimatePresence>
				{!homeWrapperInView && (
					<Portal>
						<motion.div {...generalAnimations.fadeInOut}
						            transition={{ delay: 0.2, duration: 0.5 }}
						            className={css`
							            ${tw`fixed`};
							            ${windowWidth > 1300 ? tw`bottom-[40px] right-[130px]` : css`
								            bottom: ${interpolate(windowWidth, [60, 20], [1300, 300])}px;
								            right: ${interpolate(windowWidth, [60, 20], [1300, 300])}px;
							            `}
							            z-index: ${theme.zIndex.fab};
						            `}>
							<Tooltip tooltip={t('backToTop')} placement="center-left">
								<Button size="30px"
								        onClick={() => scrollToElement('#main')}
								        colorsForStates={theme.colorSchemeByState.secondary}
								        color={theme.colorScheme.light}
								        icon
								        fab>
									<IconCarbonArrowUp/>
								</Button>
							</Tooltip>
						</motion.div>
					</Portal>
				)}
			</AnimatePresence>
		</MainLayout>
	)
}
