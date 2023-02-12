import { HTMLMotionProps, motion } from "framer-motion"

import { useMain } from "../../../context"
import { defaultMainData } from '../Main/MainContext'
import useDimensions from "../../../hooks/useDimensions"


const { sideBarOpts: defaultSideBarOptions } = defaultMainData
const { shrinkPoint: defaultShrinkPoint }    = defaultSideBarOptions

const SideBarLink = (props: HTMLMotionProps<"div">) => {
	const { children, ...restProps } = props

	const { sideBarState, sideBarOpts, setSideBarState, setOverlayState } = useMain()

	const { windowWidth } = useDimensions()

	const { shrinkPoint } = {
		...sideBarOpts,
		shrinkPoint: sideBarOpts.shrinkPoint || defaultShrinkPoint,
	}

	const action = () => {
		if (sideBarState && shrinkPoint && shrinkPoint > windowWidth) {
			setSideBarState(false)
			setOverlayState(false)
		}
	}

	return (
		<motion.div {...restProps}
		            role="presentation"
		            onClick={action}>
			{children}
		</motion.div>
	)
}

export default SideBarLink
