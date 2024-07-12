import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import SubjectDeletion from '@/Pages/ManegementSubjects/SubjectDeletion';
import SubjectAddition from '@/Pages/ManegementSubjects/SubjectAddition';

export default function SubjectSelection({ availableSubjects, notavailableSubjects, message, auth })  {
    const { data, setData, post, processing, errors } = useForm({
        subjects: []
    });
    
    const user = usePage().props.user;
    const { success } = usePage().props;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subjects.selection'), {
            onSuccess: () => {
                console.log("Successed")
            },
            onError: () => {
                console.log("Failed")
            }
        });
    };

    const handleSubjectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setData('subjects', selectedOptions);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Select Subjects</h2>}
        >
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h4 className="text-blue-600">登録したい授業が以下のリスト内に存在する場合はこちらから選んで下さい.</h4>
                    {success && (
                        <div className="mb-4 text-sm text-green-600">
                            {success}
                        </div>
                    )}  
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel htmlFor="subjects" value="複数選択可"/>
                            <select 
                                name="subjects"
                                id="subjects" 
                                multiple 
                                value={data.subjects} 
                                onChange={handleSubjectChange}
                            >
                                {availableSubjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.subject_name}({subject.start_time})
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.subjects} className="mt-2" />
                        </div>
                        <PrimaryButton className="ms-4" disabled={processing}>Save</PrimaryButton>
                    </form>
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h4 className="text-blue-600">以下はあなたが既に登録した授業です.</h4>
                    <ol>
                        {notavailableSubjects.map(subject => (
                            <li key={subject.id}>
                                {subject.subject_name}({subject.start_time})
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h4 className="text-blue-600">授業の取り消し.</h4>
                    <SubjectDeletion notavailableSubjects={notavailableSubjects} />
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <h4 className="text-blue-600">授業の登録.</h4>
                    <SubjectAddition message={message}/>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
