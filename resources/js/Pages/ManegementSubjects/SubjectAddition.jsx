import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';

const SubjectAddition = ({ message }) => {
    const { data, setData, post, processing, errors } = useForm({
        subject_name: '',
        start_time: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('subjects.add'), {
            data: { ...data }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <InputLabel htmlFor="subject_name" value="記入例に従って記入して下さい(全角記入)"/>
                <TextInput
                    name="subject_name"
                    id="subject_name"
                    className="mt-1 block w-full"
                    isFocused={true}
                    value={data.subject_name}
                    placeholder="現代論理学"
                    onChange={(e) => setData('subject_name', e.target.value)}
                    required
                />
                <InputError className="text-red-600" message={errors.subject_name} />
            </div>
            <div>
                <InputLabel htmlFor="start_time" value="授業の開始時刻"/>
                <TextInput
                    name="start_time"
                    id="start_time"
                    value={data.start_time}
                    className="mt-1 block w-full"
                    isFocused={true}
                    placeholder="月・2"
                    onChange={(e) => setData('start_time', e.target.value)}
                    required
                />
                <InputError className="text-red-600" message={errors.start_time} />
            </div>
            <PrimaryButton className="ms-4" disabled={processing}>
                Register
            </PrimaryButton>
            <Transition
                show={!!message}
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
            >
                <p className="text-sm text-red-500">{message}</p>
            </Transition>
            
        </form>
    );
};

export default SubjectAddition;
