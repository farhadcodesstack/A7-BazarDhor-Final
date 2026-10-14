import Image from 'next/image'
import { Suspense } from 'react'
import BanglaDate from './BanglaDate'
import Navlinks from './Navlinks'
import Marque from './Marque'
import Banner from './Banner'
import Link from 'next/link'
const Header = () => {
	return (
		<header className='w-full bg-white border-b border-gray-100'>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-6 py-3'>
				<div className='flex items-center gap-3'>
					<div className='w-10 h-10 rounded-xl bg-[#008744] flex items-center justify-center p-2'>
						<Image
							height={30}
							width={30}
							src='/logo-icon.png'
							alt='Logo image'
							className='w-full h-full object-contain'
						/>
					</div>

					<div>
						<h1 className='font-bold text-gray-900 text-lg leading-tight'>
							বাজার দর
						</h1>

						<Suspense
							fallback={
								<p
									aria-hidden='true'
									className='text-xs text-gray-500 font-medium min-h-4'
								/>
							}
						>
							<BanglaDate />
						</Suspense>
					</div>
				</div>

				<div className='flex items-center gap-5'>
					<Link
						href='/signin'
						className='text-sm font-semibold text-gray-700 hover:text-gray-900'
					>
						সাইন ইন
					</Link>

					<Link
						href='/signup'
						className='bg-[#008744] hover:bg-[#007138] text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors'
					>
						সাইন আপ
					</Link>
				</div>
			</div>
			<Suspense
				fallback={
					<nav
						aria-hidden='true'
						className='w-full bg-white border-b border-gray-100 py-3'
					>
						<div className='max-w-7xl mx-auto h-5 px-6' />
					</nav>
				}
			>
				<Navlinks />
				<Marque />
			</Suspense>

			<Banner />
		</header>
	)
}

export default Header
