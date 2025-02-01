import HomeLayout from "@/layouts/home-layout";
import { CampaignProps } from "@/types/campaign.ts";
import { formatDateDifference, numberFormat } from "@/utils";
import { HeartIcon } from "lucide-react";

export default function Campaign({ campaign }: { campaign: CampaignProps }) {
    const tercapai = 2000000;

    return (
        <HomeLayout>
            <div className="flex flex-col gap-10 pt-20">
                <header className="space-y-4">
                    <div className="col-span-4 lg:col-span-5">
                        <img
                            src={campaign.featured_image?.url}
                            alt={campaign.title}
                            className="h-auto w-auto rounded-md"
                        />
                    </div>
                    <div className="space-y-4 px-6">
                        <h1 className="text-xl font-bold text-black dark:text-stone-900">
                            {campaign.title}
                        </h1>
                        <div className="flex flex-col items-start justify-center gap-1">
                            <div className="flex flex-col">
                                <p className="text-xs text-gray-500">Terkumpul</p>
                                <p className="text-xs">
                                    <span className="text-lg font-bold text-blue-900">
                                        {" "}
                                        {numberFormat(tercapai, "Rp. ")}{" "}
                                    </span>{" "}
                                    <span>dari target </span>
                                    <span className="text-xs font-bold text-black dark:text-stone-900">
                                        {numberFormat(campaign.goal, "Rp. ")}
                                    </span>
                                </p>
                            </div>
                            <div className="relative h-2 w-full rounded-md bg-gray-300">
                                <span
                                    className="absolute top-0 left-0 h-full rounded-md bg-blue-500"
                                    style={{ width: `${(tercapai / campaign.goal) * 100}%` }}
                                ></span>
                            </div>
                            <div className="flex w-full justify-between pt-2">
                                <div className="flex items-center gap-1 text-xs">
                                    <HeartIcon className="size-3 text-red-500" />
                                    <span className="text-black dark:text-stone-900">
                                        {" "}
                                        {numberFormat(24484)}
                                    </span>{" "}
                                    donasi
                                </div>
                                <div className="text-xs text-gray-500">
                                    {campaign.finish_date
                                        ? formatDateDifference(campaign.finish_date)
                                        : "Belum dimulai"}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <article className="px-6 py-6 pb-12 prose " dangerouslySetInnerHTML={{__html:campaign?.content ?? ""}}/>

            </div>
        </HomeLayout>
    );
}
