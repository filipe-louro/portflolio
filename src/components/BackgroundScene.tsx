import React, {Suspense, useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import {Color, Group, Material} from 'three'
import randomColor from 'randomcolor'

useGLTF.preload('../assets/3d/space.glb')

interface SpaceModelProps {
    scale: [number, number, number];
    position: [number, number, number];
}

interface CustomMaterial extends Material {
    color: any;
}

const StyledCanvasWrapper = styled.div`
    background-color: black;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
`

const SpaceModel: React.FC<SpaceModelProps> = ({scale, position}) => {
    const group = useRef<Group>(null)
    const {materials, scene} = useGLTF('../assets/3d/space.glb')

    const [randomXDirection, setRandomXDirection] = useState<number>(1)
    const [randomYDirection, setRandomYDirection] = useState<number>(1)
    const [randomZDirection, setRandomZDirection] = useState<number>(1)
    const [currentColor, setCurrentColor] = useState<Color>(new Color())
    const [nextColor, setNextColor] = useState<Color>(new Color())
    const [colorFactor, setColorFactor] = useState<number>(0)

    const rotationSpeed = 0.000005

    const toggleRandomDirections = () => {
        setRandomXDirection(Math.random() * 2 - 1)
        setRandomYDirection(Math.random() * 2 - 1)
        setRandomZDirection(Math.random() * 2 - 1)
    }

    const interpolateColors = (color1: Color, color2: Color, factor: number) => {
        const result = new Color()
        result.copy(color1).lerp(color2, factor)
        return result
    }

    const applyNextColor = () => {
        setCurrentColor(nextColor)
        setNextColor(new Color(randomColor()))
        setColorFactor(0)
    }

    useFrame(() => {
        scene.rotation.x += rotationSpeed * randomXDirection
        scene.rotation.y += rotationSpeed * randomYDirection
        scene.rotation.z += rotationSpeed * randomZDirection

        if (colorFactor < 1) {
            setColorFactor(colorFactor + 0.001)
        } else {
            applyNextColor()
        }

        const currentColorToApply = interpolateColors(currentColor, nextColor, colorFactor)

        Object.values(materials).forEach((material) => {
            if (material && (material as CustomMaterial).color) {
                (material as CustomMaterial).color.copy(currentColorToApply)
            }
        })
    })

    useEffect(() => {
        toggleRandomDirections()

        const directionInterval = setInterval(() => {
            toggleRandomDirections()
        }, 10000)

        return () => {
            clearInterval(directionInterval)
        }
    }, [])

    return (
        <group ref={group}>
            <primitive object={scene} scale={scale} position={position}/>
            <mesh castShadow receiveShadow/>
        </group>
    )
}

const InteractiveSpaceScene: React.FC = () => {
    const numObjects = 5

    const objects: {
        scale: [number, number, number];
        position: [number, number, number]
    }[] = [{position: [-150, -150, 100], scale: [100, 100, 100]}]

    for (let i = 0; i < numObjects; i++) {
        objects.push({
            scale: [100, 100, 100],
            position: [-150, -150, 100]
        })
    }
    return (
        <StyledCanvasWrapper>
            <Canvas
                gl={{antialias: true}}
                dpr={[1, 1.5]}
                camera={{
                    zoom: 2,
                    fov: 100,
                    position: [1, 0, 1],
                    near: 1.5,
                    far: 10000
                }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[10, 10, 5]} intensity={1}/>
                    <pointLight position={[10, 5, 10]} intensity={2}/>
                    <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2}/>
                    <hemisphereLight groundColor="#000fff" intensity={1}/>

                    {objects.map((obj, index) => (
                        <SpaceModel key={index} scale={obj.scale} position={obj.position}/>
                    ))}

                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false}/>
                </Suspense>
            </Canvas>
        </StyledCanvasWrapper>
    )
}

export default InteractiveSpaceScene
