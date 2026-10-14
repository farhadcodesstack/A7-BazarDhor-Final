const ProductCardSkeleton = () => {
	return (
		<div className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex flex-col justify-between h-full animate-pulse'>
			{/* Top Section: Icon & Title/Unit */}
			<div className='flex items-start justify-between'>
				<div className='flex items-center gap-3 w-full'>
					{/* Emoji / Icon Skeleton */}
					<div className='w-8 h-8 rounded-lg bg-gray-200 shrink-0' />

					{/* Title & Unit Skeleton */}
					<div className='space-y-2 flex-1'>
						{/* NameBn */}
						<div className='h-4 bg-gray-200 rounded w-3/4' />
						{/* Unit */}
						<div className='h-3 bg-gray-100 rounded w-1/3' />
					</div>
				</div>
			</div>

			{/* Bottom Section: Price & Change badge */}
			<div className='flex items-end justify-between mt-4 pt-3 border-t border-gray-50'>
				{/* Price block */}
				<div className='space-y-1.5'>
					<div className='h-3 bg-gray-200 rounded w-14' />
					<div className='h-5 bg-gray-200 rounded w-20' />
				</div>

				{/* Percentage Badge block */}
				<div className='h-7 w-16 bg-gray-100 rounded-md' />
			</div>
		</div>
	)
}

// একাধিক কার্ডের গ্রিড স্কেলিটন দেখাতে চাইলে
export const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{Array.from({ length: count }).map((_, i) => (
				<ProductCardSkeleton key={i} />
			))}
		</div>
	)
}
