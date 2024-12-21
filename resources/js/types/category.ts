import { AssetStorage } from "./asset";
import { FormValue } from "./request";

export type CategoryProps = {
    id?: number | null;
    name: string;
    slug: string;
    url: string;
    created_at?: Date;
    updated_at?: Date;
    featured_id?: number | null;
    is_active?: boolean;
    description?: string;
    featured_image?: AssetStorage;
    images?: AssetStorage[];
    [key: string]: FormValue;
};
