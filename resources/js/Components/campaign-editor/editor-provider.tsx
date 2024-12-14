import { CampaignProps } from "@/types/campaign";
import { createFormContext } from "@mantine/form";

// You can give context variables any name
export const [CampaignFormProvider, useCampaignFormContext, useCampaignForm] =
    createFormContext<CampaignProps>();
