import { useRequest } from "@/hooks/use-request";
import { Transition } from "@headlessui/react";
import { Button, Card, PasswordInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRef } from "react";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const form = useRequest({
        initialValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    const updatePassword = () => {
        // e.preventDefault();

        form.put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => {
                notifications.show({
                    title: "Update password berhasil",
                    message: "Simpan dan ingat password Anda untuk login berikutnya",
                });
                form.reset();
            },
            onError: (errors) => {
                if (errors.password) {
                    form.setFieldError("password", "Kredential tidak cocok, coba kembali");
                    form.setFieldError(
                        "password_confirmation",
                        "Kredential tidak cocok, coba kembali"
                    );
                    // reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    form.setFieldValue("current_password", "");
                    form.setFieldError("current_password", "Kredential tidak cocok, coba kembali");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <>
            <Card withBorder>
                <Card.Section className="px-6 py-4 sm:py-8 lg:px-8" withBorder>
                    <h2 className="text-lg font-medium">Update Password</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Ensure your account is using a long, random password to stay secure.
                    </p>
                </Card.Section>
                <div className="px-6 py-4 sm:py-8 lg:px-8">
                    <form onSubmit={form.onSubmit(updatePassword)} className="mt-6 space-y-6">
                        <PasswordInput
                            {...form.getInputProps("current_password")}
                            label="Current password"
                            required
                            ref={currentPasswordInput}
                        />
                        <PasswordInput
                            {...form.getInputProps("password")}
                            label="New password"
                            required
                            ref={passwordInput}
                        />
                        <PasswordInput
                            {...form.getInputProps("password_confirmation")}
                            label="Confirm Password"
                            required
                        />

                        <div className="flex items-center gap-4">
                            <Button loading={form.processing} type="submit">
                                Save
                            </Button>

                            <Transition
                                show={form.recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-600">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </Card>
        </>
    );
}
