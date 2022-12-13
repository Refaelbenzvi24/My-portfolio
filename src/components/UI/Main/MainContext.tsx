import { createContext } from 'react'

import type { MainContextType, MainDataType } from './types'
import { Vars } from "../../../modules/vars"


export const defaultMainData: MainDataType = {
	isTouchable: false,
	isMobile: false,
	scrollDirection: 'down',
	appBarState:        false,
	appBarOpts:         {
		height: 82,
	},
	sideBarState:       false,
	sideBarOpts:        {
		width:       260,
		shrinkPoint: 1300,
	},
	overlayState:       false,
	isAnimationsActive: Vars.showAnimations,
}

export const MainContext = createContext<MainContextType>({} as MainContextType)
