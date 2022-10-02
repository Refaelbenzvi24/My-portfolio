import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


export interface CardProps extends HTMLMotionProps<"div"> {
	dark?: boolean,
	height?: string
	minHeight?: string
	maxHeight?: string
	width?: string
	minWidth?: string
	maxWidth?: string
	bgColor?: string
	noShadow?: boolean
	elevation?: keyof typeof theme.shadows
}


const Card = styled(motion.div)(({ dark, elevation, noShadow, bgColor, minHeight, maxHeight, height, minWidth, maxWidth, width }: CardProps) => [
	tw`right-0 origin-top-right p-2 overflow-hidden bg-white`,

	!noShadow && css`
		box-shadow: ${theme.shadows[elevation || 3]};
	`,

	css`
		background-color: ${bgColor || theme.colors.white};
		height: ${height};
		width: ${width};
	`,

	minHeight && css`
		min-height: ${minHeight};
	`,
	maxHeight && css`
		max-height: ${maxHeight};
	`,
	minWidth && css`
		min-width: ${minWidth};
	`,
	maxWidth && css`
		max-width: ${maxWidth};
	`,

	(props) => (dark || props.theme.isDark) && css`
		background-color: ${bgColor || theme.colors.dark_400};
	`,
	({ className }) => className,
])

Card.defaultProps = {
	height: "300px",
	width:  "200px",
}
export default Card
