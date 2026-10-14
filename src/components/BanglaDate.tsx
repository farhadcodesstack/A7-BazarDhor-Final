'use client'

import { useState } from 'react'

export default function BanglaDate() {
	const [date] = useState(() =>
		new Date().toLocaleDateString('bn-BD', {
			timeZone: 'Asia/Dhaka',
			dateStyle: 'full',
		}),
	)

	return <p className='text-xs text-gray-500 font-medium min-h-4'>{date}</p>
}
