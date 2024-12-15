import { themeConfig } from "@/Components/theme/theme-config";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";

export default function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <MantineProvider theme={themeConfig} withCssVariables withGlobalClasses>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
            {/* <MainSpotlight /> */}
        </MantineProvider>
    );
}
