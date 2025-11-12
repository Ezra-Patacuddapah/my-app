import '@/app/globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'My App',
  },
  description: 'My app is developed by Ezra.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='bg-gray-800 text-white antialiased'>
        {children}
      </body>
    </html>
  )
}