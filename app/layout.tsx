import '@/app/globals.css'
import { Metadata } from 'next'
import MainNav from './ui/mainnav';
import Logo from './ui/logo';

export const metadata: Metadata = {
  title: {
    template: '%s | TCRUDS',
    default: 'TCRUDS',
  },
  description: 'TCRUDS is developed by Ezra.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-gray-800 text-white antialiased'>
        <Logo />
        {children}
        <MainNav />
      </body>
    </html>
  )
}