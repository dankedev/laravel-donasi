import {
    CampaignFormProvider,
    CampaignSettingEditor,
    ContentCampaignEditor,
} from "@/components/campaign-editor";
import AppLayout from "@/layouts/app-layout";
import { CampaignProps } from "@/types/campaign";
import { Head } from "@inertiajs/react";
import { Button } from "@mantine/core";

export default function CampaignEditor({ data }: { data: CampaignProps }) {
    return (
        <CampaignFormProvider data={data}>
            <Head title={data?.title ?? "Campaign Editor"} />

            <AppLayout>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="col-span-1 lg:col-span-9">
                        <ContentCampaignEditor />
                    </div>
                    <div className="relative col-span-1 lg:col-span-3">
                        <CampaignSettingEditor />
                        <Button type="submit">Simpan Campaign</Button>
                    </div>
                </div>

            </AppLayout>
        </CampaignFormProvider>
    );
}
