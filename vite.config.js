import MillionLint from "@million/lint";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            // ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        MillionLint.vite({ auto: true }),
        react(),
        tailwindcss(),
    ],
});
