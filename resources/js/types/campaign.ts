import { AssetStorage } from "./asset";
import { CategoryProps } from "./category";
import { FormValue } from "./request";

export interface CampaignProps {
    id: number; // corresponds to the auto-incrementing primary key
    title: string; // corresponds to the 'title' column
    slug: string; // corresponds to the 'slug' column
    content: string; // corresponds to the 'content' column
    form_type: "card" | "list" | "manual" | "package" | "qurban" | "zakat_fitr" | "zakat_mal"; // corresponds to the 'form_type' enum
    published: boolean; // corresponds to the 'publised' column (note the typo in the original schema)
    goal: number; // corresponds to the 'goal' column
    start_date: Date | null; // corresponds to the 'started_date' column
    finish_date: Date | null; // corresponds to the 'finish_date' column
    created_at: Date; // corresponds to the 'created_at' timestamp
    updated_at: Date; // corresponds to the 'updated_at' timestamp
    featured_image?: AssetStorage;
    images?: AssetStorage[];
    category?: CategoryProps;
    category_id?: number | string;
    [key: string]: FormValue;
}
