import { DateInputProps } from "@mantine/dates";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
// require("dayjs/locale/id");
dayjs.locale("id");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);

export function toISODateString(d: string | Date) {
    const date = new Date(d);
    return dayjs(date).format("YYYY-MM-DDTHH:mm:ss") + "Z";
}
export function dateFormat(d?: string | Date, format?: string) {
    const date = d ? toISODateString(d) : dayjs();
    return dayjs
        .tz(date, "Asia/Jakarta")
        .utc()
        .format(format ?? "DD, MMM YYYY");
}

export function dateDayFormat(d?: string | Date | null, format?: string) {
    const date = d ? toISODateString(d) : dayjs();
    return (
        dayjs(date)
            // .tz(date, "Asia/Jakarta")
            // .utc()
            .format(format ?? "DD, MMM YYYY")
    );
}
export function utcDateTime(d?: string | Date) {
    return dayjs.tz(d, "Asia/Jakarta").utc().format();
}

export const dateInputParser: DateInputProps["dateParser"] = (input) => {
    if (input === "WW2") {
        return new Date(1939, 8, 1);
    }

    return dayjs(input, "DD/MM/YYYY").toDate();
};

export function formatDateDifference(akhir?: Date): string {
    const now = new Date();
    const target = akhir ? new Date(akhir) : new Date();
    // Jika tanggal belum dimulai

    if (!akhir || akhir === null || akhir === undefined) {
        return "Belum dimulai";
    }

    // Jika tanggal sudah lewat

    if (target < now) {
        return "sudah berakhir";
    }

    // Jika tanggal sama dengan hari ini

    if (target.toDateString() === now.toDateString()) {
        return "hari ini";
    }

    // Menghitung selisih waktu

    const years = target.getFullYear() - now.getFullYear();

    const months = target.getMonth() - now.getMonth();

    const days = target.getDate() - now.getDate();

    // Menghitung total bulan dan hari

    let totalMonths = years * 12 + months;

    let totalDays = days;

    // Jika hari negatif, kurangi satu bulan dan tambahkan hari dari bulan sebelumnya

    if (totalDays < 0) {
        totalMonths -= 1;

        const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);

        totalDays += lastMonth.getDate(); // Menambahkan jumlah hari dari bulan sebelumnya
    }

    // Menghitung tahun dan bulan

    const finalYears = Math.floor(totalMonths / 12);

    const finalMonths = totalMonths % 12;

    // Mengembalikan string sesuai dengan kondisi

    if (finalYears > 0) {
        return `${finalYears} tahun, ${finalMonths} bulan lagi`;
    } else if (totalMonths > 0) {
        return `${totalMonths} bulan, ${totalDays} hari lagi`;
    } else {
        return `${totalDays} hari lagi`;
    }
}

// Contoh penggunaan
// const futureDate = new Date('2025-12-31');
// const pastDate = new Date('2020-01-01');
// const currentDate = new Date(); // Tanggal saat ini

// console.log(formatDateDifference(futureDate)); // Output: "1 tahun, 0 bulan lagi" (atau sesuai dengan tanggal saat ini)
// console.log(formatDateDifference(pastDate));   // Output: "sudah berakhir"
// console.log(formatDateDifference(currentDate)); // Output: "belum dimulai"
