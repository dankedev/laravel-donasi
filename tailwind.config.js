// import forms from "@tailwindcss/forms";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "selector",

    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/components/campaign-editor/**/*.{tsx,ts}",
        "./resources/js/components/layout/**/*.{tsx,ts}",
        "./resources/js/components/**/*.{tsx,ts}",
        "./resources/js/**/*.{tsx,ts}",
        "./resources/js/**/**/*.{tsx,ts}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: [...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [],
};
