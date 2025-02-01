import { CampaignProps } from "@/types/campaign";
import { formatDateDifference, numberFormat } from "@/utils";
import { Link } from "@inertiajs/react";

export function CampaignLists({
    className,
    campaigns,
}: {
    className?: string;
    campaigns?: CampaignProps[];
}) {
    // const campaigns = props?.campaigns;
    return (
        <div className={className}>
            <h2 className="mb-8 text-center text-xl font-bold text-blue-950">PILIHAN BARKASMAL</h2>
            <div className="flex w-full flex-col justify-stretch divide-y divide-blue-300/10 text-black">
                {campaigns?.map((campaign) => {
                    const tercapai = 2000000;
                    return (
                        <Link
                            href={route("campaign.show", campaign.slug)}
                            key={`campaign-${campaign.slug}`}
                            className="group relative grid h-full grid-cols-12 items-stretch justify-stretch px-6 py-6 hover:bg-gray-100"
                        >
                            <div className="col-span-4 lg:col-span-5">
                                <img
                                    src={campaign.featured_image?.url}
                                    alt={campaign.title}
                                    className="h-auto w-auto rounded-md"
                                />
                            </div>
                            <div className="col-span-8 flex h-full flex-col items-start justify-center gap-1 px-4 lg:col-span-7">
                                <h2 className="line-clamp-2 text-sm font-bold">{campaign.title}</h2>
                                <p className="text-xs text-gray-500">{campaign.category?.name}</p>
                                <div className="relative h-1 w-full rounded-md bg-gray-300">
                                    <span
                                        className="absolute top-0 left-0 h-full rounded-md bg-blue-500"
                                        style={{ width: `${(tercapai / campaign.goal) * 100}%` }}
                                    ></span>
                                </div>
                                <div className="flex w-full justify-between pt-2">
                                    <div className="flex flex-col">
                                        <p className="text-xs text-gray-500">Terkumpul</p>
                                        <p className="text-xs font-bold text-blue-900">
                                            {numberFormat(tercapai, "Rp. ")}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {campaign.finish_date
                                            ? formatDateDifference(campaign.finish_date)
                                            : "Belum dimulai"}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
