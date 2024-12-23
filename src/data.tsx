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
	skillsList: SkillsData[]
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
		resumeLink:     'https://drive.google.com/file/d/13Ka8Ii_-iuz22BqavhnzsT9oC-y509cs/view?usp=sharing',
	}

	const experience: Data["projects"] = [
		{
			title:        'Full Stack Developer - Utopia Tech Corp (2023 - Present)',
			description:  <>
				              <ul className={css`
					              ${tw`pl-4 py-1.5 ml-4 rtl:pl-0 rtl:pr-4 space-y-3 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('experience.utopia.description.bullet1')}</li>
					              <li>{t('experience.utopia.description.bullet2')}</li>
					              <li>{t('experience.utopia.description.bullet3')}</li>
					              <li>{t('experience.utopia.description.bullet4')}</li>
					              <li>{t('experience.utopia.description.bullet5')}</li>
					              <li>{t('experience.utopia.description.bullet6')}</li>
					              <li>{t('experience.utopia.description.bullet7')}</li>
				              </ul>
			              </>,
			technologies: ['Node.js', 'React', 'Express', 'PostgreSQL', 'TypeScript', 'JavaScript'],
			githubLink:   'https://github.com/Refaelbenzvi24/Messaging-frontend',
		}
	]

	const flagshipProjects: Data["experience"] = [
		{
			title:        'FitnessHub - Full Stack Developer - Self employed',
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
			videoLink:    'https://www.youtube.com/watch?v=XGT6-gnB93Y',
			description:  <>
				              <p>
					              {t('flagshipProjects.fitnesshub.description.firstLine')}
				              </p>
				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('flagshipProjects.fitnesshub.description.firstBullet')}</li>
					              <li>{t('flagshipProjects.fitnesshub.description.secondBullet')}</li>
					              <li>{t('flagshipProjects.fitnesshub.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}, {
			title:        'FlashCards - Full Stack Developer - Internship',
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
				              <p>{t('flagshipProjects.flashcards.description.firstLine')}</p>
				              <p className="pt-0.5">{t('flagshipProjects.flashcards.description.secondLine')}</p>
				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('flagshipProjects.flashcards.description.firstBullet')}</li>
					              <li>{t('flagshipProjects.flashcards.description.secondBullet')}</li>
					              <li>{t('flagshipProjects.flashcards.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}, {
			title:        'Shifter - Full Stack Developer - Internship',
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
				              <p>{t('flagshipProjects.shifter.description.firstLine')}</p>
				              <p>{t('flagshipProjects.shifter.description.secondLine')}</p>

				              <ul className={css`
					              ${tw`pl-4 pt-2 rtl:pl-0 rtl:pr-4 list-disc`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>{t('flagshipProjects.shifter.description.firstBullet')}</li>
					              <li>{t('flagshipProjects.shifter.description.secondBullet')}</li>
					              <li>{t('flagshipProjects.shifter.description.thirdBullet')}</li>
				              </ul>
			              </>,
		}]

	const projects: Data["projects"] = [

		{
			title:        'Viterect - Vite React Boilerplate',
			description:  <>
				              {t('projects.viterect.description')}
			              </>,
			technologies: ['React', 'React Query', 'Styled Components', 'TailwindCSS', 'More on GitHub...'],
			githubLink:   'https://github.com/Refaelbenzvi24/Viterect-vite-react-boilerplate',
			siteLink:     'https://viterect-358000.oa.r.appspot.com/about'
		},
		{
			title:        'Messaging app',
			description:  <>
				              <p>
					              {t('projects.messagingApp.description.firstLine')}
				              </p>
				              <p>
					              {t('projects.messagingApp.description.secondLine')}
				              </p>
				              <ul className={css`
					              ${tw`pl-4 py-1.5 ml-4 rtl:pl-0 rtl:pr-4 list-decimal`}
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
			technologies: ['React', 'Redux', 'Context API', 'Recoil.js', 'Styled Components', 'TailwindCSS'],
			githubLink:   'https://github.com/Refaelbenzvi24/Messaging-frontend',
		},
		{
			title:        'Demo Microservices System',
			description:  <>
				              <p>{t('projects.demoMicroservicesSystem.description.firstLine')}</p>
				              <ul className={css`
					              ${tw`pl-4 ml-4 py-1.5 rtl:pl-0 rtl:pr-4 list-decimal`}
					              li::marker {
						              color: ${theme.colorScheme.secondary};
					              }
				              `}>
					              <li>
						              {t('projects.demoMicroservicesSystem.description.firstModule')}
					              </li>
					              <li>
						              {t('projects.demoMicroservicesSystem.description.secondModule.firstLine')}

						              <ul className={css`
							              ${tw`pl-4 py-1.5 rtl:pl-0 rtl:pr-4 list-disc`}
							              li::marker {
								              color: ${theme.colorScheme.secondary};
							              }
						              `}>
							              <li>{t('projects.demoMicroservicesSystem.description.secondModule.firstBullet')}</li>
							              <li>{t('projects.demoMicroservicesSystem.description.secondModule.secondBullet')}</li>
						              </ul>
					              </li>
					              <li>{t('projects.demoMicroservicesSystem.description.thirdModule')}</li>
				              </ul>
			              </>,
			technologies: ['Python', 'RabbitMQ', 'Docker', 'PDM'],
			githubLink:   'https://github.com/Refaelbenzvi24/Mini-microservices-docker-rabbitmq-system'
		},
		{
			title:        'Superscraper Telegram Bot',
			description:  <>
				              <p>{t('projects.telegramBot.description')}</p>
			              </>,
			technologies: ['Python', 'RabbitMQ', 'PyQuery', 'Celery', 'Docker', 'SQLAlchemy', 'PostgreSQL'],
			githubLink:   'https://github.com/Refaelbenzvi24/superscraper-telegram-bot'
		},
		{
			title:        'Hotel tasks dashboard',
			description:  <>
				              <p>{t('projects.hotelTasksDashboard.description')}</p>
			              </>,
			technologies: ['React Native', 'TailwindCSS', 'Mirage.js'],
			githubLink:   'https://github.com/Refaelbenzvi24/Hotel-tasks-dashboard',
		},
		{
			title:        'Deliveroo - food delivery',
			description:  <>
				              <p>{t('projects.deliveroo.description')}</p>
			              </>,
			technologies: ['React Native', 'TailwindCSS', 'Sanity(CMS)'],
			githubLink:   'https://github.com/Refaelbenzvi24/Hotel-tasks-dashboard',
		},
		{
			title:        'Rolling Ball',
			description:  <>
				              <p>{t('projects.rollingBall.description')}</p>
			              </>,
			technologies: ['Unity', 'C#'],
			githubLink:   'https://github.com/Refaelbenzvi24/Rolling-Ball',
		}
	]

	const skillsList: Data["skillsList"] = [
		{
			Languages: ['TypeScript', 'JavaScript', 'Python', 'C#', 'C++'],
			Frontend:  ['React', 'Vue', 'Next.js', 'React Native', 'HTML', 'CSS/SCSS/SASS', 'TailwindCSS', 'Styled Components'],
		},
		{
			DB:      ['MongoDB', 'SQL', 'PostgreSQL', "ORM's", 'Mongoose', 'Firebase', 'ElasticSearch'],
			Backend: ['Node.js', 'Express', 'FastAPI', 'Flask', 'Celery'],
		},
		{
			'Testing / Automation': ['Jest', 'Cypress', 'Chai', 'Mocha', 'Selenium'],
			Other:                  ['Git', 'Docker', 'CI/CD', 'Google Cloud', 'Netlify', 'Vercel', 'RabbitMQ', 'Event Driven', 'Microservices'],
		},
	]

	const navigationOptions: Data["navigationOptions"] = [
		{ label: t('nav.home'), value: '#main' },
		{ label: t('nav.experience'), value: '#experience' },
		{ label: t('nav.flagshipProjects'), value: '#flagship-projects' },
		{ label: t('nav.projects'), value: '#projects' },
		{ label: t('nav.skills'), value: '#skills' },
		{ label: t('nav.contact'), value: '#contact' },
	]

	return { email, linksList, homeData, experience, flagshipProjects, projects, skillsList, navigationOptions }
}

export default data
