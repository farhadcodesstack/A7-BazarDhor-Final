'use client'
import React from 'react'
import Link from 'next/link'
import { authClient } from '../../lib/auth-client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const SignUpPage = () => {
    const router = useRouter()

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
            alert('পাসওয়ার্ড দুটি মিলছে না!')
            return
        }

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: '/',
            })

            if (error) {
                console.log('Error:', error)
                toast.error(error.message || 'সাইন আপ করতে সমস্যা হয়েছে!')
                return
            }

            if (data) {
                console.log('Data:', data)
                toast.success('অ্যাকাউন্ট তৈরি সফল হয়েছে!')
                router.push('/')
            }
        } catch (err) {
            console.error('Signup error:', err)
           toast.error('কোথাও কোনো সমস্যা হয়েছে!')
        }
    }

    return (
        <div className='flex items-center justify-center min-h-[80vh] px-4 py-8 bg-gray-50'>
            <div className='bg-white border border-gray-100 rounded-2xl p-8 shadow-sm w-full max-w-md'>
                <h2 className='text-2xl font-bold text-gray-900 mb-6 text-center'>
                    অ্যাকাউন্ট তৈরি করুন
                </h2>

                <form onSubmit={handleOnSubmit} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            নাম
                        </label>
                        <input
                            type='text'
                            name='name'
                            required
                            className='w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition'
                            placeholder='যেমন: রহিম উদ্দিন'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            ইমেইল
                        </label>
                        <input
                            type='email'
                            name='email'
                            required
                            className='w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition'
                            placeholder='you@example.com'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            পাসওয়ার্ড
                        </label>
                        <input
                            name='password'
                            type='password'
                            required
                            className='w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition'
                            placeholder='কমপক্ষে ৮ অক্ষর'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1.5'>
                            পাসওয়ার্ড নিশ্চিত করুন
                        </label>
                        <input
                            name='confirmPassword'
                            type='password'
                            required
                            className='w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-green-600 transition'
                            placeholder='আবার লিখুন'
                        />
                    </div>

                    <button
                        type='submit'
                        className='w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-sm'
                    >
                        অ্যাকাউন্ট তৈরি করুন
                    </button>
                </form>

                <p className='text-center text-sm text-gray-500 mt-6'>
                    ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                    <Link
                        href='/login'
                        className='text-green-600 font-semibold hover:underline'
                    >
                        লগইন করুন
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUpPage