import { css, PropsOf, Theme } from "@emotion/react"
import styled from "@emotion/styled"
import { CustomDomComponent, ForwardRefComponent, HTMLMotionProps, motion, SVGMotionProps } from "framer-motion"
import tw from 'twin.macro'

import theme from "../Utils/theme"
import { ComponentType, CSSProperties, DetailedHTMLFactory, forwardRef, PropsWithChildren, ReactHTML, Ref, SVGProps } from "react"
import { color } from "@storybook/theming"
import { CreateStyledComponent } from "@emotion/styled/base"


export interface ColorsForState {
	default: string
	hover?: string
	active?: string
	lightDisabled?: string
	darkDisabled?: string
	lightDisabledText?: string
	darkDisabledText?: string
}

export interface ButtonProps {
	dark?: boolean
	centered?: boolean
	color?: string
	fab?: boolean
	icon?: boolean
	height?: string | number
	width?: string | number
	size?: string
	text?: boolean
	noShadow?: boolean
	elevation?: keyof typeof theme.shadows
	bgColor?: CSSProperties["backgroundColor"]
	colorsForStates?: ColorsForState
}

const Button = styled(motion.button)(({
	colorsForStates,
	color,
	elevation,
	noShadow,
	text,
	icon,
	bgColor,
	height,
	size,
	width,
	fab,
	centered,
	dark
}: ButtonProps) => [
	tw`text-sm font-semibold cursor-pointer border-none bg-transparent`,
	icon && tw`p-2 w-fit h-fit`,
	!icon && tw`px-4 py-2`,

	centered && tw`text-center`,
	fab && tw`rounded-full`,

	height && css`
		height: ${icon ? 'fit-content' : typeof height === 'number' ? `${height}px` : height};
	`,
	width && css`
		width: ${icon ? 'fit-content' : typeof width === 'number' ? `${width}px` : width};
	`,
	size && css`
		font-size: ${size};
	`,

	(!icon && !text && !noShadow) && css`
		box-shadow: ${theme.shadows[elevation || 3]};
	`,

	icon && css`
		display: flex;

		* {
			width: ${size};
			height: ${size};
		}
	`,

	css`
		&:disabled {
			${tw`cursor-default`};
		}
	`,

	!text && css`
		color: ${color || theme.colors.gray_900};
		background-color: ${colorsForStates?.default || bgColor || theme.colors.gray_200};
		transition: all 100ms linear;

		* {
			transition: all 100ms linear;
		}

		&:hover {
			background-color: ${colorsForStates?.hover || theme.colors.light_700};
		}

		&:active {
			background-color: ${colorsForStates?.active || theme.colors.light_600};
		}

		&:disabled {
			* {
				color: ${colorsForStates?.lightDisabledText || theme.colors.gray_600};
			}

			box-shadow: none;
			background-color: ${colorsForStates?.lightDisabled || theme.colors.gray_200};
		}
	`,

	(props) => (!text && (dark || props.theme.isDark)) && css`
		background-color: ${colorsForStates?.default || bgColor || theme.colors.dark_400};
		color: ${color || theme.colors.gray_200};

		&:hover {
			color: ${theme.colors.white};
			background-color: ${colorsForStates?.hover || theme.colors.dark_200};
		}

		&:active {
			background-color: ${colorsForStates?.active || theme.colors.dark_100}
		}

		&:disabled {
			* {
				color: ${colorsForStates?.darkDisabledText || theme.colors.gray_600};
			}

			box-shadow: none;
			background-color: ${colorsForStates?.darkDisabled || theme.colors.dark_400};
		}
	`,

	text && css`
		color: ${colorsForStates?.default || color || theme.colors.gray_200};

		* {
			transition: color 100ms ease-in-out;
		}

		&:hover {
			& > * {
				color: ${colorsForStates?.hover || theme.colors.light_700};
			}
		}

		&:active {
			& > * {
				color: ${colorsForStates?.active || theme.colors.light_600};
			}
		}

		&:disabled {

			& > * {
				color: ${colorsForStates?.lightDisabledText || theme.colors.gray_200};
			}
		}
	`,
	(props) => (text && (dark || props.theme.isDark)) && css`
		& > * {
			color: ${colorsForStates?.default || color || theme.colors.dark_400};
		}

		&:hover {
			& > * {
				color: ${colorsForStates?.hover || theme.colors.dark_200};
			}
		}

		&:active {
			& > * {
				color: ${colorsForStates?.active || theme.colors.dark_100}
			}
		}

		&:disabled {
			& > * {
				color: ${colorsForStates?.darkDisabledText || theme.colors.gray_200};
			}
		}
	`,
])


export default Button


