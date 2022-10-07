import { ReactNode } from "react"

import { css } from "@emotion/css"
import tw from "twin.macro"

import fitnesshubCover from "./assets/FitnesshubCover.webp"
import flashcardsCover from "./assets/FlashcardsCover.webp"
import shifterCover from "./assets/ShifterCover.webp"
import { ExperienceData } from "./components/Home/ExperienceItem"
import { ProjectData } from "./components/Home/Projects"
import { SkillsData } from "./components/Home/Skills"
import { Icon, Row, theme, Tooltip } from "./components/UI"


interface Data {
	email: string,
	linksList: { tooltip: string, link: string, icon: ReactNode, [key: string]: any }[],
	homeData: {
		name: string,
		secondaryTitle: string
		description: ReactNode
		resumeLink: string
	}
	experience: ExperienceData[]
	projects: ProjectData[]
	skillsList: SkillsData[][]
	navigationOptions: { label: string, value: string, [key: string]: any }[]
}

const data = (): Data => {
	const { t } = useTranslation()

	const email = 'refaelbenzvi24@gmail.com'

	const linksList: Data["linksList"] = [
		{
			tooltip: 'LinkedIn',
			link:    'https://linkedin.com/in/refael-ben-zvi/',
			icon:    <IconFaBrandsLinkedinIn/>,
		}, {
			tooltip: 'GitHub',
			link:    'https://github.com/Refaelbenzvi24',
			icon:    <IconIonLogoGithub/>,
		}, {
			tooltip: 'WhatsApp',
			link:    'https://wa.me/972542418018',
			icon:    <IconCibWhatsapp/>,
		},
	]

	const homeData: Data["homeData"] = {
		name:           t('home.name'),
		secondaryTitle: t('home.secondaryTitle'),
		description:    <>
			                {t('home.description.firstLine')}
			                {' '}
			                <br/>
			                {t('home.description.secondLine')}
			                {' '}
			                <br/>
			                {t('home.description.thirdLine')}
		                </>,
		resumeLink:     'https://drive.google.com/file/d/1VqavIntpFoSSL_5qZlnwDt9WDplPJ2zX/view?usp=sharing',
	}

	const experience: Data["experience"] = [
		{
			title:        'FitnessHub - Freelance Full Stack Developer',
			dates:        '2021-2022',
			image:        fitnesshubCover,
			technologies: [
				<Tooltip
					tooltip={(
						<>
							M - MongoDB
							{' '}
							<br/>
							E - Express
							{' '}
							<br/>
							V - Vue
							{' '}
							<br/>
							N - Node.js
						</>
					)}
					dir="ltr"
					isClickableOnMobile
					isPersistentOnMobile
					placement="bottom-left"
					elevation={1}
					offsetY={1}
					offsetX={1}>
					<Row className="justify-center items-center">
						<Icon className="mb-0.5 mr-0.5" color={theme.colorScheme.subtitle2} size={10}>
							<IconEntypoInfoWithCircle/>
						</Icon>
						MEVN
					</Row>
				</Tooltip>, 'Material UI', 'GCloud', 'Multer', 'CI/CD'],
			siteLink:     'https://fitnesshub-fit.vercel.app/',
			description:  <>
				              <p>
					              {t('experience.fitnesshub.description.firstLine')}
				              </p>
				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('experience.fitnesshub.description.firstBullet')}</li>
					              <li>{t('experience.fitnesshub.description.secondBullet')}</li>
					              <li>{t('experience.fitnesshub.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}, {
			title:        'FlashCards - Full Stack Developer',
			dates:        '2022',
			image:        flashcardsCover,
			technologies: [
				<Tooltip
					tooltip={(
						<>
							M - MongoDB
							{' '}
							<br/>
							E - Express
							{' '}
							<br/>
							R - React
							{' '}
							<br/>
							N - Node.js
						</>
					)}
					dir="ltr"
					isClickableOnMobile
					isPersistentOnMobile
					placement="bottom-left"
					elevation={1}
					offsetY={1}
					offsetX={1}>
					<Row className="justify-center items-center">
						<Icon className="mb-0.5 mr-0.5" color={theme.colorScheme.subtitle2} size={10}>
							<IconEntypoInfoWithCircle/>
						</Icon>
						MERN
					</Row>
				</Tooltip>, 'Emotion', 'Tailwindcss', 'GCloud', 'Netlify'],
			githubLink:   'https://github.com/flashcards-app',
			siteLink:     'https://flashcardsapps.netlify.app/',
			description:  <>
				              <p>{t('experience.flashcards.description.firstLine')}</p>
				              <p className="pt-0.5">{t('experience.flashcards.description.secondLine')}</p>
				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('experience.flashcards.description.firstBullet')}</li>
					              <li>{t('experience.flashcards.description.secondBullet')}</li>
					              <li>{t('experience.flashcards.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}, {
			title:        'Shifter - Full Stack Developer',
			dates:        '2022',
			image:        shifterCover,
			technologies: [
				<Tooltip
					tooltip={(
						<>
							M - MongoDB
							{' '}
							<br/>
							E - Express
							{' '}
							<br/>
							R - React
							{' '}
							<br/>
							N - Node.js
						</>
					)}
					dir="ltr"
					placement="bottom-left"
					isClickableOnMobile
					isPersistentOnMobile
					elevation={1}
					offsetY={1}
					offsetX={1}>
					<Row className="justify-center items-center">
						<Icon className="mb-0.5 mr-0.5" color={theme.colorScheme.subtitle2} size={10}>
							<IconEntypoInfoWithCircle/>
						</Icon>
						MERN
					</Row>
				</Tooltip>,
				'CSS Modules', 'Moment.js', 'Vercel'],
			githubLink:   'https://github.com/Cleary-by-francesca',
			siteLink:     'https://shifterapp.netlify.app/',
			description:  <>
				              <p>{t('experience.shifter.description.firstLine')}</p>
				              <p>{t('experience.shifter.description.secondLine')}</p>

				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('experience.shifter.description.firstBullet')}</li>
					              <li>{t('experience.shifter.description.secondBullet')}</li>
					              <li>{t('experience.shifter.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}]

	const projects: Data["projects"] = [
		{
			title:       'Viterect Vite React Boilerplate',
			description: <>
				             {t('projects.viterect.description')}
			             </>,
			githubLink:  'https://github.com/Refaelbenzvi24/Viterect-vite-react-boilerplate',
			siteLink:    'https://viterect-358000.oa.r.appspot.com/about',
		}, {
			title:       'Messaging-app',
			description: <>
				             <p>
					             {t('projects.messagingApp.description.firstLine')}
				             </p>
				             <p>
					             {t('projects.messagingApp.description.secondLine')}
				             </p>
				             <ul className={css`
					             ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					             li::marker {
						             color: ${theme.colorScheme.secondary};
					             }
				             `}>
					             <li>{t('projects.messagingApp.description.contextBullet')}</li>
					             <li>{t('projects.messagingApp.description.reduxBullet')}</li>
					             <li>{t('projects.messagingApp.description.recoilBullet')}</li>
				             </ul>
				             <p>
					             {t('projects.messagingApp.description.thirdLine')}
				             </p>
			             </>,
			githubLink:  'https://github.com/Refaelbenzvi24/Messaging-frontend',
		}, {
			title:       'Rolling-Ball',
			description: <>
				             {t('projects.rollingBall.description')}
			             </>,
			githubLink:  'https://github.com/Refaelbenzvi24/Rolling-Ball',
		},
	]

	const skillsList: Data["skillsList"] = [
		[{
			Languages: ['TypeScript', 'JavaScript', 'Python', 'C#'],
			Frontend:  ['React', 'Vue', 'HTML', 'CSS/SCSS/SASS', 'React Native'],
		}],
		[{
			DB:      ['MongoDB', 'Firebase', 'ElasticSearch'],
			Backend: ['Node.js', 'Express', 'Mongoose', 'Flask'],
		}],
		[{
			'Testing / Automation': ['Jest', 'Cypress', 'Chai', 'Mocha', 'Selenium'],
			Other:                  ['Git', 'Docker', 'CI/CD', 'Google Cloud', 'Netlify', 'Vercel'],
		}],
	]

	const navigationOptions: Data["navigationOptions"] = [
		{ label: t('nav.home'), value: '#main' },
		{ label: t('nav.experience'), value: '#experience' },
		{ label: t('nav.projects'), value: '#projects' },
		{ label: t('nav.skills'), value: '#skills' },
		{ label: t('nav.contact'), value: '#contact' },
	]

	return { email, linksList, homeData, experience, projects, skillsList, navigationOptions }
}

export default data
