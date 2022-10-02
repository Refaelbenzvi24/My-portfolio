import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import tw from "twin.macro"
import clsx from "clsx"


interface NavigationWrapperProps {
	vertical?: boolean
}

const NavigationWrapper = styled(motion.div)(({ vertical }: NavigationWrapperProps) => [
	tw`flex`,
	vertical ? tw`flex-col` : tw`flex-row`,

	css`
		& > div {
			margin-right: 45px;
		}
	`
])

interface NavigationProps extends Omit<HTMLMotionProps<"div">, 'children'>, NavigationWrapperProps {
	options: { label: string, value: string }[]
	navigationItemComp: (item: { label: string, value: string, isSelected: boolean }, index: number) => ReactNode
	selected?: { label: string, value: string }
}

const Navigation = (props: NavigationProps) => {
	const { selected, className, navigationItemComp, options, ...restProps } = props

	return (
		<NavigationWrapper {...restProps}
		                   className={clsx(className)}>
			{options.map((item, index) => (
				navigationItemComp({ ...item, isSelected: (item.value === selected?.value) }, index)
			))}
		</NavigationWrapper>
	)
}

export default Navigation
