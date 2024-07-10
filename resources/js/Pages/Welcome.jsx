import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex flex-col justify-center items-center min-h-screen bg-custom dark:bg-gray-900">
                <div className="absolute top-20 inset-x-0 flex justify-center items-center">
                    <h1 className="text-6xl font-bold text-center bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text animate-rainbow">
                        Welcome to Chatkyoto-Application !!
                    </h1>
                </div>
                <div className="relative flex justify-center text-center p-6 z-10 mb-45 space-x-11">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-bold text-3xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 hover:shadow-lg"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-bold text-3xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 hover:shadow-lg mx-4"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="font-bold text-3xl text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500 hover:shadow-lg mx-4"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="absolute bottom-10 left-10 animate-zoom-in-right-up">
                    <img src="/images/haikei_1.jpeg" alt="Image 1" className="w-32 h-32 rounded-full transform rotate-animation" />
                </div>
                <div className="absolute bottom-10 right-10 animate-zoom-in-left-up">
                    <img src="/images/haikei_1.jpeg" alt="Image 2" className="w-32 h-32 rounded-full transform rotate-animation" />
                </div>
                <div className="absolute top-10 left-10 animate-zoom-in-right-down">
                    <img src="/images/haikei_1.jpeg" alt="Image 3" className="w-32 h-32 rounded-full transform rotate-animation" />
                </div>
                <div className="absolute top-10 right-10 animate-zoom-in-left-down">
                    <img src="/images/haikei_1.jpeg" alt="Image 4" className="w-32 h-32 rounded-full transform rotate-animation" />
                </div>
            </div>

            <style>{`
                .bg-custom {
                    background-color: white;
                    background-size: cover;
                    background-position: center;
                }
                .dark\\:bg-gray-900 {
                    background-size: cover;
                    background-position: center;
                }
                .animate-rainbow {
                    background-size: 200% 200%;
                    animation: rainbow 3s ease infinite;
                }
                @keyframes rainbow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .hover\\:shadow-lg:hover {
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
                }
                .animate-zoom-in-right-up {
                    animation: zoom-in-right-up 5s ease forwards;
                }
                .animate-zoom-in-left-up {
                    animation: zoom-in-left-up 5s ease forwards;
                }
                .animate-zoom-in-right-down {
                    animation: zoom-in-right-down 5s ease forwards;
                }
                .animate-zoom-in-left-down {
                    animation: zoom-in-left-down 5s ease forwards;
                }
                @keyframes zoom-in-right-up {
                    0% {
                        transform: scale(1) translate(0, 0);
                    }
                    100% {
                        transform: scale(2) translate(150%, -150%);
                    }
                }
                @keyframes zoom-in-left-up {
                    0% {
                        transform: scale(1) translate(0, 0);
                    }
                    100% {
                        transform: scale(2) translate(-150%, -150%);
                    }
                }
                @keyframes zoom-in-right-down {
                    0% {
                        transform: scale(1) translate(0, 0);
                    }
                    100% {
                        transform: scale(2) translate(150%, 150%);
                    }
                }
                @keyframes zoom-in-left-down {
                    0% {
                        transform: scale(1) translate(0, 0);
                    }
                    100% {
                        transform: scale(2) translate(-150%, 150%);
                    }
                }
                .rotate-animation {
                    animation: rotate 5s linear infinite;
                }
                @keyframes rotate {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </>
    );
}
