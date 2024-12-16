import { PaginationProps } from "@/types";
import { Link } from "@inertiajs/react";

const PaginationLinks = ({
    pagination,
    meta = null,
}: {
    pagination: PaginationProps | null;
    meta: PaginationProps | null;
}) => {
    const range = meta ? { from: meta.from, to: meta.to, total: meta.total } : pagination;
    const links = pagination?.links ?? [];
    return (
        <div className="my-2 sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm leading-5 text-gray-700">
                Showing <span className="font-medium">{range?.from}</span> /{" "}
                <span className="font-medium">{range?.to} </span> (
                <span className="font-medium">{range?.total}</span> total)
            </p>
            <div>
                <span className="relative z-0 inline-flex rounded-md shadow-sm">
                    <span>
                        {links?.map((link, index) => {
                            const key = link.label + index;
                            if (link.active) {
                                return (
                                    <span key={key}>
                                        <span className="relative -ml-px inline-flex cursor-default items-center border border-gray-300 bg-blue-500 px-4 py-2 text-sm font-medium leading-5 text-gray-100">
                                            {link.label}
                                        </span>
                                    </span>
                                );
                            }

                            return (
                                <span key={key}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveState={true}
                                            className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-700 hover:bg-gray-300"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <span className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium leading-5 text-gray-300">
                                            {link.label}
                                        </span>
                                    )}
                                </span>
                            );
                        })}
                    </span>
                </span>
            </div>
        </div>
    );
};

export default PaginationLinks;
