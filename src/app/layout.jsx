import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'
import AuthProvider from './context/AuthProvider'
import { ToastProvider } from '@/utils'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: {
    template: ' - Pocket',
    default: 'Pocket - Log your Cpd in a digital way.',
  },
  description:
    "By tapping into insights from our network of industry professionals, you'll know precisely when to engage in learning opportunities to boost your career, and exactly when to apply new skills to avoid professional stagnation.",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full bg-gray-50 antialiased', inter.variable)}
    >
      <AuthProvider>
        <body className="flex h-full flex-col">
          <ToastProvider />
          <div className="flex min-h-full flex-col">{children}</div>
        </body>
      </AuthProvider>
    </html>
  )
}
