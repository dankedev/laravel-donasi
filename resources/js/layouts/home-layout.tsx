import { Icons } from "@/components/icons";
import { Head, Link } from "@inertiajs/react";
import { HomeHeader } from "./home-header";

export default function HomeLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const links = [
        {
            label: "Tentang Barkasmal",
            href: "https://barkasmal.com/tentang-kami",
        },
        {
            label: "Hubungi Kami",
            href: "https://www.barkasmal.com/#kontak",
        },
        {
            label: "Program Unggulan",
            href: "https://www.barkasmal.com/#program",
        },
    ];

    const socials = [
        {
            label: "Instagram",
            href: "https://www.instagram.com/barkasmal",
            icon: <Icons.instagram className="size-6" />,
        },
        {
            label: "Facebook",
            href: "https://www.facebook.com/Barkasmal",
            icon: <Icons.facebook className="size-6" />,
        },
        {
            label: "Tiktok",
            href: "https://x.com/Barkasmal_Jogja",
            icon: <Icons.tiktok className="size-6" />,
        },
        {
            label: "X",
            href: "https://x.com/Barkasmal_Jogja",
            icon: <Icons.twitter className="size-6" />,
        },
        {
            label: "WhatsApp",
            href: "http://wa.me/+6287839350674",
            icon: <Icons.whatsapp className="size-6" />,
        },
    ];
    return (
        <div className="min-h-screen bg-blue-200/25 text-black/50 dark:bg-black dark:text-white/50">
            <HomeHeader />
            <Head title={`${title ?? "Beranda"} | Yayasan Barkasmal Nusantara`} />
            <div className="container mx-auto flex min-h-screen max-w-screen-sm flex-col rounded-md bg-white">
                <main className="flex-1">{children}</main>
                <footer className="footer flex flex-col gap-4 border-t bg-stone-100 px-6 py-6 text-center text-xs lg:px-10">
                    <div>
                        {" "}
                        Berdiri sejak 2012,telah memulai aktifitas pengelolaan kertas dan barang
                        bekas untuk dijadikan beasiswa pendidikan.
                    </div>

                    <ul className="flex items-center justify-center divide-x">
                        {links.map((item) => (
                            <li key={item.label}>
                                <Link
                                    className="px-2 text-gray-600 hover:text-blue-800"
                                    href={item.href}
                                    target="_blank"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center justify-center gap-4 py-4">
                        {socials.map((item) => (
                            <Link key={item.label} href={item.href} target="_blank">
                                {item.icon}
                            </Link>
                        ))}
                    </div>

                    <p>Copyright © {new Date().getFullYear()} Barkasmal. All Rights Reserved</p>
                </footer>
            </div>
        </div>
    );
}
