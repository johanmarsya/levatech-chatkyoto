import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Transition, Disclosure } from '@headlessui/react';

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
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-8">
                    <div className="bg-white bg-opacity-75 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="mt-4">
                            {['概要', '機能', '使い方', '注意事項'].map((title, index) => (
                                <Disclosure key={index}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left bg-opacity-75 text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                <span>{title}</span>
                                                <svg
                                                    className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-purple-500`}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 bg-white bg-opacity-50 rounded-lg">
                                                {title === '概要' && (
                                                    <div>
                                                        <p>このアプリは、ユーザーがチャットを通じてコミュニケーションを取るためのプラットフォームです。<br/>リアルタイムでメッセージを送受信し、さまざまな機能を利用できます。</p>
                                                    </div>
                                                )}
                                                {title === '機能' && (
                                                    <div>
                                                        <ul className="list-disc list-inside">
                                                            <h3　className="text-red-500">Rooms</h3>
                                                                <p>
                                                                    チャット部屋では「@」を用いたメンション機能が使えます。<br/>
                                                                    ファイルのアップロードは現時点では使えませんので、pdfなどを共有する場合は<br/>
                                                                    自分のgoogledriveに保存を行い、そのURLを貼り付けて下さい。
                                                                </p>
                                                            <h3 className="text-red-500">People</h3>
                                                                <p>
                                                                    オンラインユーザーを確認することができます。<br/>
                                                                    ユーザーのフォロー機能などの追加機能は、アップデートをお待ち下さい。
                                                                </p>
                                                            <h3 className="text-red-500">Notifications</h3>
                                                                <p>
                                                                    メンションされたメッセージを確認することができます。<br/>
                                                                    読んだメッセージはボタンを押すことで、既読として扱われます。
                                                                </p>
                                                            <h3 className="text-red-500">Register all of your Classes →</h3>
                                                                <p>
                                                                    自分が登録している今季の授業を登録することができます。<br/>
                                                                    一番上のリストから授業を登録するときは、「command」を押しながら選択をしていただくと<br/>
                                                                    複数選択をすることができます。(登録した授業を取り消す時も同様)<br/>
                                                                </p>
                                                            <h3 className="text-red-500">右上のdropdownについて</h3>
                                                                <p>
                                                                    ログアウトや、プロフィールの編集を行うことができます。<br/>
                                                                    パスワードを変更したい場合や、学年の設定を変更したい場合は活用下さい。<br/>
                                                                </p>
                                                        </ul>
                                                    </div>
                                                )}
                                                {title === '使い方' && (
                                                    <div>
                                                        <ol className="list-decimal list-inside">
                                                            <li>アカウントを作成し、ログインします。</li>
                                                            <li>プロファイルを設定し、プロフィール画像をアップロードします。</li>
                                                            <li>授業を登録し、チャットルームを作成(もしくは参加)します。</li>
                                                            <li>チャットルームに参加し、メッセージを送信します。</li>
                                                            <li>通知を確認し、重要なメッセージを見逃さないようにします。</li>
                                                        </ol>
                                                    </div>
                                                )}
                                                {title === '注意事項' && (
                                                    <div>
                                                        <ul className="list-disc list-inside">
                                                            <li>個人情報を保護し、他のユーザーと共有しないでください。</li>
                                                            <li>不適切なコンテンツを投稿しないでください。</li>
                                                            <li>他のユーザーを尊重し、攻撃的な言動を控えてください。</li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
