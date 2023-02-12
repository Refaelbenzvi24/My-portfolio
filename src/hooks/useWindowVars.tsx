import { useEffect, useState } from 'react'

import { useMain } from "../context"


const useWindowVars = () => {
	const { isTouchable, isMobile, scrollDirection } = useMain()

	const [pointerX, setPointerX] = useState(window.innerWidth / 2)
	const [pointerY, setPointerY] = useState(window.innerHeight / 2)


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


	useEffect(() => {
		window.addEventListener('mousemove', setMouseData)
		window.addEventListener('touchmove', setTouchData)

		return () => {
			window.removeEventListener('mousemove', setMouseData)
			window.removeEventListener('touchmove', setTouchData)
		}
	}, [])

	return {
		isTouchable,
		isMobile,
		scrollDirection,
		pointerX,
		pointerY,
	}
}

export default useWindowVars
