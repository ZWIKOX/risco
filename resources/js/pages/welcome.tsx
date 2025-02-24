import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <div className="text-primary"> 
                    <h1 className="text-4xl font-bold leading-tight text-center ">Welcome to <span className='text-destructive'>Risco</span></h1>
                    <p className="mt-4 text-lg leading-relaxed text-center">
                        This is a modern real estate app where agents can list their properties and buyers can buy or rent them.
                    </p>
                    
                    <div className="mt-8">
                        <div className="mt-8 text-center">
                        {!auth.user ? (
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Join Now 
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Welcome back, {auth.user.name}
                                </Link>
                            </>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
