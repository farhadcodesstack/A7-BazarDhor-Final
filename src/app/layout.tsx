import type { Metadata } from 'next'
import { Noto_Serif_Bengali } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'
const notoSerifBengali = Noto_Serif_Bengali({
	variable: '--font-geist-sans',
	subsets: ['latin', 'bengali'],
})

export const metadata: Metadata = {
	title: 'BazarDhor',
	description:
		'A simple and user-friendly price tracking app for Bangladeshi products, helping users make informed purchasing decisions.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='en'
			data-theme='light'
			className={`${notoSerifBengali.className}  h-full antialiased`}
		>
			<body className='min-h-full'>
				<Header />
				<main className='flex-1'>{children}</main>
				<Footer />
				<Toaster />
			</body>
		</html>
	)
}
