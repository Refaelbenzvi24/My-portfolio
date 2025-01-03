import { ReactNode, useState } from "react"

import { Textfit } from "react-textfit"

import useAnimations from "../../hooks/useAnimations"
import { Col, Divider, isDark, Row, theme, Tooltip, Typography } from "../UI"
import ATagButton from "../UI/Buttons/ATagButton"
import { css } from "@emotion/css"
import tw from "twin.macro"
import useDimensions from "../../hooks/useDimensions"
import clsx from "clsx"


export interface ProjectData {
	title: string
	description: ReactNode
	githubLink?: string
	technologies?: string[]
	siteLink?: string
}

const Project = (props: ProjectData & { className?: string, index: number, listLength: number }) => {
	const { title, description, githubLink, siteLink, technologies, index, listLength } = props

	const { windowWidth } = useDimensions()
	const animation       = useAnimations()

	const [inView, setInView] = useState(false)

	const { t, i18n } = useTranslation()

	const dir = i18n.dir()

	return (
		<Col
			animate={inView ? animation.projectItem.inView : animation.projectItem.outOfView}
			transition={{
				duration: 1.2,
			}}
			viewport={{ once: true }}
			onViewportEnter={() => setInView(true)}
			className={clsx(`items-center space-y-[30px] w-full`, props.className ?? "")}>
			<Col className="pl-[10px] w-full">
				<Row className={`justify-between pt-[24px] `} dir="ltr">
					<Typography variant="h3" color={isDark() ? theme.colorScheme.accent : theme.colorScheme.body1}>
						{title}
					</Typography>

					<Row className="space-x-3 rtl:flex-row-reverse rtl:justify-end pl-[6px]" dir={dir}>
						{githubLink ? (
							<Tooltip
								color={theme.colorScheme.overlaysDark}
								tooltip={t('githubLink')}
								placement="top-center">
								<ATagButton className="p-0"
								            aria-label={`link to ${title} github`}
								            colorsForStates={theme.colorSchemeByState.success}
								            href={githubLink}
								            text
								            icon
								            size="24px">
									<IconEvaGithubOutline/>
								</ATagButton>
							</Tooltip>
						) : null}

						{siteLink ? (
							<Tooltip tooltip={t('siteLink')} placement="top-center">
								<ATagButton className="p-0"
								            aria-label={`link to ${title} website`}
								            colorsForStates={theme.colorSchemeByState.success}
								            href={siteLink}
								            text
								            icon
								            size="24px">
									<IconLucideExternalLink/>
								</ATagButton>
							</Tooltip>
						) : null}
					</Row>
				</Row>

				<Typography
					className={`pt-[24px] ${windowWidth > 1000 ? 'pr-[150px] rtl:pr-0 rtl:pl-[150px]' : ''}`}
					variant="body"
					as={typeof description === 'string' ? 'p' : 'span'}
					color={isDark() ? theme.colorScheme.subtitle2 : theme.colorScheme.subtitle1}>
					{description}
				</Typography>

				{!!technologies && (
					<Row className="flex flex-wrap mt-4">
						<p className={css`
							color: ${theme.colorScheme.secondary};
						`}>{t('technologies')}:</p>

						<ul className={css`
							${tw`flex flex-wrap list-disc rtl:mr-8`}
							& > li {
								${tw`ml-8`};
							}

							li:first-child::marker {
								color: transparent;
							}

							li:not(:first-child)::marker {
								color: ${theme.colorScheme.secondary};
							}
						`}>
							{technologies.map(tech => (
								<li key={tech}>
									<Typography
										variant="body"
										as={typeof description === 'string' ? 'p' : 'span'}
										color={isDark() ? theme.colorScheme.subtitle2 : theme.colorScheme.subtitle1}>
										{tech}
									</Typography>
								</li>
							))}
						</ul>
					</Row>
				)}
			</Col>

			{index !== listLength - 1 && <Divider className="mt-12" size="60%" opacity="40%" color={theme.colorScheme.subtitle1}/>}
		</Col>
	)
}

const Projects = (props: { data: ProjectData[], id?: string, title?: string, innerRef: (node?: Element | null) => void }) => {
	const { data, innerRef } = props

	const { t }           = useTranslation()
	const { windowWidth } = useDimensions()
	const animations      = useAnimations()

	const [inView, setInView] = useState(false)

	return (
		<Col ref={innerRef} className="space-y-[50px]" id={props.id ?? "projects"}>
			<Row
				animate={inView ? animations.sectionTitle.inView : animations.sectionTitle.outOfView}
				viewport={{ once: true }}
				onViewportEnter={() => setInView(true)}
				className="items-center w-[100%]">
				<Textfit className={`w-fit ${windowWidth > 350 ? 'max-w-[60%]' : 'w-[50%]'}`} mode="single" forceSingleModeWidth min={30}>
					<Typography className={`whitespace-nowrap ${windowWidth > 1000 ? '' : 'w-fit'}`}
					            size={windowWidth > 1000 ? '' : 'inherit'}
					            variant="h2"
					            color={theme.colorScheme.primary}>
						{props.title ?? t('projects.title')}
					</Typography>
				</Textfit>

				<Divider
					className={`ml-[16px] rtl:mr-[16px] mt-[6px] ${windowWidth > 1000 ? 'mr-[330px] rtl:ml-[330px]' : (windowWidth > 350 ? 'w-[40%]' : 'w-[30%]')}`}
					color={theme.colorScheme.primary}/>
			</Row>

			{data.map((project, index) => (
				<Project {...project} key={index} index={index} listLength={data.length}/>
			))}
		</Col>
	)
}

export default Projects
