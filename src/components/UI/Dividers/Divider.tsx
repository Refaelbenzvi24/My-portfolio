import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"


interface DividerProps {
	vertical?: boolean
	size?: string
	thickness?: string
	color?: string
	opacity?: string
}

const Divider = styled(motion.hr)(({ color, opacity, vertical, size, thickness }: DividerProps) => [
	tw`flex justify-center items-center`,

	css`
		opacity: ${opacity};
		background-color: ${color};
	`,

	!vertical ? css` width: ${size};` : css` height: ${size};`,

	vertical ? css` width: ${thickness};` : css` height: ${thickness};`,

	css`
		border: none;
	`,
])

Divider.defaultProps = {
	opacity:   '100%',
	size:      '100%',
	thickness: '1px',
	color:     theme.colorScheme.primary,
}

export default Divider
