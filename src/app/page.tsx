import AllProducts from '@/components/AllProducts'
import DecreasedProducts from '@/components/DecreasedProducts'
import IncreasedProducts from '@/components/IncreasedProducts'
import { Suspense } from 'react'
import { ProductGridSkeleton } from '../components/ProductGridSkeleton'

const HomePage = () => {
	return (
		<>
			<Suspense fallback={<ProductGridSkeleton count={4} />}>
				<IncreasedProducts />
			</Suspense>
			<Suspense fallback={<ProductGridSkeleton count={4} />}>
				<DecreasedProducts />
			</Suspense>
			<Suspense fallback={<ProductGridSkeleton count={4} />}>
				<AllProducts />
			</Suspense>
		</>
	)
}

export default HomePage
