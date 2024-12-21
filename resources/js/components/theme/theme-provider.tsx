import { themeConfig } from "@/components/theme/theme-config";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { lazy, memo, PropsWithChildren, Suspense } from "react";

const MemoizedNotifications = memo(Notifications);
MemoizedNotifications.displayName = "MemoizedNotifications";

const LazyModalsProvider = lazy(() =>
    import("@mantine/modals").then((mod) => ({
        default: mod.ModalsProvider,
    }))
);

const MemoizedProvider = memo(({ children }: PropsWithChildren) => (
    <MantineProvider theme={themeConfig} withCssVariables withGlobalClasses withStaticClasses>
        <MemoizedNotifications />
        <Suspense>
            <LazyModalsProvider>{children}</LazyModalsProvider>
        </Suspense>
    </MantineProvider>
));
MemoizedProvider.displayName = "MemoizedProvider";

export default function ThemeProvider({ children }: PropsWithChildren) {
    return <MemoizedProvider>{children}</MemoizedProvider>;
}
