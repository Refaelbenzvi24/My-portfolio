import { ReactNode } from "react"

import { css } from "@emotion/react"
import styled from "@emotion/styled"
import clsx from "clsx"
import { motion, HTMLMotionProps } from "framer-motion"
import tw from "twin.macro"


interface NavigationWrapperProps {
	vertical?: boolean
}

const NavigationWrapper = styled(motion.div)(({ vertical }: NavigationWrapperProps) => [
	tw`flex`,
	vertical ? tw`flex-col` : tw`flex-row`,
])

interface NavigationProps extends Omit<HTMLMotionProps<"div">, 'children'>, NavigationWrapperProps {
	options: { label: string, value: string }[]
	children: (item: { label: string, value: string, isSelected: boolean }, index: number) => ReactNode
	selected: { label: string, value: string }
}

const Navigation = (props: NavigationProps) => {
	const { selected, className, children, options, ...restProps } = props

	return (
		<NavigationWrapper {...restProps}
		                   className={clsx(className)}>
			{options.map((item, index) => (
				children({ ...item, isSelected: (item.value === selected?.value) }, index)
			))}
		</NavigationWrapper>
	)
}

Navigation.defaultProps = {
	vertical: false,
}

export default Navigation
