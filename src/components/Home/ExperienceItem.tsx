import { Card, Col, isDark, Row, theme, Tooltip, Typography } from "../UI"
import { ReactNode, useRef, useState } from "react"
import { Textfit } from "react-textfit"
import { css } from "@emotion/css"
import tw from "twin.macro"
import ATagButton from "../UI/Buttons/ATagButton"
import useAnimations from "../../hooks/useAnimations"
import useWindowVars from "../../hooks/useWindowVars"
import { interpolate } from "../../utils/utils"


export interface ExperienceData {
	title: string
	dates: string
	image: string
	description: ReactNode
	technologies: (string | ReactNode)[]
	githubLink?: string
	siteLink?: string
}

const ExperienceItem = (props: ExperienceData & { index: number }) => {
	const { githubLink, siteLink, image, technologies, dates, title, description, index } = props

	const mobileBreakpoint = 1000

	const { t } = useTranslation()

	const { windowWidth } = useWindowVars()
	const animations      = useAnimations()
	const isDarkMode      = isDark()

	const [inView, setInView] = useState(false)

	const descriptionCardRef = useRef<HTMLDivElement>(null)

	return (
		<Row
			animate={inView  ? animations.experienceItem.inView : ((index % 2) === 0 ?  animations.experienceItem.outOfViewLeft : animations.experienceItem.outOfViewRight)}
			transition={{ duration: 1.2 }}
			viewport={{ once: true }}
			onViewportEnter={() => setInView(true)}
			className={`${windowWidth > mobileBreakpoint ? 'flex-row' : `flex-col`} w-full pt-[100px] justify-between `}>
			{((index % 2) === 0 || windowWidth <= mobileBreakpoint) && (
				<div className={`cursor-pointer relative ${windowWidth > mobileBreakpoint ? 'min-h-[320px] min-w-[530px]' : css`
					${tw`mx-auto`};
				`}`}>
					<a className={css`
						${tw`h-full w-full absolute z-[1]`};
						background: ${isDarkMode ? `linear-gradient(${theme.colorScheme.dark}10, ${theme.colorScheme.primary}99)` : `linear-gradient(${theme.colorScheme.light}10, ${theme.colorScheme.primary}99)`};
						transition: all 250ms ease-in-out;
						opacity: 1;

						&:hover {
							opacity: 0;

							& ~ * {
								filter: none;
							}
						}
					`} href={siteLink}/>
					<img
						src={image}
						alt={''}
						className={css`
							${tw`h-full w-full bg-cover`};

							transition: all 250ms ease-in-out;
							filter: contrast(1) brightness(90%) blur(0.2px);
						`}/>
				</div>
			)}

			<Col className={`pt-[10px] justify-between z-10 ${windowWidth <= mobileBreakpoint ? `${css`
				${tw`mx-auto`};
				margin-top: -${interpolate(windowWidth, [160, 20], [1300, 200])}px;
				width: ${windowWidth - (interpolate(windowWidth, [200, 20], [1300, 200]) * 2)}px;
			`}` : 'w-full max-w-[430px]'}`}>
				<Col className={`w-full h-full ${windowWidth <= mobileBreakpoint ? 'justify-center' : ''}`}>
					{windowWidth > mobileBreakpoint && (
						<>
							<Typography className={`${(index % 2) !== 0 ? 'pr-[20px] rtl:pl-[20px] rtl:pr-0' : 'pl-[20px]  rtl:pr-[20px] rtl:pl-0'}`}
							            variant={'bold'}
							            lineHeight={'140%'}
							            color={isDark() ? theme.colorScheme.body1 : theme.colorScheme.subtitle2}>
								{dates}
							</Typography>

							<Textfit mode="single" forceSingleModeWidth={true}>
								<Typography className={`${(index % 2) !== 0 ? 'pr-[20px] rtl:pl-[20px] rtl:pr-0' : 'pl-[20px]  rtl:pr-[20px] rtl:pl-0'}`}
								            variant={'h3'} size={'inherit'}
								            color={isDark() ? theme.colorScheme.light : theme.colorScheme.body1}>
									{title}
								</Typography>
							</Textfit>
						</>
					)}

					<div className={`${windowWidth <= mobileBreakpoint ? '' : `relative ${css`
						height: ${descriptionCardRef.current?.getBoundingClientRect().height}px;
					`}`} mt-[16px]`}>
						<Card ref={descriptionCardRef}
						      className={`py-[12px] pl-[18px] pr-[12px] ${windowWidth <= mobileBreakpoint ? '' : 'absolute'} ${((index % 2) !== 0 || windowWidth < mobileBreakpoint ? 'left-0 rtl:right-0 rtl:left-auto' : 'right-0 rtl:left-0 rtl:right-auto')}`}
						      elevation={4}
						      bgColor={isDark() ? `${theme.colorScheme.overlaysDark}e1` : `${theme.colorScheme.accent}e1`}
						      height={'fit-content'} width={windowWidth <= mobileBreakpoint ? '' : '555px'}>
							{windowWidth <= mobileBreakpoint && (
								<>
									<Typography
										variant={'bold'}
										lineHeight={'140%'}
										color={isDark() ? theme.colorScheme.body1 : theme.colorScheme.subtitle2}>
										{dates}
									</Typography>

									<Textfit mode={windowWidth > 600 ? "single" : "multi"} forceSingleModeWidth>
										<Typography
											className={windowWidth <= 600 ? css`
												display: -webkit-box;
												-webkit-line-clamp: 2;
												line-clamp: 2;
												-webkit-box-orient: vertical;
											` : ''}
											variant={'h3'} size={windowWidth > 700 ? 1.3 : 'inherit'}
											color={isDark() ? theme.colorScheme.light : theme.colorScheme.body1}>
											{title}
										</Typography>
									</Textfit>

									<div className="py-0.5"/>
								</>
							)}

							<Typography as={'span'} variant={'small'} color={isDark() ? theme.colorScheme.subtitle2 : theme.colorScheme.body2}>
								{description}
							</Typography>
						</Card>
					</div>
				</Col>

				<Col className={`w-full ${(index % 2) === 0 && windowWidth > mobileBreakpoint ? 'items-end' : ''}`}>
					<div className="pt-[20px]">
						<Row dir="ltr"
						     className={`px-[6px] max-w-[430px] ${(index % 2) !== 0 ? '' : 'right-0'} ${windowWidth > mobileBreakpoint ? 'space-x-6' : 'flex-wrap gap-x-[24px] gap-y-[2px]'}`}>
							{technologies.map((item, index) => (
								<Typography className="whitespace-nowrap"
								            as={typeof item === 'string' ? 'p' : 'span'}
								            variant={'small'} color={isDark() ? theme.colorScheme.subtitle2 : theme.colorScheme.subtitle3}
								            key={index}>
									{item}
								</Typography>
							))}
						</Row>
					</div>

					<Row className={`space-x-3 rtl:flex-row-reverse rtl:justify-end pt-[16px] mb-1 pl-[6px]`}>
						{githubLink && (
							<Tooltip
								color={theme.colorScheme.overlaysDark}
								tooltip={t('githubLink')} placement={'bottom-center'}>
								<ATagButton className="p-0" colorsForStates={theme.colorSchemeByState.success}
								            href={githubLink} text icon size={'24px'}>
									<IconEvaGithubOutline/>
								</ATagButton>
							</Tooltip>
						)}

						{siteLink && (
							<Tooltip tooltip={t('siteLink')} placement={'bottom-center'}>
								<ATagButton className="p-0" colorsForStates={theme.colorSchemeByState.success}
								            href={siteLink} text icon size={'24px'}>
									<IconLucideExternalLink/>
								</ATagButton>
							</Tooltip>
						)}
					</Row>
				</Col>
			</Col>

			{((index % 2) !== 0 && windowWidth > mobileBreakpoint) && (
				<div className="cursor-pointer relative min-h-[320px] min-w-[530px]">
					<a className={css`
						${tw`absolute h-full w-full z-[1]`};
						background: ${isDarkMode ? `linear-gradient(${theme.colorScheme.dark}10, ${theme.colorScheme.primary}99)` : `linear-gradient(${theme.colorScheme.light}10, ${theme.colorScheme.primary}99)`};
						transition: all 250ms ease-in-out;
						opacity: 1;

						&:hover {
							opacity: 0;

							& ~ * {
								filter: none;
							}
						}
					`} href={siteLink}/>
					<img
						src={image}
						alt={''}
						className={css`
							${tw`absolute h-full w-full`};

							transition: all 250ms ease-in-out;
							filter: contrast(1) brightness(90%) blur(0.2px);
						`}/>
				</div>
			)}

		</Row>
	)
}

export default ExperienceItem
