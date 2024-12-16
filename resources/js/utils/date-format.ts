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
