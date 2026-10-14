import React from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import { Product } from '@/types/bazardor'

interface CategoryPageProps {
	params: Promise<{
		slug: string
	}>
}

// ক্যাটাগরি slug থেকে বাংলায় সুন্দর নাম দেখানোর অবজেক্ট
const CATEGORY_NAME_MAP: Record<string, string> = {
	chal: 'চাল',
	dal: 'ডাল',
	tel: 'তেল',
	sobji: 'সবজি',
	mach: 'মাছ',
	mangso: 'মাংস',
	masala: 'মসলা',
	snack: 'স্ন্যাক্স',
	dairy: 'ডেয়ারি ও দুধ',
}

// API থেকে পণ্য ফেচ করার ফাংশন
const getProducts = async (): Promise<Product[]> => {
	try {
		const res = await fetch(
			'https://api.abcz.workers.dev/api/bazardor/products',
			{
				cache: 'no-store', // ক্যাশিং বন্ধ রাখবে
			},
		)

		if (!res.ok) {
			throw new Error(`Failed to fetch products. Status: ${res.status}`)
		}

		const data = await res.json()
		return Array.isArray(data) ? data : data?.products || data?.data || []
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const CategoryProductsPage = async ({ params }: CategoryPageProps) => {
	// Next.js 15+ এ params একটি Promise
	const { slug } = await params
	const decodedSlug = decodeURIComponent(slug).toLowerCase()

	const products = await getProducts()

	// ক্যাটাগরির slug বা category নাম অনুযায়ী পণ্য ফিল্টার (Case-insensitive)
	const filteredProducts = products.filter((item) => {
		const itemCategory = item.category?.toString().toLowerCase() || ''
		const itemSlug = item.slug?.toString().toLowerCase() || ''

		return itemCategory === decodedSlug || itemSlug === decodedSlug
	})

	// ক্যাটাগরির সুন্দর ডিসপ্লে নেম
	const displayName = CATEGORY_NAME_MAP[decodedSlug] || decodedSlug

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			{/* ব্রেডক্রাম্ব এবং ব্যাক লিঙ্ক */}
			<div className='mb-6'>
				<Link
					href='/'
					className='text-sm text-gray-500 hover:text-green-600 transition duration-150 inline-flex items-center gap-1'
				>
					← হোমপেজে ফিরে যান
				</Link>
			</div>

			{/* ক্যাটাগরি হেডার */}
			<div className='bg-white border border-gray-100 rounded-2xl p-6 mb-8 shadow-sm'>
				<h1 className='text-2xl sm:text-3xl font-bold text-gray-900 capitalize'>
					{displayName}{' '}
					<span className='text-green-600'>ক্যাটাগরির পণ্যসমূহ</span>
				</h1>
				<p className='text-sm text-gray-500 mt-2'>
					এই ক্যাটাগরিতে মোট{' '}
					<span className='font-semibold text-gray-800'>
						{filteredProducts.length}
					</span>
					টি পণ্য পাওয়া গেছে।
				</p>
			</div>

			{/* প্রোডাক্ট গ্রিড */}
			{filteredProducts.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{filteredProducts.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
			) : (
				/* কোনো প্রোডাক্ট না থাকলে */
				<div className='text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
					<div className='max-w-md mx-auto'>
						<h3 className='text-lg font-semibold text-gray-800 mb-2'>
							কোনো পণ্য পাওয়া যায়নি
						</h3>
						<p className='text-gray-500 text-sm mb-6'>
							দুঃখিত, &quot;{displayName}&quot; ক্যাটাগরিতে বর্তমানে কোনো পণ্য
							উপলব্ধ নেই।
						</p>
						<Link
							href='/'
							className='inline-block bg-green-600 text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-green-700 transition'
						>
							অন্যান্য পণ্য দেখুন
						</Link>
					</div>
				</div>
			)}
		</div>
	)
}

export default CategoryProductsPage
