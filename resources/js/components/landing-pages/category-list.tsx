import { usePage } from "@inertiajs/react";

export function CategoryList() {
    const props = usePage().props;
    const categories = props?.categories;
    return (
        <div>
            <div className="flex flex-col gap-4 px-6 pb-12">
                <h1 className="text-center text-xl font-bold text-blue-950">
                    Pilihan donasi terbaik
                </h1>

                <div className="grid grid-cols-4 gap-4">
                    {categories?.map((category) => (
                        <div key={category.id}>
                            <div className="flex flex-col items-center justify-center gap-2 text-center">
                                <div className="grow">
                                    {" "}
                                    <img
                                        src={category.featured_image?.url}
                                        alt={category.name}
                                        className="size-16"
                                    />
                                </div>
                                <p className="text-xs font-light">{category.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
