// import { UploadFeaturedImage } from "@/components/campaign-editor/upload-feature-image";
import { UploadFeaturedImage } from "@/components/campaign-editor/upload-feature-image";
import { useRequest } from "@/hooks/use-request";
import { CategoryProps } from "@/types";
import { initializeFormValues } from "@/utils";
import { ActionIcon, Button, Card, LoadingOverlay, Textarea, TextInput } from "@mantine/core";
import { hasLength } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

export function FormCategory({ category }: { category?: CategoryProps }) {
    const [loading, setLoading] = useState(false);
    const form = useRequest<CategoryProps>({
        initialValues: category,
        validate: {
            name: hasLength({ min: 2, max: 30 }, "Name must be 2-30 characters long"),
            slug: hasLength({ min: 2, max: 30 }, "Slug wajib diisi"),
        },
    });

    useEffect(() => {
        if (category?.id) {
            initializeFormValues<CategoryProps>(category)
                .then((a) => {
                    form.setValues(a);
                    setLoading(true);
                })
                .then(() => setLoading(false));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category]);

    const handleOnSubmit = (value: CategoryProps) => {
        if (value.id) {
            form.patch(route("admin.campaign.category.update"), {
                onSuccess: () => {
                    notifications.show({
                        title: "Category Update",
                        message: "Category berhasil diupdate",
                        color: "blue",
                    });
                    form.reset();
                },
            });
        } else {
            form.post(route("admin.campaign.category.save"), {
                onSuccess: () => {
                    notifications.show({
                        title: "Category Created",
                        message: "Category berhasil disimpan",
                        color: "green",
                    });
                    form.reset();
                },
            });
        }
    };

    return (
        <Card shadow="lg">
            <Card.Section px="xl" py="md" withBorder bg="gray.0" fw="bold" fz="lg">
                {form.values?.id ? (
                    <div>
                        Edit Kategori <strong className="text-blue-500">{category?.name}</strong>
                    </div>
                ) : (
                    "Buat Kategori"
                )}
            </Card.Section>
            <Card.Section px="xl" py="md">
                <LoadingOverlay visible={loading} />
                <form onSubmit={form.onSubmit(handleOnSubmit)}>
                    <div className="flex flex-col gap-6">
                        <TextInput
                            label="Nama Kategori"
                            size="lg"
                            {...form.getInputProps("name")}
                        />
                        <TextInput label="Slug" size="lg" {...form.getInputProps("slug")} />
                        <Textarea
                            autosize
                            label="Deskripsi"
                            size="lg"
                            {...form.getInputProps("description")}
                        />
                        <TextInput label="Blog URL" size="lg" {...form.getInputProps("url")} />

                        <UploadFeaturedImage
                            directory="category"
                            onSetValue={(id) => {
                                form.setFieldValue("featured_id", id);
                            }}
                            postId={Number(form?.values?.id)}
                            placeholder="Disarankan 650x650px atau 1x1"
                            currentImageUrl={form.values?.featured_image?.url}
                        />
                        <div className="flex w-full items-center gap-4">
                            <Button type="submit" size="lg" fullWidth>
                                Buat Kategori
                            </Button>
                            <ActionIcon
                                variant="outline"
                                size="xl"
                                type="reset"
                                onClick={() =>
                                    form.setValues({
                                        id: null,
                                        name: "",
                                        slug: "",
                                        description: "",
                                        url: "",
                                        featured_id: null,
                                    })
                                }
                            >
                                <RotateCcw size={20} />
                            </ActionIcon>
                        </div>
                    </div>
                </form>
            </Card.Section>
        </Card>
    );
}
