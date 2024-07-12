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
            `}</style>
        </>
    );
}
