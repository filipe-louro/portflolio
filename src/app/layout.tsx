import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from 'react'
import RootProvider from '@/utils/RootProvider'

const inter = Inter({subsets: ['latin']})

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
        <body className={inter.className}>
        <RootProvider>
            {children}
        </RootProvider>
        </body>
        </html>
    )
}
