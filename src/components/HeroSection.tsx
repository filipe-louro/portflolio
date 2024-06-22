import React from 'react'
import Link from 'next/link'
import * as HeroSectionStyles from '@/styles/home/hero-styles'

const HeroSection: React.FC = () => {
    return (
        <HeroSectionStyles.HeroContainer>
            <HeroSectionStyles.Title>Filipe Louro</HeroSectionStyles.Title>
            <HeroSectionStyles.Subtitle>Bem-vindo ao meu portfólio. Explore minhas habilidades e
                projetos.</HeroSectionStyles.Subtitle>
            <Link href="#">
                <HeroSectionStyles.Button>Conhecer</HeroSectionStyles.Button>
            </Link>
        </HeroSectionStyles.HeroContainer>
    )
}

export default HeroSection
