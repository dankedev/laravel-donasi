import { useRequest, UseRequestProps } from "@/hooks/use-request";
import { CampaignProps } from "@/types/campaign";
import { utcDateTime } from "@/utils";
import { initializeFormValues } from "@/utils/helper";
import { notifications } from "@mantine/notifications";
import { createContext, PropsWithChildren, useContext, useEffect } from "react";

// You can give context variables any name

export interface EditorContextProps {
    data?: CampaignProps;
}

const EditorContext = createContext<{
    form: UseRequestProps<CampaignProps>;
    data?: CampaignProps;
} | null>(null);

export function CampaignFormProvider({ children, data }: PropsWithChildren<EditorContextProps>) {
    const form = useRequest<CampaignProps>({
        initialValues: data,
    });

    useEffect(() => {
        if (data?.id)
            initializeFormValues<CampaignProps>(data).then((a) => {
                return form.setValues({
                    ...a,
                    category_id: a.category_id?.toString(),
                    start_date: form.values.start_date
                        ? new Date(utcDateTime(form.values.start_date))
                        : null,
                    finish_date: form.values.finish_date
                        ? new Date(utcDateTime(form.values.finish_date))
                        : null,
                });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const handleOnSubmit = (value: CampaignProps) => {
        if (value.id) {
            form.patch(route("admin.campaign.update"), {
                onSuccess: () =>
                    notifications.show({
                        title: "Campaign Update",
                        message: "Campaign berhasil diupdate",
                        color: "blue",
                    }),
            });
        } else {
            form.post(route("admin.campaign.store"), {
                onSuccess: () =>
                    notifications.show({
                        title: "Campaign Created",
                        message: "Campaign berhasil disimpan",
                        color: "green",
                    }),
            });
        }
    };
    return (
        <EditorContext.Provider
            value={{
                form,
                data,
            }}
        >
            <form onSubmit={form.onSubmit(handleOnSubmit)}>{children}</form>
        </EditorContext.Provider>
    );
}

export function useCampaignEditor() {
    const ctx = useContext(EditorContext);

    if (!ctx) {
        throw new Error(
            "[@builder/core] useEditor hook was called outside of context, wrap your app with WorkspaceProvider component"
        );
    }

    return ctx;
}
