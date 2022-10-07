import { useRef } from "react"

import { css } from "@emotion/css"
import { motion, HTMLMotionProps } from "framer-motion"
import tw from "twin.macro"

import { Button, theme, Typography } from '..'
import { ButtonProps } from "../Buttons/Button"


type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

interface NavigationItemProps extends MotionButtonProps {
	label: string
	value: string
	onSelect: () => void
	selected: { label: string, value: string } | undefined
}

const NavigationItem = (props: NavigationItemProps) => {
	const { label, value, onSelect, selected, ...restProps } = props

	const buttonRef = useRef(null)

	return (
		<Button
			ref={buttonRef}
			className={`p-0 ${css`
				${tw`cursor-pointer relative`};

				div {
					transition: width 350ms ease-in-out;
				}

				[dir=ltr] & {
					margin-right: 45px;
				}

				[dir=rtl] & {
					margin-left: 45px;
				}

				&:hover div {
					width: 100% !important;
				}
			`}`}
			onClick={onSelect}
			colorsForStates={theme.colorSchemeByState.primary}
			text
			{...restProps}>
			<div className="absolute w-full bottom-0">
				<motion.div
					initial={{
						translateY: 8,
						width:      0,
					}}
					animate={(selected?.value === value) ? {
						width: '100%',
					} : { width: 0 }}
					transition={{
						duration: 0.35,
					}}
					className={css`
						bottom: -2px;
						height: 3px;
						background-color: ${theme.colorScheme.primary};
					`}/>
			</div>


			<Typography
				className="whitespace-nowrap"
				color={theme.colorScheme.primary}
				variant="preTitle">
				{label}
			</Typography>
		</Button>
	)
}

export default NavigationItem
