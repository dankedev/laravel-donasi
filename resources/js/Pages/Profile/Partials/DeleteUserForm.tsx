<<<<<<< HEAD
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
=======
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
>>>>>>> dev
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

<<<<<<< HEAD
    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
=======
    const deleteUser = () => {
        form.delete(route("profile.destroy"), {
>>>>>>> dev
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

<<<<<<< HEAD
    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data will be permanently
                    deleted. Before deleting your account, please download any data or information
                    that you wish to retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Delete Account</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
=======
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
>>>>>>> dev
                        Once your account is deleted, all of its resources and data will be
                        permanently deleted. Please enter your password to confirm you would like to
                        permanently delete your account.
                    </p>

<<<<<<< HEAD
                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
=======
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
>>>>>>> dev
    );
}
