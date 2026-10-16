'use client';
import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    // সেশন থেকে ইউজার নেম লোড করা
    useEffect(() => {
        if (session?.user?.name) {
            setName(session.user.name);
        }
    }, [session]);

    // নাম আপডেট হ্যান্ডলার
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            toast.error('নাম খালি রাখা যাবে না!');
            return;
        }

        setIsUpdating(true);
        try {
            const { error } = await authClient.updateUser({
                name: name,
            });

            if (error) {
                toast.error(error.message || 'প্রোফাইল আপডেট করতে সমস্যা হয়েছে!');
            } else {
                toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
            }
        } catch (err) {
            console.error('Update error:', err);
            toast.error('কোথাও কোনো সমস্যা হয়েছে!');
        } finally {
            setIsUpdating(false);
        }
    };

    // সাইন আউট হ্যান্ডলার
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success('সফলভাবে সাইন আউট হয়েছেন!');
                    router.push('/login');
                },
            },
        });
    };

    if (isPending) {
        return (
            <div className='flex justify-center items-center min-h-[70vh] bg-[#edf2ee]'>
                <p className='text-gray-500 font-medium'>লোড হচ্ছে...</p>
            </div>
        );
    }

    const user = session?.user;

    return (
        <div className='min-h-[85vh] bg-[#edf2ee] py-10 px-4'>
            <div className='max-w-3xl mx-auto space-y-6'>

                {/* পেজ হেডার */}
                <div className='space-y-1'>
                    <h1 className='text-2xl font-bold text-gray-900'>আমার প্রোফাইল</h1>
                    <p className='text-xs text-gray-500'>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                </div>

                {/* ইউজার প্রফাইল কার্ড */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className='flex items-center gap-4 text-center sm:text-left'>
                        <div className='relative'>
                            {user?.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || 'User'}
                                    className='w-16 h-16 rounded-xl object-cover'
                                />
                            ) : (
                                <div className='w-16 h-16 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center font-bold text-xl'>
                                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className='text-lg font-bold text-gray-900'>
                                {user?.name || 'ব্যবহারকারী'}
                            </h2>
                            <p className='text-xs text-gray-400 mt-0.5'>
                                {user?.email || 'email@example.com'}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleSignOut}
                        className='flex items-center gap-1.5 border border-red-300 text-red-500 hover:bg-red-50 text-xs font-semibold py-2 px-4 rounded-xl transition duration-200'
                    >
                        <span>&hookleftarrow;</span> সাইন আউট
                    </button>
                </div>

                {/* তথ্য ইনপুট কার্ড */}
                <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100/80 space-y-5'>
                    <h3 className='text-base font-bold text-gray-800'>
                        তথ্য
                    </h3>

                    <form onSubmit={handleUpdateProfile} className='space-y-4'>
                        <div>
                            <label className='block text-xs font-medium text-gray-700 mb-2'>
                                নাম
                            </label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full px-4 py-3 bg-[#fafafa] border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:border-emerald-600 transition'
                                placeholder='আপনার নাম লিখুন'
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={isUpdating}
                            className='w-full bg-[#00873e] hover:bg-[#007335] disabled:bg-emerald-400 text-white font-medium py-3 px-4 rounded-xl transition duration-200 shadow-sm text-sm'
                        >
                            {isUpdating ? 'আপডেট হচ্ছে...' : 'আপডেট'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;