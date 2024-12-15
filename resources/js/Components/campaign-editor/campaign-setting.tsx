import { utcDateTime } from "@/utils";
import { Card, Checkbox, NumberInput, Stack, Text, UnstyledButton } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useRef } from "react";
import { useCampaignEditor } from "./editor-provider";
import { UploadFeaturedImage } from "./upload-feature-image";

export function CampaignSettingEditor() {
    const { form } = useCampaignEditor();
    const checkboxRef = useRef<HTMLInputElement | null>(null);
    return (
        <Card bg="gray.0" className="sticky top-0 z-50">
            <UploadFeaturedImage
                directory="featured"
                onSetValue={(id) => {
                    form.setFieldValue("featured_id", id);
                }}
                postId={Number(form?.values?.id)}
                placeholder="Disarankan 650x350px"
                currentImageUrl={form.values?.featured_image?.url}
            />

            <Card.Section inheritPadding py="lg" withBorder mt={30}>
                <NumberInput
                    {...form.getInputProps("goal")}
                    placeholder="Target campaign"
                    label="Target Pencapaian Campaign"
                    leftSection={<span>Rp.</span>}
                    hideControls
                    thousandSeparator="."
                    decimalSeparator=","
                    styles={{
                        input: {
                            fontWeight: "bolder",
                            fontSize: 18,
                        },
                    }}
                />
            </Card.Section>

            <Card.Section inheritPadding py="lg" withBorder mb={30}>
                <Stack>
                    <DateTimePicker
                        label="Tanggal Campaign dimulai"
                        clearable
                        minDate={new Date()}
                        placeholder="Pilih tanggal"
                        // {...form.getInputProps("start_date")}
                        value={
                            form.values.start_date && new Date(utcDateTime(form.values.start_date))
                        }
                        onChange={(a) => form.setFieldValue("start_date", a)}
                    />
                    <DateTimePicker
                        disabled={!form.values.start_date}
                        minDate={
                            form.values.start_date ? new Date(form.values.start_date) : new Date()
                        }
                        label="Tanggal Campaign Selesai"
                        clearable
                        placeholder="Pilih tanggal"
                        value={
                            form.values.finish_date &&
                            new Date(utcDateTime(form.values.finish_date))
                        }
                        onChange={(a) => form.setFieldValue("finish_date", a)}
                    />
                </Stack>
            </Card.Section>

            <UnstyledButton
                className="flex w-full items-center rounded-md border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
                type="button"
                p="lg"
                onClick={() => checkboxRef?.current?.click()}
            >
                <Checkbox
                    ref={checkboxRef}
                    tabIndex={-1}
                    size="md"
                    mr="xl"
                    styles={{ input: { cursor: "pointer" } }}
                    aria-hidden
                    {...form.getInputProps("publised", { type: "checkbox" })}
                />

                <div>
                    <Text fw={500} mb={7} lh={1}>
                        Publish
                    </Text>
                    <Text fz="sm" c="dimmed">
                        Campaign tampil dipublik
                    </Text>
                </div>
            </UnstyledButton>
        </Card>
    );
}
