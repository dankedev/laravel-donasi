import AppLayout from "@/layouts/app-layout.tsx";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./partials/delete-user-form.tsx";
import UpdatePasswordForm from "./partials/update-password-form.tsx";
import UpdateProfileInformationForm from "./partials/update-profile-information-form";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AppLayout
            header={
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="px-6 py-12 md:px-12">
                <div className="max-w-4xl space-y-6">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                    <UpdatePasswordForm />

                    <DeleteUserForm />
                </div>
            </div>
        </AppLayout>
    );
}
