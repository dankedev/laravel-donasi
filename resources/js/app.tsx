import "@mantine/notifications/styles.css";
import "@mantine/spotlight/styles.css";
import "./bootstrap";
// import "../css/tailwind.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/tiptap/styles.css";
import "../css/app.css";

import "@mantine/core/styles.css";

import { createInertiaApp } from "@inertiajs/react";
import { Notifications } from "@mantine/notifications";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import ThemeProvider from "./Components/theme/theme-provider";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob("./Pages/**/*.tsx")),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(
                el,
                <ThemeProvider>
                    <App {...props} />
                    <Notifications />
                </ThemeProvider>
            );
            return;
        }

        createRoot(el).render(
            <ThemeProvider>
                <App {...props} />
                <Notifications />
            </ThemeProvider>
        );
    },
    progress: {
        color: "#4B5563",
        includeCSS: true,
        showSpinner: false,
    },
});
