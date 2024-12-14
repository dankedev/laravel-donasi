import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { PropsWithChildren } from "react";
import { theme } from "./theme";

export default function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <MantineProvider theme={theme}>
            <Notifications />
            <ModalsProvider>{children}</ModalsProvider>
            {/* <MainSpotlight /> */}
        </MantineProvider>
    );
}
