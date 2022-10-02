import { RefObject, useEffect, useRef } from "react"

import { css as classCss } from "@emotion/css"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import autoAnimate from '@formkit/auto-animate'
import clsx from "clsx"
import { HTMLMotionProps, motion } from "framer-motion"
import tw from "twin.macro"

import theme from "../Utils/theme"
import ConditionalLabel from "./ConditionalLabel"
import HelperText from "./HelperText"


export const TextFieldInput = styled(motion.input)(({ dark, centered }: { dark?: boolean, centered?: boolean }) => [
	tw`w-full py-[7px] px-[22px] resize-none place-self-center`,
	centered && tw`text-center`,

	css`
		background-color: ${theme.colorScheme.accent};
		color: ${theme.colorScheme.header2};
		box-shadow: ${theme.shadows["2"]};
		font-weight: ${500};
		font-size: 1rem;
		line-height: 140%;

		&:focus {
			box-shadow: ${theme.shadows["3"]};

			${tw`outline-none ring-transparent`}
		}

		::placeholder {
			color: ${theme.colorScheme.subtitle1};
			opacity: 0.8;
		}

		:-ms-input-placeholder {
			color: ${theme.colorScheme.subtitle1};
			opacity: 0.8;
		}

		::-ms-input-placeholder {
			color: ${theme.colorScheme.subtitle1};
			opacity: 0.8;
		}
	`,

	(props) => (dark || props.theme.isDark) && css`
		background-color: ${theme.colorScheme.overlaysDark};
		color: ${theme.colorScheme.accent};
	`,
])


interface TextFieldProps extends HTMLMotionProps<"input"> {
	innerRef?: RefObject<HTMLInputElement>
	placeholder?: string
	persistentLabel?: boolean
	centered?: boolean
	value?: string | readonly string[] | number | undefined
	error?: boolean
	helperText?: string
	label?: string
}


const TextField = (props: TextFieldProps) => {
	const { label, innerRef, className, persistentLabel, placeholder, centered, onChange, value, error, helperText, ...restProps } = props

	const sectionRef = useRef(null)

	useEffect(() => {
		sectionRef.current && autoAnimate(sectionRef.current)
	}, [sectionRef])


	return (
		<section ref={sectionRef}>
			<ConditionalLabel {...{ label, persistentLabel, value }}/>

			<TextFieldInput {...restProps}
			                ref={innerRef}
			                className={`${classCss`
				                ${(value && label) || (label && persistentLabel) ? tw`mt-0` : tw`mt-6`}
				                ${helperText ? tw`mb-0` : tw`mb-6`}
			                `} ${clsx(className)}`}
			                placeholder={placeholder || (!persistentLabel ? label : '')}
			                {...{ centered, onChange, value }}/>

			{helperText && <HelperText {...{ error }}>{helperText}</HelperText>}
		</section>
	)
}

TextField.defaultProps = {
	placeholder:     undefined,
	centered:        false,
	persistentLabel: false,
	value:           undefined,
	error:           false,
	helperText:      undefined,
	label:           undefined,
}

export default TextField
