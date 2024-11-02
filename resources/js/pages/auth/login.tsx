import { Head, useForm } from '@inertiajs/react';
import { GuestLayout } from 'layouts';
import React, { useEffect } from 'react';
import { Button, buttonStyles, Checkbox, Form, Link, TextField } from 'ui';


export default function Login() {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: ''
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">{status}</div>}

            <Form validationErrors={errors} onSubmit={submit} className="space-y-6">
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    autoComplete="username"
                    autoFocus
                    onChange={(v) => setData('email', v)}
                    errorMessage={errors.email}
                    isRequired
                />
                <TextField
                    type="password"
                    name="password"
                    label="Password"
                    value={data.password}
                    autoComplete="current-password"
                    onChange={(v) => setData('password', v)}
                    errorMessage={errors.password}
                    isRequired
                />
            </Form>
        </>
    );
}

Login.layout = (page: React.ReactNode) => {
    return <GuestLayout header="Login" description="Log in to your account." children={page} />;
};
