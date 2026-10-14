import React from 'react'
import Link from 'next/link'
import { ProductCardProps } from '@/types/bazardor'

const toBanglaNumeral = (num: number | undefined | null): string => {
	if (num === undefined || num === null) return ''
	const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
	return num
		.toString()
		.replace(/\d/g, (digit: string) => banglaDigits[parseInt(digit, 10)])
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const isUp = item?.change?.dir === 'up'
	const isDown = item?.change?.dir === 'down'

	return (
		<Link href={`/products/${item?.id}`} className='block h-full group'>
			<div className='bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group-hover:border-green-300'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<span className='text-2xl'>
							{item?.image || item?.categoryIcon || '🛒'}
						</span>
						<div>
							<h3 className='font-bold text-gray-900 text-base leading-tight group-hover:text-green-600 transition-colors'>
								{item?.nameBn}
							</h3>
							<p className='text-xs text-gray-400 mt-0.5'>
								{item?.unit === 'kg'
									? 'প্রতি কেজি'
									: item?.unit === 'litre'
										? 'প্রতি লিটার'
										: 'প্রতি একক'}
							</p>
						</div>
					</div>
				</div>

				<div className='flex items-end justify-between mt-4 pt-3 border-t border-gray-50'>
					<div>
						<p className='text-xs text-gray-500'>আজকের গড়</p>
						<p className='text-lg font-bold text-gray-900'>
							{toBanglaNumeral(item?.today)} টাকা
						</p>
					</div>

					<div
						className={`flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded-md ${
							isUp
								? 'text-emerald-600 bg-emerald-50'
								: isDown
									? 'text-red-600 bg-red-50'
									: 'text-gray-500 bg-gray-50'
						}`}
					>
						<span>{isUp ? '▲' : isDown ? '▼' : '—'}</span>
						<span>{toBanglaNumeral(Math.abs(item?.change?.pct || 0))}%</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default ProductCard
