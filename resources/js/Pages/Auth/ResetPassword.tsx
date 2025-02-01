import { useRequest } from "@/hooks/use-request.ts";
import GuestLayout from "@/layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button, PasswordInput, TextInput } from "@mantine/core";

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const form = useRequest({
        initialValues: {
            token: token,
            email: email,
            password: "",
            password_confirmation: "",
        },
    });

    const submit = () => {
        form.post(route("password.store"), {
            onFinish: () => {
                form.setFieldValue("password", "");
                form.setFieldValue("password_confirmation", "");
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            <form onSubmit={form.onSubmit(submit)}>
                <div className="space-y-6">
                    <TextInput label="Email" placeholder="Email" {...form.getInputProps("email")} />
                    <PasswordInput
                        label="Email"
                        placeholder="Email"
                        {...form.getInputProps("password")}
                    />
                    <PasswordInput
                        label="Konfirmasi Email"
                        placeholder="Email"
                        {...form.getInputProps("password_confirmation")}
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Button className="ms-4" loading={form.processing} type="submit">
                        Reset Password
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
