import { useEffect, useState } from 'react'

import { useMain } from "../context"


const useWindowVars = () => {
	const { isTouchable, isMobile, scrollDirection } = useMain()

	const [windowWidth, setWindowWidth]   = useState(window.innerWidth)
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [pointerX, setPointerX]         = useState(windowWidth / 2)
	const [pointerY, setPointerY]         = useState(windowHeight / 2)


	const setMouseData = (evt: MouseEvent) => {
		setPointerX(evt.clientX)
		setPointerY(evt.clientY)
	}

	const setTouchData = (touchHandler: TouchEvent) => {
		if (touchHandler.touches.length > 0) {
			setPointerX(touchHandler.touches[0].clientX)
			setPointerY(touchHandler.touches[0].clientY)
		}
	}

	const setWindowData = () => {
		setWindowHeight(window.innerHeight)
		setWindowWidth(window.innerWidth)
	}


	useEffect(() => {
		window.addEventListener('resize', setWindowData)
		window.addEventListener('mousemove', setMouseData)
		window.addEventListener('touchmove', setTouchData)

		return () => {
			window.removeEventListener('resize', setWindowData)
			window.removeEventListener('mousemove', setMouseData)
			window.removeEventListener('touchmove', setTouchData)
		}
	}, [])

	return {
		isTouchable,
		isMobile,
		scrollDirection,
		windowWidth,
		windowHeight,
		pointerX,
		pointerY,
	}
}

export default useWindowVars
