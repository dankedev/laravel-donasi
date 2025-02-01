import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
import { themeConfig } from "./theme-config";

export default function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <MantineProvider theme={themeConfig} withCssVariables withGlobalClasses>
            <ModalsProvider>{children}</ModalsProvider>
            <Notifications />
        </MantineProvider>
    );
}
