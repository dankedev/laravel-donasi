import { ChartArea, Contact, Gift, House, Lock, LucideProps, Settings2 } from "lucide-react";
export interface LinksGroupProps {
    icon: React.FC<LucideProps>;
    label: string;
    link?: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string; icon?: React.FC<LucideProps> }[];
}

export const navLinks: LinksGroupProps[] = [
    { label: "Dashboard", icon: House, link: "dashboard" },
    {
        label: "Campaign",
        icon: Gift,
        initiallyOpened: true,
        links: [
            { label: "Semua Campaign", link: "editor.campaign.index" },
            { label: "Editor", link: "editor.campaign.editor" },
        ],
    },

    { label: "Analytics", icon: ChartArea },
    { label: "Contracts", icon: Contact },
    { label: "Settings", icon: Settings2, link: "setting.index" },
    {
        label: "Security",
        icon: Lock,
        links: [
            { label: "Enable 2FA", link: "dashboard" },
            { label: "Change password", link: "dashboard" },
            { label: "Recovery codes", link: "dashboard" },
        ],
    },
];
