import { Head } from "@inertiajs/react";
import { HomeHeader } from "./home-header";

export default function HomeLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    return (
        <div className="min-h-screen bg-blue-200/25 text-black/50 dark:bg-black dark:text-white/50">
            <HomeHeader />
            <Head title={`${title ?? "Beranda"} | Yayasan Barkasmal Nusantara`} />
            <div className="container mx-auto max-w-screen-sm rounded-md bg-white">{children}</div>
        </div>
    );
}
