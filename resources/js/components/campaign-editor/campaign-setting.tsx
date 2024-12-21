import { utcDateTime } from "@/utils";
import { Card, Checkbox, NumberInput, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { memo, useCallback } from "react";
import { useCampaignEditor } from "./editor-provider";
import { UploadFeaturedImage } from "./upload-feature-image";

const MemoizedCheckbox = memo(function MemoizedCheckbox({
    checked,
    onChange,
}: {
    checked: boolean;
    onChange: (checked: boolean) => void;
}) {
    return (
        <Checkbox
            checked={checked}
            onChange={(e) => onChange(e.currentTarget.checked)}
            size="md"
            mr="xl"
            styles={{ input: { cursor: "pointer" } }}
            aria-hidden
        />
    );
});

const MemoizedDateTimePicker = memo(function MemoizedDateTimePicker({
    label,
    value,
    onChange,
    minDate,
    disabled = false,
}: {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    disabled?: boolean;
}) {
    return (
        <DateTimePicker
            label={label}
            clearable
            disabled={disabled}
            minDate={minDate}
            placeholder="Pilih tanggal"
            value={value}
            onChange={onChange}
        />
    );
});

export function CampaignSettingEditor() {
    const { form } = useCampaignEditor();
    // const checkboxRef = useRef<HTMLInputElement | null>(null);

    const handleCheckboxChange = useCallback(
        (checked: boolean) => {
            form.setFieldValue("publised", checked);
        },
        [form]
    );

    const handleStartDateChange = useCallback(
        (date: Date | null) => form.setFieldValue("start_date", date),
        [form]
    );

    const handleEndDateChange = useCallback(
        (date: Date | null) => form.setFieldValue("finish_date", date),
        [form]
    );

    return (
        <Card bg="gray.0" className="stickyx top-0 z-50">
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
                    <MemoizedDateTimePicker
                        label="Tanggal Campaign dimulai"
                        value={
                            form.values.start_date
                                ? new Date(utcDateTime(form.values.start_date))
                                : null
                        }
                        onChange={handleStartDateChange}
                        minDate={new Date()}
                    />
                    <MemoizedDateTimePicker
                        label="Tanggal Campaign Selesai"
                        value={
                            form.values.finish_date
                                ? new Date(utcDateTime(form.values.finish_date))
                                : null
                        }
                        onChange={handleEndDateChange}
                        minDate={
                            form.values.start_date ? new Date(form.values.start_date) : new Date()
                        }
                        disabled={!form.values.start_date}
                    />
                </Stack>
            </Card.Section>
            <Stack>
                <TextInput label="Slug" {...form.getInputProps("slug")} />
                <UnstyledButton
                    className="flex w-full items-center rounded-md border-gray-300 bg-gray-50 p-6 hover:bg-gray-100"
                    type="button"
                    p="lg"
                    onClick={() => handleCheckboxChange(!form.values.publised)}
                >
                    <MemoizedCheckbox
                        checked={form.values.publised as boolean}
                        onChange={handleCheckboxChange}
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
            </Stack>
        </Card>
    );
}
