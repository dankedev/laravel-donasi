// import Modal from "@/components/Modal";
// import { useRequest } from "@/utils";
// import TextInput from "@/components/TextInput";
import { useRequest } from "@/hooks/use-request";
import { useForm } from "@inertiajs/react";
import { Button, Card, Modal, PasswordInput } from "@mantine/core";
import { Fragment, useRef, useState } from "react";

export default function DeleteUserForm() {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const { processing, reset, clearErrors } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = () => {
        form.delete(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    const form = useRequest({
        initialValues: {
            password: "",
        },
    });

    return (
        <Fragment>
            <Card withBorder>
                <Card.Section className="px-6 py-4 sm:py-8 lg:px-8" withBorder>
                    <h2 className="text-lg font-bold">Danger zone</h2>
                    <p className="mt-1 text-sm">Be Careful. Account deletion cannot be undone.</p>
                </Card.Section>
                <div className="px-6 py-4 sm:py-8 lg:px-8 dark:bg-zinc-950">
                    {" "}
                    <Button onClick={confirmUserDeletion} color="red">
                        Delete Account
                    </Button>
                </div>
            </Card>
            <Modal
                opened={confirmingUserDeletion}
                onClose={closeModal}
                title="Are you sure you want to delete your account?"
            >
                <form onSubmit={form.onSubmit(deleteUser)} className="p-0">
                    <p className="mt-1 text-sm text-gray-600">
                        Once your account is deleted, all of its resources and data will be
                        permanently deleted. Please enter your password to confirm you would like to
                        permanently delete your account.
                    </p>

                    <PasswordInput
                        className="mt-6"
                        {...form.getInputProps("password")}
                        label="Password"
                    />

                    <div className="mt-6 flex justify-end">
                        <Button onClick={closeModal}>Cancel</Button>

                        <Button type="submit" color="red" className="ms-3" loading={processing}>
                            Delete Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </Fragment>
    );
}
