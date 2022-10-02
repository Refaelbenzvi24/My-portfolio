import { useState } from "react"

import { motion } from "framer-motion"
import { Textfit } from "react-textfit"

import useAnimations from "../../hooks/useAnimations"
import useWindowVars from "../../hooks/useWindowVars"
import { Card, Col, Divider, isDark, Row, theme, Typography } from "../UI"


export type SkillsData = Record<string, string[]>;

const SkillCard = (props: { skillItem: string, rowIndex: number, colIndex: number, index: number }) => {
	const { skillItem, rowIndex, colIndex, index } = props

	const animations      = useAnimations()
	const { windowWidth } = useWindowVars()

	const [inView, setInView] = useState(false)

	return (
		<Card
			animate={inView ? animations.skills.skillCard.inView : animations.skills.skillCard.outOfView}
			onViewportEnter={() => setInView(true)}
			viewport={{ once: true }}
			transition={{
				duration: 0.8,
				delay:    0.2 * rowIndex + 0.1 * colIndex + 0.1 * index,
			}}
			className={windowWidth > 350 ? "ml-[10px] px-[16px] py-[6px] mt-[12px]" : "ml-[6px] px-[8px] py-[4px] mt-[6px]"}
			elevation={1}
			bgColor={isDark() ? theme.colorScheme.overlaysDark : theme.colorScheme.white}
			height="fit-content"
			width="fit-content"
			key={index}>
			<Typography className="whitespace-nowrap"
				variant="small"
			            size={windowWidth > 350 ? '' : 0.9}
			            color={isDark() ? theme.colorScheme.accent : theme.colorScheme.body2}>
				{skillItem}
			</Typography>
		</Card>
	)
}

const Skill = (props: { skill: [string, string[]], rowIndex: number, colIndex: number }) => {
	const { skill, colIndex, rowIndex } = props

	const [inView, setInView] = useState(false)

	const { windowWidth } = useWindowVars()
	const animations      = useAnimations()

	return (
		<Col
			onViewportEnter={() => setInView(true)}
			viewport={{ once: true }}
			className={`w-full max-w-[430px] ${windowWidth > 350 ? 'mr-[20px]' : 'mr-[10px]'}`}>
			<motion.div
				animate={inView ? animations.skills.skillTitle.inView : animations.skills.skillTitle.outOfView}
				transition={{
					duration: 0.8,
					delay:    0.2 * rowIndex + 0.1 * colIndex,
				}}>
				<Typography variant="h3" size={windowWidth > 350 ? '' : 1.25} color={isDark() ? theme.colorScheme.accent : theme.colorScheme.header2}>
					{skill[0]}
				</Typography>
			</motion.div>

			<Row
				className={`pt-[8px] w-full flex-wrap  ${windowWidth > 500 ? 'pr-[10px]' : 'flex-col'}`}>
				{skill[1].map((skillItem, index) => (
					<SkillCard {...{ skillItem, colIndex, rowIndex, index }} key={index}/>
				))}
			</Row>
		</Col>
	)
}

const Skills = (props: { data: SkillsData[][], innerRef: (node?: Element | null) => void }) => {
	const { data, innerRef } = props

	const [isTitleInView, setIsTitleInView] = useState(false)

	const { t }           = useTranslation()
	const animations      = useAnimations()
	const { windowWidth } = useWindowVars()


	return (
		<Col ref={innerRef} id="skills">
			<Row
				animate={isTitleInView ? animations.sectionTitle.inView : animations.sectionTitle.outOfView}
				viewport={{ once: true }}
				onViewportEnter={() => setIsTitleInView(true)}
				className="items-center w-[100%]">
				<Textfit className="w-fit max-w-[60%]" mode="single" forceSingleModeWidth min={30}>
					<Typography className={`whitespace-nowrap ${windowWidth > 1000 ? '' : 'w-fit'}`}
					            size={windowWidth > 1000 ? '' : 'inherit'}
					            variant="h2"
						color={theme.colorScheme.primary}>
						{t('skills.title')}
					</Typography>
				</Textfit>

				<Divider className={`ml-[16px] rtl:mr-[16px] mt-[6px] ${windowWidth > 1000 ? 'mr-[330px] rtl:ml-[330px]' : 'w-[40%]'}`}
				         color={theme.colorScheme.primary}/>
			</Row>

			<Col className="pt-[14px]" dir="ltr">
				{data.map((row, rowIndex) => (
					<Row className="pt-[30px] w-full" key={rowIndex}>
						{row.map((col) => Object.entries(col).map((skill, colIndex) => (
							<Skill key={colIndex} {...{ skill, rowIndex, colIndex }}/>
						)))}
					</Row>
				))}
			</Col>
		</Col>
	)
}

export default Skills
