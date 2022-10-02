// combineComponents.tsx
import { FC, ReactNode } from 'react'


const CombinedComponents = (...components: FC[]) => {
	return components.reduce((AccumulatedComponents, CurrentComponent) => {
		return ({ children }: { children: ReactNode }) => {
			return (
				<AccumulatedComponents>
					<CurrentComponent>
						{children}
					</CurrentComponent>
				</AccumulatedComponents>
			)
		}
	}, ({ children }: { children: ReactNode }) => <>{children}</>)
}

export default CombinedComponents
