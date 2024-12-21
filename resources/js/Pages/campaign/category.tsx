import AppLayout from "@/layouts/app-layout";
import { CategoryProps } from "@/types";
import { Head } from "@inertiajs/react";
import { Button, Card } from "@mantine/core";
import { useState } from "react";
import { FormCategory } from "./form-category";

export default function Category({ data }: { data: CategoryProps[] }) {
    const [category, setCategory] = useState<CategoryProps>();

    return (
        <AppLayout
            header={
                <div className="flex w-full items-center justify-between">
                    <span>Kategori Campaign</span>
                </div>
            }
        >
            <Head title="Kategori Campaign" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="col-span-1 lg:col-span-7">
                    <Card shadow="sm">
                        <Card.Section px="xl" py="md" withBorder bg="gray.0" fw="bold" fz="lg">
                            Kategori
                        </Card.Section>
                        <Card.Section>
                            <div className="flex flex-col divide-y">
                                {data?.map((item) => (
                                    <div
                                        key={item.slug}
                                        className="flex items-center justify-between bg-gray-50 px-4 py-3 hover:bg-gray-100"
                                    >
                                        <span className="font-bold">{item.name}</span>
                                        <Button
                                            variant="outline"
                                            size="compact-xs"
                                            onClick={() => setCategory(item)}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card.Section>
                    </Card>
                </div>
                <div className="col-span-1 lg:col-span-5">
                    <FormCategory category={category} />
                </div>
            </div>
        </AppLayout>
    );
}
