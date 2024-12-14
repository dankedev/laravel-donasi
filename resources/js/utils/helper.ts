import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function isExists<T>(value: T): value is T {
    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    if (typeof value === "number") {
        return !isNaN(value); // Memastikan number tidak NaN
    }

    if (Array.isArray(value)) {
        return value.length > 0; // Memastikan array tidak kosong
    }

    if (typeof value === "object") {
        if (value instanceof Date) {
            return !isNaN(value.getTime()); // Memastikan tanggal valid
        }
        if (value instanceof RegExp) {
            return true; // Untuk RegExp dianggap ada
        }
        if (value instanceof Error) {
            return true; // Untuk Error dianggap ada
        }
        return value !== null && !Array.isArray(value) && Object.keys(value).length > 0;
    }
    return value !== null && value !== undefined;
}

export function slugify(str?: string): string {
    if (!str) {
        return "str";
    }
    return str
        .toLowerCase() // Ubah semua huruf menjadi huruf kecil
        .trim() // Hapus spasi di awal dan akhir
        .replace(/[^\w\s-]/g, "") // Hapus karakter yang tidak diinginkan
        .replace(/[\s_-]+/g, "_") // Ganti spasi dan tanda penghubung dengan satu tanda penghubung
        .replace(/^-+|-+$/g, ""); // Hapus tanda penghubung di awal dan akhir string
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function initializeFormValues<T>(values: T): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(values), 1000);
    });
}
