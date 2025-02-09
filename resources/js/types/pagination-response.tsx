export interface PaginationProps {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links?: {
        url: null | string;
        label: string;
        active: boolean;
    }[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface PaginationResponse<T> extends PaginationProps {
    data: T[];
}
