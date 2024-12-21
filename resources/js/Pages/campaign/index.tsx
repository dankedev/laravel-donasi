import AppLayout from "@/layouts/app-layout";
import { PaginationResponse } from "@/types";
import { CampaignProps } from "@/types/campaign";
import { dateDayFormat } from "@/utils";
import { Head, Link, router } from "@inertiajs/react";
import { ActionIcon, Badge, Image, Menu, NumberFormatter, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { CalendarClock, Ellipsis } from "lucide-react";
export default function CampaignPage({ data }: { data: PaginationResponse<CampaignProps> }) {
    const campaigns = data?.data;
    return (
        <AppLayout>
            <Head title="List Campaign Donasi" />
            <div className="table w-full">
                <div className="mb-11 table-header-group">
                    <div className="table-row">
                        <div className="table-cell border-b py-2 text-left">Campaign</div>
                        <div className="table-cell border-b text-left">Goal</div>
                        <div className="table-cell border-b text-left">Waktu Campaign</div>
                        <div className="table-cell border-b text-left"></div>
                    </div>
                </div>
                <div className="table-row-group">
                    {campaigns?.map((item) => (
                        <div key={`campaign-${item.id}`} className="table-row hover:bg-slate-100">
                            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <div className="flex gap-2">
                                    <Image
                                        src={item.featured_image?.url}
                                        w={120}
                                        alt={item.title}
                                        radius="md"
                                    />
                                    <div className="flex flex-col gap-3">
                                        <h3 className="font-bold">{item.title}</h3>
                                        <Badge>Kategori</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <NumberFormatter
                                    value={item.goal}
                                    thousandSeparator
                                    prefix="Rp. "
                                />
                            </div>
                            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <div className="flex items-start gap-4">
                                    <CalendarClock className="size-6 text-gray-400" />
                                    <div className="flex flex-col text-xs text-gray-500">
                                        <span>
                                            {dateDayFormat(item?.start_date, "DD MMM YYYY HH:mm")}
                                        </span>
                                        <span>
                                            {dateDayFormat(item?.finish_date, "DD MMM YYYY HH:mm")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="table-cell border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400">
                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <ActionIcon variant="subtle">
                                            <Ellipsis />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Label>Aksi</Menu.Label>
                                        <Menu.Item
                                            component={Link}
                                            href={route("admin.campaign.edit", { id: item.id })}
                                        >
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item
                                            onClick={() =>
                                                modals.openConfirmModal({
                                                    title: "Yakin....?",
                                                    children: (
                                                        <Text>
                                                            Apakah anda yakin akan menduplikasi
                                                            campaign <strong>{item.title}</strong>
                                                            ini?
                                                        </Text>
                                                    ),
                                                    labels: {
                                                        confirm: "In syaa Allah",
                                                        cancel: "Gak jadi",
                                                    },
                                                    onConfirm: () =>
                                                        router.post(
                                                            route("admin.campaign.duplicate", {
                                                                id: item.id,
                                                            })
                                                        ),
                                                })
                                            }
                                        >
                                            Duplikat
                                        </Menu.Item>
                                        <Menu.Item>Lihat Campaign</Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item>Hapus</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

//router.post(route("logout"))
