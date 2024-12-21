import { Config } from "ziggy-js";
import { CampaignProps } from "./campaign";
import { UserProps } from "./user";

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: UserProps;
    };
    ziggy: Config & { location: string };
    campaigns: CampaignProps[];
};
