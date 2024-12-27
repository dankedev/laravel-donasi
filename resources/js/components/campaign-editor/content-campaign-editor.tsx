import { usePage } from "@inertiajs/react";
import { Card, Radio, SimpleGrid, Stack, TextInput } from "@mantine/core";
import { Link, RichTextEditor } from "@mantine/tiptap";
import SubScript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCampaignEditor } from "./editor-provider";

// const content =
//     '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

export function ContentCampaignEditor() {
    const { form } = useCampaignEditor();
    const categories = usePage().props.categories;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: form.values?.content,
        onUpdate: ({ editor }) => {
            form.setFieldValue("content", editor.getHTML());
        },
    });

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
        <Stack>
            <Card withBorder>
                <Card.Section className="px-6 py-4 sm:py-8 lg:px-8" withBorder>
                    <TextInput
                        placeholder="Judul"
                        size="lg"
                        description="Berikan judul yang jelas untuk campaign Anda"
                        {...form.getInputProps("title")}
                    />
                </Card.Section>
                <Card.Section className="px-6 py-4 sm:py-8 lg:px-8" withBorder>
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Undo />
                                <RichTextEditor.Redo />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                </Card.Section>
            </Card>
            <Card bg="gray.0">
                <Card.Section withBorder px="lg" py="md">
                    <h2 className="font-bold">Pengaturan Campaign</h2>
                </Card.Section>
                <Card.Section p="lg" withBorder>
                    <SimpleGrid cols={{ base: 1, md: 2 }}>
                        <Radio.Group
                            {...form.getInputProps("category_id")}
                            label="Kategori Campaign"
                            description="Sesuaikan kategori campaign anda"
                            withAsterisk
                        >
                            <Stack mt="xs">
                                {categories.map((item) => (
                                    <Radio
                                        key={`radio-form-type-${item.value}`}
                                        value={item.id?.toString()}
                                        label={item.name}
                                    />
                                ))}
                            </Stack>
                        </Radio.Group>
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
                    </SimpleGrid>
                </Card.Section>
            </Card>
        </Stack>
    );
}
