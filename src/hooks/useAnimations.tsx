import { AnimationProps } from "framer-motion"
import { Vars } from "../modules/vars"
import i18n from "i18next"


interface AnimationsObject extends Record<string, AnimationProps & { inView?: object, outOfView?: object } | AnimationsObject> {
}

export const generalAnimations = {
	fadeInOut:   {
		initial:    { opacity: 0 },
		animate:    { opacity: 1 },
		exit:       { opacity: 0 },
		transition: { duration: 0.3 }
	},
	fadeIn:      {
		initial:    { opacity: 0 },
		animate:    { opacity: 1 },
		transition: { duration: 0.3 }
	},
	slideInLeft: {},
} as const

const useAnimations = () => {
	const isRTL = i18n.dir() === 'rtl'

	const animations = {
		...generalAnimations,
		appBar:         {
			logo:           {
				initial: {
					opacity: 0,
					x:       -20
				},
				animate: {
					opacity: 1,
					x:       0
				},
			},
			navigationItem: {
				initial: {
					opacity: 0,
					y:       -20
				},
				animate: {
					opacity: 1,
					y:       0
				}
			},
			themeToggle:    {
				initial: {
					opacity: 0,
					x:       20
				},
				animate: {
					opacity: 1,
					x:       0
				},

			},
		},
		email:          {
			...generalAnimations.fadeIn,
			initial: {
				opacity:    0,
				translateX: 0
			},
			animate: {
				opacity: 1,
			},
		},
		bottomLinks:    {
			initial: {
				opacity:    0,
				translateY: 0
			},
		},
		home:           {
			homeItem: {
				initial:   {
					opacity: 0,
					y:       20
				},
				animate:   {
					opacity: 1,
					y:       0
				},
				inView:    {
					opacity: 1,
					y:       0,
				},
				outOfView: {
					opacity:    0,
					y:          20,
					transition: { delay: 0, duration: 0.5 }
				}
			},
		},
		sectionTitle:   {
			inView:    { opacity: 1, x: 0, transition: { duration: 0.8 } },
			outOfView: { opacity: 0, x: -10, transition: { duration: 0.8 } }
		},
		experienceItem: {
			inView:         { opacity: 1, x: 0 },
			outOfViewLeft:  isRTL ? { opacity: 0, x: 30 } : { opacity: 0, x: -30 },
			outOfViewRight: isRTL ? { opacity: 0, x: -30 } : { opacity: 0, x: 30 }
		},
		projectItem:    {
			inView:    { opacity: 1, x: 0 },
			outOfView: isRTL ? { opacity: 0, x: -30 } : { opacity: 0, x: 30 }
		},
		skills:         {
			skillTitle: {
				inView:    {
					opacity: 1,
					y:       0
				},
				outOfView: {
					opacity: 0,
					y:       -10
				}
			},
			skillCard:  {
				inView:    {
					opacity: 1,
					x:       0
				},
				outOfView: {
					opacity: 0,
					x:       -10
				}
			}
		},
		contact:        {
			formItem: {
				inView:    { opacity: 1, y: 0, transition: { duration: 0.8 } },
				outOfView: { opacity: 0, y: 30, transition: { duration: 0.8 } },
			}
		},
	} as const

	const removeAnimations = (animations: AnimationsObject): typeof animations => {
		return Object.fromEntries(
			Object.entries(animations).map(([key, value]) => {
				if (value.initial || value.animate || value.transition || value.exit || value.inView || value.outOfView) {
					return [key, Object.fromEntries(Object.entries(value).map(([key]) => [key, {}]))]
				}

				return [key, removeAnimations(value as AnimationsObject)]
			})
		)
	}

	if (!Vars.showAnimations) {
		return removeAnimations(animations as AnimationsObject) as typeof animations
	}

	return animations
}

export default useAnimations
