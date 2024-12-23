import { useState } from "react"

import { Textfit } from "react-textfit"

import useAnimations from "../../hooks/useAnimations"
import { Col, Divider, Row, theme, Typography } from "../UI"
import ExperienceItem, { ExperienceData } from "./ExperienceItem"
import useDimensions from "../../hooks/useDimensions"


const Experience = (props: { data: ExperienceData[], innerRef: (node?: Element | null) => void }) => {
	const { data, innerRef } = props

	const [inView, setInView] = useState(false)

	const { windowWidth } = useDimensions()
	const { t }           = useTranslation()

	const animations = useAnimations()

	return (
		<Col ref={innerRef} id="experience">
			<Row
				animate={inView ? animations.sectionTitle.inView : animations.sectionTitle.outOfView}
				viewport={{ once: true }}
				onViewportEnter={() => setInView(true)}
				className="items-center w-[100%]">
				<Textfit className="w-fit max-w-[60%]" mode="single" forceSingleModeWidth min={30}>
					<Typography className={`whitespace-nowrap ${windowWidth > 1000 ? '' : 'w-fit'}`}
					            size={windowWidth > 1000 ? '' : 'inherit'}
					            variant="h2"
						color={theme.colorScheme.primary}>
						{t('flagshipProjects.title')}
					</Typography>
				</Textfit>

				<Divider className={`ml-[16px] rtl:mr-[16px] mt-[6px] ${windowWidth > 1000 ? 'mr-[330px] rtl:ml-[330px]' : 'w-[40%]'}`}
				         color={theme.colorScheme.primary}/>
			</Row>


			{data.map((data, index) => (
				<ExperienceItem {...{ ...data, index }} key={index}/>
			))}

		</Col>
	)
}

export default Experience
