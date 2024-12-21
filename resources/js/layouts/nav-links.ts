import { ChartArea, Contact, Gift, House, Lock, LucideProps, Settings2 } from "lucide-react";
export interface LinksGroupProps {
    icon: React.FC<LucideProps>;
    label: string;
    link?: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string; icon?: React.FC<LucideProps> }[];
}

export const navLinks: LinksGroupProps[] = [
    { label: "Dashboard", icon: House, link: "admin.dashboard" },
    {
        label: "Campaign",
        icon: Gift,
        initiallyOpened: true,
        links: [
            { label: "Semua Campaign", link: "admin.campaign.index" },
            { label: "Category", link: "admin.campaign.category.index" },
        ],
    },

    { label: "Analytics", icon: ChartArea },
    { label: "Contracts", icon: Contact },
    { label: "Settings", icon: Settings2, link: "admin.setting.index" },
    {
        label: "Security",
        icon: Lock,
        links: [
            { label: "Enable 2FA", link: "admin.dashboard" },
            { label: "Change password", link: "admin.dashboard" },
            { label: "Recovery codes", link: "admin.dashboard" },
        ],
    },
];
