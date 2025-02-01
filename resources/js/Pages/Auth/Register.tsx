import { useRequest } from "@/hooks/use-request.ts";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, PasswordInput, TextInput } from "@mantine/core";

export default function Register() {
    const form = useRequest({
        initialValues: {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
    });
    const submit = () => {
        form.post(route("register"), {
            onFinish: () => {
                form.setFieldValue("password", "");
                form.setFieldValue("password_confirmation", "");
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={form.onSubmit(submit)}>
                <div className="space-y-6">
                    <TextInput
                        label="Nama Lengkap"
                        placeholder="Fulan bin fulan"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Email"
                        placeholder="fulan@gmail.com"
                        {...form.getInputProps("email")}
                        autoComplete="username"
                    />
                    <PasswordInput label="Password" {...form.getInputProps("password")} />
                    <PasswordInput
                        label="Konfirmasi Password"
                        {...form.getInputProps("password_confirmation")}
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route("login")}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Already registered?
                    </Link>

                    <Button className="ms-4" loading={form.processing} type="submit">
                        Register
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
