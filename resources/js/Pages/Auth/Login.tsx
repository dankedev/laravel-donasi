// import Checkbox from "@/components/Checkbox";
// import InputError from "@/components/InputError";
// import InputLabel from "@/components/InputLabel";
// import PrimaryButton from "@/components/PrimaryButton";
// import TextInput from "@/components/TextInput";
import { useRequest } from "@/hooks/use-request";
import GuestLayout from "@/layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Checkbox, PasswordInput, TextInput } from "@mantine/core";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const form = useRequest({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    const submit = () => {
        form.post(route("login"), {
            onFinish: () => form.setFieldValue("password", ""),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <form onSubmit={form.onSubmit(submit)}>
                <div className="space-y-6">
                    <TextInput {...form.getInputProps("email")} label="Email" placeholder="Email" />
                    <PasswordInput
                        {...form.getInputProps("password")}
                        label="Password"
                        placeholder="Email"
                        autoComplete="current-password"
                    />

                    <Checkbox
                        label="Remember me"
                        {...form.getInputProps("remember", { type: "checkbox" })}
                    />

                    <div className="mt-4 flex items-center justify-end">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <Button className="ms-4" loading={form.processing} type="submit">
                            Log in
                        </Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
