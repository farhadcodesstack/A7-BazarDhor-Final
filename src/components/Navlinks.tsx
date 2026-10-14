import Link from 'next/link'
import { Category } from '@/types/bazardor'

// ডামি বা ফলব্যাক ক্যাটাগরি (যদি এপিআই কাজ না করে)
const fallbackCategories: Category[] = [
	{ id: 1, name: 'rice', nameBn: 'চাল', icon: '🌾', slug: 'rice' },
	{ id: 2, name: 'dal', nameBn: 'ডাল', icon: '🫘', slug: 'dal' },
	{ id: 3, name: 'oil', nameBn: 'তেল', icon: '🛢️', slug: 'oil' },
	{ id: 4, name: 'vegetable', nameBn: 'সবজি', icon: '🥦', slug: 'vegetable' },
	{ id: 5, name: 'fish', nameBn: 'মাছ', icon: '🐟', slug: 'fish' },
	{ id: 6, name: 'meat', nameBn: 'মাংস', icon: '🥩', slug: 'meat' },
]

const getCategories = async (): Promise<Category[]> => {
	try {
		const res = await fetch(
			'https://api.abcz.workers.dev/api/bazardor/categories',
		)

		if (!res.ok) return fallbackCategories

		const data = await res.json()

		const categories = Array.isArray(data)
			? data
			: data?.data || data?.categories || []

		// যদি এপিআই থেকে ফাঁকা অ্যারে আসে, তবে ফলব্যাক ডেটা রিটার্ন করবে
		return categories.length > 0 ? categories : fallbackCategories
	} catch (error) {
		console.error('Error fetching categories:', error)
		// এপিআই ফেইল করলে ডামি ডেটা দেখাবে যাতে ইউআই নষ্ট না হয়
		return fallbackCategories
	}
}

const Navlinks = async () => {
	const categories: Category[] = await getCategories()

	return (
		<nav className='w-full bg-white border-b border-gray-100 py-3'>
			<div className='max-w-7xl mx-auto flex items-center gap-7 px-6 overflow-x-auto scrollbar-hide'>
				<Link
					href='/'
					className='flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 font-bold text-sm whitespace-nowrap transition-colors'
				>
					<span>🏠 হোম</span>
				</Link>

				{categories.map((c: Category, index: number) => {
					const categorySlug = c.slug || c.id

					return (
						<Link
							key={c.id || index}
							href={`/category/${categorySlug}`}
							className='flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 font-medium text-sm whitespace-nowrap transition-colors'
						>
							{c.icon && <span className='text-base'>{c.icon}</span>}
							<span>{c.nameBn}</span>
						</Link>
					)
				})}
			</div>
		</nav>
	)
}

export default Navlinks
