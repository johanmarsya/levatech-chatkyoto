import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        user_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        department_id: '',
        faculty_id: '',
        grade: '',
    });
    
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);
    
    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };
    
    const {departments, faculties} = props;
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
    
    const typeOfGradeList = [ "B1","B2","B3","B4", "M1", "M2", "D1", "D2"];
    
    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="user_name" value="Name" />

                    <TextInput
                        id="user_name"
                        name="user_name"
                        value={data.user_name}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('user_name', e.target.value)}
                        required
                    />

                    <InputError message={errors.user_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="grade" value="Grade" />

                    <select
                        id="grade"
                        name="grade"
                        value={data.grade}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('grade', e.target.value)}
                        required
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
                
                <div className="mt-4">
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
                
                <div className="mt-4">
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

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
