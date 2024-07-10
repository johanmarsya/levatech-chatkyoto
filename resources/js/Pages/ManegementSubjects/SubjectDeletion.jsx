import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

const SubjectDeletion = ({ notavailableSubjects }) => {
    const { data, setData, post, processing, errors } = useForm({
        subjectsToRemove: []
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subjects.delete'), {
            data: { ...data }
        });
    };

    const handleSubjectChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setData('subjectsToRemove', selectedOptions);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="subjectsToRemove" value="複数選択可"/>
                <select 
                    name="subjectsToRemove" 
                    id="subjectsToRemove" 
                    multiple 
                    value={data.subjectsToRemove} 
                    onChange={handleSubjectChange}
                >
                    {notavailableSubjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                            {subject.subject_name}({subject.start_time})
                        </option>
                    ))}
                </select>
                <InputError message={errors.subjectsToRemove} className="mt-2" />
            </div>
            <PrimaryButton className="ms-4" disabled={processing}>Remove</PrimaryButton>
        </form>
    );
};

export default SubjectDeletion;