import { useRequest } from "@/hooks/use-request";
import { Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import { Button, Card, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { FormEventHandler } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const form = useRequest({
        initialValues: {
            name: user.name,
            email: user.email,
        },
        validate: {
            name: (value) => (value.length < 2 ? "Name must have at least 3 letters" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
        },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        form.patch(route("profile.update"), {
            onSuccess: () =>
                notifications.show({
                    title: "Update berhasil",
                    message: "",
                    color: "green",
                }),
            onError: () =>
                notifications.show({
                    title: "Update gagal",
                    message: "",
                    color: "red",
                }),
        });
    };

    return (
        <>
            <Card withBorder>
                <Card.Section className="px-6 py-4 sm:py-8 lg:px-8" withBorder>
                    <h2 className="text-lg font-bold">Danger zone</h2>
                    <p className="mt-1 text-sm">Be Careful. Account deletion cannot be undone.</p>
                </Card.Section>

                <div className="px-6 py-4 sm:py-8 lg:px-8">
                    {" "}
                    <form onSubmit={submit} className="mt-0 space-y-6">
                        <TextInput
                            required
                            {...form.getInputProps("name")}
                            label="Name"
                            size="md"
                        />
                        <TextInput
                            required
                            disabled
                            {...form.getInputProps("email")}
                            label="Email"
                            size="md"
                        />

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-gray-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Click here to re-send the verification email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

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
