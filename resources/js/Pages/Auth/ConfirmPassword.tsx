import { useRequest } from "@/hooks/use-request.ts";
import GuestLayout from "@/layouts/GuestLayout";
import { Head } from "@inertiajs/react";
import { Button, PasswordInput } from "@mantine/core";

export default function ConfirmPassword() {
    const form = useRequest({
        initialValues: {
            password: "",
        },
    });
    const submit = () => {
        form.post(route("password.confirm"), {
            onFinish: () => form.reset(),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirm Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your password before
                continuing.
            </div>

            <form onSubmit={form.onSubmit(submit)}>
                <div className="space-y-6">
                    <PasswordInput label="Password" {...form.getInputProps("password")} />

                    <div className="mt-4 flex items-center justify-end">
                        <Button
                            className="ms-4"
                            disabled={form.processing}
                            loading={form.processing}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
