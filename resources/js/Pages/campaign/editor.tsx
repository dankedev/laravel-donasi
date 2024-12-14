import {
    CampaignFormProvider,
    CampaignSettingEditor,
    ContentCampaignEditor,
    useCampaignForm,
} from "@/components/campaign-editor";
import AppLayout from "@/layouts/app-layout";
import { CampaignProps } from "@/types/campaign";
import { Head } from "@inertiajs/react";

export default function CampaignEditor({ data }: { data: CampaignProps }) {
    const form = useCampaignForm({
        initialValues: data,
    });

    return (
        <CampaignFormProvider form={form}>
            <Head title={data?.title ?? "Campaign Editor"} />

            <AppLayout>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-9">
                        <ContentCampaignEditor />
                    </div>
                    <div className="col-span-1 lg:col-span-3">
                        <CampaignSettingEditor />
                        {JSON.stringify(form.values)}
                    </div>
                </div>
            </AppLayout>
        </CampaignFormProvider>
    );
}
