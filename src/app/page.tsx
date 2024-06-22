'use client'
import React, {useRef} from 'react'
import BackgroundScene from '@/components/BackgroundScene'
import HeroSection from '@/components/HeroSection'

const Home: React.FC = () => {
    const wrapperRef = useRef(null)
    return (
        <div>
            <HeroSection/>
            <BackgroundScene scrollContainer={wrapperRef}/>
        </div>
    )
}

export default Home
