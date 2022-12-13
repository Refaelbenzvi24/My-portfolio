import { useMain } from "../context"
import { theme as uiTheme } from "./UI"
import IconButton, { IconButtonProps } from "./UI/Buttons/IconButton"
import { LocalStorage } from "../modules/LocalStorage"


const AnimationsToggle = (props: IconButtonProps) => {
	const { isAnimationsActive, setIsAnimationsActive } = useMain()

	const animationsToggle = () => {
		LocalStorage.setIsAnimationsActive(!isAnimationsActive)

		setIsAnimationsActive(() => !isAnimationsActive)

		document.location.reload()
	}

	return (
		<IconButton color={uiTheme.colorScheme.primary}
		            {...props}
		            aria-label="animations-toggle"
		            id="theme-toggle-button"
		            onClick={animationsToggle}>
			{isAnimationsActive ? <IconMdiMotion/> : <IconMdiMotionOutline/>}
		</IconButton>
	)
}

export default AnimationsToggle
