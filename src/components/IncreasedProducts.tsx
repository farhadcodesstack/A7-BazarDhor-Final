import ProductCard from './ProductCard'
import { Product } from '@/types/bazardor'

const getProducts = async (): Promise<Product[]> => {
	try {
		const res = await fetch(
			'https://api.abcz.workers.dev/api/bazardor/products',
			{
				cache: 'no-store',
			},
		)

		if (!res.ok) return []
		const data = await res.json()
		return Array.isArray(data) ? data : (data?.products ?? data?.data ?? [])
	} catch (error) {
		console.error('Error fetching products:', error)
		return []
	}
}

export default async function IncreasedProducts() {
	const products = await getProducts()

	const increased = products.filter(
		(item: Product) => item?.change?.dir === 'up',
	)

	return (
		<div className='mx-auto my-6 max-w-7xl px-4'>
			<div className='rounded-2xl border border-purple-200 bg-white p-6 shadow-sm'>
				<div className='mb-6 flex items-center gap-2'>
					<span className='text-lg text-red-500'>▲</span>
					<h2 className='text-xl font-bold text-gray-900'>আজ দাম বেড়েছে</h2>
				</div>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
					{increased.map((item: Product) => (
						<ProductCard key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	)
}
