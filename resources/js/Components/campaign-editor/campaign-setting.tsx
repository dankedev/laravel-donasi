import { Card, NumberInput, Radio, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useCampaignFormContext } from "./editor-provider";

export function CampaignSettingEditor() {
    const form = useCampaignFormContext();

    const formTypes = [
        { label: "Card", value: "card" },

        { label: "List", value: "list" },

        { label: "Manual", value: "manual" },

        { label: "Package", value: "package" },

        { label: "Qurban", value: "qurban" },

        { label: "Zakat Fitr", value: "zakat_fitr" },

        { label: "Zakat Mal", value: "zakat_mal" },
    ];
    return (
        <Card bg="gray.0">
            <Card.Section withBorder px="lg" py="md">
                <h2>Pengaturan Campaign</h2>
            </Card.Section>
            <Card.Section p="lg" withBorder>
                <Radio.Group
                    {...form.getInputProps("form_type")}
                    label="Jenis Campaign"
                    description="Sesuaikan jenis campaign anda"
                    withAsterisk
                >
                    <Stack mt="xs">
                        {formTypes.map((item) => (
                            <Radio
                                key={`radio-form-type-${item.value}`}
                                value={item.value}
                                label={item.label}
                            />
                        ))}
                    </Stack>
                </Radio.Group>
            </Card.Section>
            <Card.Section inheritPadding py="lg">
                <NumberInput
                    {...form.getInputProps("goal")}
                    placeholder="Target campaign"
                    label="Target Pencapaian Campaign"
                    leftSection={<span>Rp.</span>}
                    hideControls
                />
            </Card.Section>

            <Card.Section inheritPadding py="lg">
                <Stack>
                    <DateInput
                        label="Tanggal Campaign dimulai"
                        clearable
                        minDate={new Date()}
                        placeholder="Pilih tanggal"
                        {...form.getInputProps("started_date")}
                    />
                    <DateInput
                        disabled={!form.values.started_date}
                        minDate={form.values.started_date ?? new Date()}
                        label="Tanggal Campaign Selesai"
                        clearable
                        placeholder="Pilih tanggal"
                        {...form.getInputProps("end_date")}
                    />
                </Stack>
            </Card.Section>
        </Card>
    );
}
