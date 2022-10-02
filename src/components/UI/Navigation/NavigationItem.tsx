import { motion, HTMLMotionProps } from "framer-motion"
import { ButtonProps } from "../Buttons/Button"
import { Button, theme, Typography } from "../index"
import { useRef } from "react"
import { css } from "@emotion/css"
import tw from "twin.macro"


type MotionButtonProps = ButtonProps & HTMLMotionProps<"button">

interface NavigationItemProps extends MotionButtonProps {
	label: string
	value: string
	onSelect?: () => void
	selected?: { label: string, value: string }
}

const NavigationItem = (props: NavigationItemProps) => {
	const { label, value, onSelect, selected, ...restProps } = props

	const buttonRef = useRef(null)

	return (
		<div
			onClick={onSelect}
			className={css`
				${tw`cursor-pointer relative`};
					* {
						transition: width 350ms ease-in-out;
					}
				&:hover * {
					width: 100% !important;
				}
			`}>
			<div className="absolute w-full bottom-0">
				<motion.div
					initial={{
						translateY: 5,
						width:      0
					}}
					animate={(selected?.value === value) ? {
						width: '100%'
					} : { width: 0 }}
					transition={{
						duration: 0.35
					}}
					className={css`
						bottom: -2px;
						height: 3px;
						background-color: ${theme.colorScheme.primary};
					`}/>
			</div>

			<Button
				ref={buttonRef}
				className="p-0"
				colorsForStates={theme.colorSchemeByState.primary}
				text
				{...restProps}>
				<Typography
					color={theme.colorScheme.primary}
					variant={'preTitle'}>
					{label}
				</Typography>
			</Button>
		</div>
	)
}

export default NavigationItem
