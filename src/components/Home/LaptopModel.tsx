import { useEffect, useRef, useState } from "react"

import { a as three, Interpolation } from '@react-spring/three'
import { useGLTF } from "@react-three/drei"
import { GroupProps, useFrame } from "@react-three/fiber"
import { Group } from "three"
import * as THREE from "three"
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader"


type GLTFResult = GLTF & {
	nodes: Record<string, THREE.Mesh>
	materials: Record<string, THREE.MeshStandardMaterial>
}

interface LaptopModelProps extends GroupProps {
	open: boolean
	hinge: Interpolation<number, number>
}

const LaptopModel = (props: LaptopModelProps) => {
	const { open, hinge, ...restProps } = props

	const group                 = useRef<Group>(null)
	const { nodes, materials }  = useGLTF('/mac-draco.glb') as GLTFResult
	const [hovered, setHovered] = useState(false)

	useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
	useFrame((state) => {
		const t = state.clock.getElapsedTime()
		if (group.current) {
			group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, open ? Math.cos(t / 10) / 10 + 0.25 : 0, 0.1)
			group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, open ? Math.sin(t / 10) / 4 : 0, 0.1)
			group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, open ? Math.sin(t / 10) / 10 : 0, 0.1)
			group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? (-2 + Math.sin(t)) / 3 : -4.3, 0.1)
		}
	})
	// The view was auto-generated by: https://github.com/pmndrs/gltfjsx
	// Events and spring animations were added afterwards
	return (
		<group
			ref={group}
			{...restProps}
			onPointerOver={(e) => {
				e.stopPropagation()
				setHovered(true)
			}}
			onPointerOut={() => setHovered(false)}
			dispose={null}>
			<three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
				<group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
					<mesh material={materials.aluminium} geometry={nodes.Cube008.geometry}/>
					<mesh material={materials['matte.001']} geometry={nodes.Cube008_1.geometry}/>
					<mesh material={materials['screen.001']} geometry={nodes.Cube008_2.geometry}/>
				</group>
			</three.group>
			<mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]}/>
			<group position={[0, -0.1, 3.39]}>
				<mesh material={materials.aluminium} geometry={nodes.Cube002.geometry}/>
				<mesh material={materials.trackpad} geometry={nodes.Cube002_1.geometry}/>
			</group>
			<mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]}/>
		</group>
	)
}

export default LaptopModel
