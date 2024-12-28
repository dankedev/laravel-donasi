import { isValidElement, ReactNode } from "react";

export function shortNumber(number: number) {
    if (number >= 1_000_000_000) {
        return (number / 1_000_000_000).toFixed(2) + "m"; // miliar
    } else if (number >= 1_000_000) {
        return (number / 1_000_000).toFixed(2) + "jt"; // juta
    } else if (number >= 1_000) {
        return (number / 1_000).toFixed(2) + "rb"; // ribu
    }
    return numberFormat(number); // kurang dari ribu
}

export function numberFormat(n?: number, prefix?: string) {
    return `${prefix ? prefix + " " : ""}${new Intl.NumberFormat().format(n ? Number(n) : 0)}`;
}

export function isPhoneValid(phone: string) {
    return /62[0-9]+$/gm.test(phone);
}

export function isValueExists(item?: string | number | null | ReactNode | unknown) {
    if (typeof item === "string") {
        return trim(item) !== "" && item !== null && item !== "null";
    }
    if (typeof item === "number") {
        return item >= 1;
    }

    if (Array.isArray(item)) {
        return item.length > 0;
    }

    if (item && typeof item === "object") {
        return Object.keys(item).length > 0;
    }
    return !!isValidElement(item);
}

export function trim(input: string): string {
    // Menggunakan regex untuk menghapus spasi di awal dan akhir string

    return input.replace(/^\s+|\s+$/g, "");
}
