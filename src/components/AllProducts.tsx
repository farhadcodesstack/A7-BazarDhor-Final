import React from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types/bazardor'

const getProducts = async (): Promise<Product[]> => {
	try {
		const res = await fetch(
			'https://api.abcz.workers.dev/api/bazardor/products',
		)
		const data = await res.json()
		return Array.isArray(data) ? data : data?.products || data?.data || []
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

const AllProducts = async () => {
	const products: Product[] = await getProducts()

	return (
		<div className='max-w-7xl mx-auto px-4 my-6'>
			<div className='bg-white border border-gray-100 rounded-2xl p-6 shadow-sm'>
				<h2 className='text-xl font-bold text-gray-900 mb-6'>সব পণ্য</h2>

				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
					{products.map((item: Product) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	)
}

export default AllProducts
