import { Image, Stack } from "@mantine/core";
import {
    Dropzone,
    DropzoneProps,
    FileRejection,
    FileWithPath,
    IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
// import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { CheckCheck, CircleX, ImagePlus, ImageUp } from "lucide-react";
import { useEffect, useState } from "react";

interface Props extends Partial<DropzoneProps> {
    // onDrop: (file: FileWithPath[])=>void;
    // imageUrl?:string;
    currentImageUrl?: string;
    directory: string;
    postId: number;
    onSetValue: (value?: number) => void;
    placeholder?: string;
    // setImageUrl:(value:string)=>void;
}
export function UploadFeaturedImage({
    onSetValue,
    postId,
    currentImageUrl,
    directory,
    placeholder,
    ...props
}: Props) {
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (currentImageUrl) {
            setImageUrl(currentImageUrl);
        }
    }, [currentImageUrl]);

    const onReject = (files: FileRejection[]) => {
        console.dir(files);
    };

    const handleOnDrop = (files: FileWithPath[]) => {
        const file = files[0];
        // const postId = form?.values?.id?.toString() ?? "";
        const formData = new FormData();
        formData.append("file", file);
        formData.append("parent_id", postId.toString());
        formData.append("directory", directory);
        const id = notifications.show({
            loading: true,
            title: "Uploading image...",
            message: "Mohon sabar menunggu, sedang proses upload",
            autoClose: false,
            withCloseButton: false,
        });

        const promise = axios.post(route("admin.upload"), formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                // "content-type": file?.type || "application/octet-stream",
                // "x-vercel-filename": file?.name || "image.png",
                // "_token": token,
            },
        });

        new Promise((_resolve, reject) => {
            promise.then(async (res) => {
                // Successfully uploaded image
                if (res.status === 200) {
                    console.warn(res.data);
                    // form.setFieldValue("featured_id", res.data?.id);
                    onSetValue(res.data?.id);
                    const url = res.data?.url;
                    // preload the image
                    // const image = new Image();
                    // image.src = url;
                    // image.onload = () => {
                    //     _resolve(url);
                    // };
                    setImageUrl(url);
                    notifications.update({
                        id,
                        color: "teal",
                        title: "Data was loaded",
                        message:
                            "Notification will close in 2 seconds, you can close this notification now",
                        icon: <CheckCheck className="text-lg text-green-600" />,
                        loading: false,
                        autoClose: 2000,
                        onClose: () => _resolve(url),
                    });
                    // No blob store configured
                } else if (res.status === 401) {
                    reject(file);
                    notifications.update({
                        id,
                        color: "red",
                        title: "Failed to load data",
                        message: "Image failed to upload",
                        icon: <CircleX className="text-lg text-red-600" />,
                        loading: false,
                        autoClose: 2000,
                        onClose: () => reject(),
                    });
                    throw new Error(
                        "`BLOB_READ_WRITE_TOKEN` environment variable not found, reading image locally instead."
                    );
                    // Unknown error
                } else {
                    notifications.update({
                        id,
                        color: "red",
                        title: "Failed to load data",
                        message: "Image failed to upload",
                        icon: <CircleX className="text-lg text-red-600" />,
                        loading: false,
                        autoClose: 2000,
                    });
                    throw new Error("Error uploading image. Please try again.");
                }
            });
        });

        console.clear();
        console.group("Files");
        console.dir(files);
        console.groupEnd();
    };

    return (
        <>
            <Dropzone
                onDrop={handleOnDrop}
                onReject={onReject}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
                p={imageUrl ? 0 : 15}
            >
                {imageUrl && imageUrl !== "" ? (
                    <Image src={imageUrl} w={500} />
                ) : (
                    <EmptyUploadImage placeholder={placeholder} />
                )}
            </Dropzone>
            {/* {imageUrl} */}
        </>
    );
}

const EmptyUploadImage = ({ placeholder }: { placeholder?: string }) => {
    return (
        <Stack justify="center" align="center" gap="sm" mih={150} style={{ pointerEvents: "none" }}>
            <Dropzone.Accept>
                <ImageUp className="size-12 text-blue-600" />
            </Dropzone.Accept>
            <Dropzone.Reject>
                <CircleX className="size-12 text-red-600" />
            </Dropzone.Reject>
            <Dropzone.Idle>
                <ImagePlus className="size-12 text-gray-300" />
            </Dropzone.Idle>

            <div>
                <div className="text-md text-center font-bold">Tambah Gambar</div>
                {placeholder && (
                    <div className="text-center text-xs text-gray-300">{placeholder}</div>
                )}
            </div>
        </Stack>
    );
};
