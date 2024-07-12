import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage, } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;
    const { departments, faculties } = usePage().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.user_name,
        email: user.email,
        grade: user.grade,
        department_id: user.department_id,
        faculty_id: user.faculty_id,
    });
    
    const typeOfGradeList = [ "B1","B2","B3","B4", "M1", "M2", "D1", "D2"];
    
    const [filteredFaculties, setFilteredFaculties] = useState([]);
    
    useEffect(() => {
        if (data.department_id) {
            const filtered = faculties.filter(faculty => faculty.department_id === Number(data.department_id));
            setFilteredFaculties(filtered);
        } else {
            setFilteredFaculties([]);
        }
    }, [data.department_id, faculties]);
    
    const handleDepartmentChange = (e) => {
      setData('faculty_id', '');
      setData('department_id', e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-red-600">
                    Update your account's profile information and email address.
                </p>
            </header>
            <div className="mr-3">
                <InputLabel htmlFor="" value="Icon Image" />
                <img
                    id="preview"
                    src={user.icon_path ? user.icon_path : '/images/default-user_icon.webp'}
                    alt="Profile Picture"
                    className="w-32 h-32 rounded-full object-cover border-none bg-gray-200"
                />
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>
                
                <div>
                    <InputLabel htmlFor="grade" value="Grade" />

                    <select
                        id="grade"
                        name="grade"
                        value={data.grade}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('grade', e.target.value)}
                    >
                        <option value="">Select Your Grade</option>
                        {typeOfGradeList.map((element, index) => (
                            <option key={index} value={index + 1}>
                                {element}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.grade} className="mt-2" />
                </div>
                
                <div>
                    <InputLabel htmlFor="department" value="Department" />
                    <select
                        id="department"
                        name="department_id"
                        value={data.department_id}
                        className="mt-1 block w-full"
                        onChange={(e) => handleDepartmentChange(e)}
                        required
                    >
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.department_id} className="mt-2" />
                </div>
                
                <div className>
                    <InputLabel htmlFor="faculty" value="Faculty" />
                    <select
                        id="faculty"
                        name="faculty_id"
                        value={data.faculty_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('faculty_id', e.target.value)}
                        required
                        disabled={!data.department_id}
                    >
                        <option value="">Select Faculty</option>
                        {filteredFaculties.map((faculty) => (
                            <option key={faculty.id} value={faculty.id}>
                                {faculty.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.faculty_id} className="mt-2" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}