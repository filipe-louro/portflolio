import React, {Suspense, useEffect, useState} from 'react'
import styled from 'styled-components'
import {Canvas, useFrame} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'

interface SpaceModelProps {
    scale: [number, number, number];
    position: [number, number, number];
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
    const {scene} = useGLTF('../assets/3d/space.glb')

    useFrame(() => {
        scene.rotation.x += rotationSpeed * randomXDirection
        scene.rotation.y += rotationSpeed * randomYDirection
        scene.rotation.z += rotationSpeed * randomZDirection
    })

    const [randomXDirection, setRandomXDirection] = useState<number>(1)
    const [randomYDirection, setRandomYDirection] = useState<number>(1)
    const [randomZDirection, setRandomZDirection] = useState<number>(1)

    const rotationSpeed = 0.00001

    const toggleRandomDirections = () => {
        setRandomXDirection(Math.random() * 2 - 1)
        setRandomYDirection(Math.random() * 2 - 1)
        setRandomZDirection(Math.random() * 2 - 1)
    }

    useEffect(() => {
        toggleRandomDirections()


        const interval = setInterval(() => {
            toggleRandomDirections()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return <primitive object={scene} scale={scale} position={position}/>
}

interface InteractiveSpaceSceneProps {
    scrollContainer: React.RefObject<HTMLDivElement>;
}

const InteractiveSpaceScene: React.FC<InteractiveSpaceSceneProps> = ({
                                                                         scrollContainer
                                                                     }) => {
    const [scale, setScale] = useState<[number, number, number]>([100, 100, 100])
    const [position, setPosition] = useState<[number, number, number]>([
        -150,
        -150,
        100
    ])

    return (
        <StyledCanvasWrapper>
            <Canvas camera={{zoom: 2, fov: 100, position: [1, 0, 1], near: 1.5, far: 10000}}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5}/>
                    <directionalLight position={[10, 10, 5]} intensity={1}/>
                    <pointLight position={[10, 5, 10]} intensity={2}/>
                    <spotLight position={[0, 50, 10]} angle={0.15} penumbra={1} intensity={2}/>
                    <hemisphereLight groundColor="#000000" intensity={1}/>

                    <SpaceModel scale={scale} position={position}/>
                    <OrbitControls enablePan={false} enableRotate={false} enableZoom={false}/>
                </Suspense>
            </Canvas>
        </StyledCanvasWrapper>
    )
}

export default InteractiveSpaceScene
