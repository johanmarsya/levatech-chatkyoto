import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function Dashboard({ auth }) {
    const user = usePage().props.auth.user;
    
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        image: null,
    });
    
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        
        post(route('profile_icon.insert'));
    };
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            
            <div className="bg-cover bg-center min-h-screen py-12" style={{ backgroundImage: "url('/images/chatlogo.webp')" }}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white bg-opacity-75 overflow-hidden shadow-sm sm:rounded-lg">
                        This is your icon-picture.<br/>
                        アイコン設定を行うときは<strong>１MB以下の容量でアップロードして下さい.</strong>
                        <form onSubmit={submit} className="mt-6 space-y-6" enctype="multipart/form-data">
                            <div className="flex mb-4">
                                <div className="mr-3">
                                    <img
                                        id="preview"
                                        src={user.icon_path ? user.icon_path : '/images/default-user_icon.webp'}
                                        alt="Profile Picture"
                                        className="w-20 h-20 rounded-full object-cover border-none bg-gray-200"
                                    />
                                </div>
                                <div className="image">
                                    <InputLabel htmlFor="image" value="SELECT A NEW PHOTO" 
                                        type="button"
                                        onclick={() => document.getElementById('image').click()}
                                        className="inline-flex items-center uppercase rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    />
                                    <input
                                        type="file"
                                        name="image"
                                        id="image"
                                        className="hidden"
                                        onChange={(e) => {
                                            if (e.target.files.length > 0) {
                                                const src = URL.createObjectURL(e.target.files[0]);
                                                document.getElementById('preview').src = src;
                                                setData('image', e.target.files[0]);
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Save</PrimaryButton>
                                <InputError>{errors}</InputError>
            
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-gray-600">Saved...</p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                    <div className="bg-white bg-opacity-75 overflow-hidden shadow-sm sm:rounded-lg">
                        <Link
                        href={route('register_subjects')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register all of your Classes →
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
