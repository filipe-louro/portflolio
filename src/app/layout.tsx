import type {Metadata} from 'next'
import {Bruno_Ace, Bruno_Ace_SC} from 'next/font/google'
import React from 'react'
import RootProvider from '@/utils/RootProvider'

const brunoAce = Bruno_Ace({weight: '400', subsets: ['latin'], variable: '--font-bruno-ace'})
const brunoAceSC = Bruno_Ace_SC({weight: '400', subsets: ['latin'], variable: '--font-bruno-ace-sc'})

export const metadata: Metadata = {
    title: 'Portifólio | Filipe Louro',
    description: 'Portifólio geral.'
}

export default function RootLayout({
                                       children
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${brunoAce.className} ${brunoAceSC.className} ${brunoAce.variable} ${brunoAceSC.variable}`}>
        <RootProvider>
            {children}
        </RootProvider>
        </body>
        </html>
    )
}
