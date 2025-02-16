// import {
//     CampaignFormProvider,
//     CampaignSettingEditor,
//     ContentCampaignEditor,
// } from "@/components/campaign-editor/index";
// import AppLayout from "@/layouts/app-layout";
import {
    CampaignFormProvider,
    CampaignSettingEditor,
    ContentCampaignEditor,
} from "@/components/campaign-editor";
import AppLayout from "@/layouts/app-layout";
import { CampaignProps } from "@/types/campaign";
import { Head } from "@inertiajs/react";

export default function CampaignEditor({ data }: { data: CampaignProps }) {
    return (
        <CampaignFormProvider data={data}>
            <Head title={data?.title ?? "Campaign Editor"} />

            <AppLayout header={data?.title ?? "Campaign Editor"}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-9">
                        <ContentCampaignEditor />
                    </div>
                    <div className="relative col-span-1 lg:col-span-3">
                        <CampaignSettingEditor />
                    </div>
                </div>
            </AppLayout>
        </CampaignFormProvider>
    );
}
