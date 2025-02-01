import { useRequest } from "@/hooks/use-request.ts";
import GuestLayout from "@/layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button, TextInput } from "@mantine/core";

export default function ForgotPassword({ status }: { status?: string }) {
    const form = useRequest({
        initialValues: {
            email: "",
        },
    });
    const submit = () => {
        form.post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Forgot your password? No problem. Just let us know your email address and we will
                email you a password reset link that will allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={form.onSubmit(submit)}>
                <TextInput
                    {...form.getInputProps("email", {
                        label: "Email",
                        placeholder: "Email",
                        required: true,
                    })}
                />

                <div className="mt-4 flex items-center justify-end">
                    <Button
                        className="ms-4"
                        disabled={form.processing}
                        loading={form.processing}
                        type="submit"
                    >
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
