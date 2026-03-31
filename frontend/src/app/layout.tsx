import { type Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '@/_styles/tailwind.css'
  
export const metadata: Metadata = {
  title: {
    template: '%s', // - B-dec
    default: 'Taller ASAG',
  },
  description:
    'Gestión integral para tu taller de reparación automotriz.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html className={clsx(
      'h-full xl:bg-gray-50  ',
      inter.variable,
      lexend.variable,
    )}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className=" h-full ">
     
        {children}
      </body>
    </html>
  )
}

 