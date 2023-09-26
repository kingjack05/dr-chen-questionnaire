/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            colors: {
                gray: {
                    100: "#f4f4f4",
                    200: "#e0e0e0",
                    300: "#c6c6c6",
                    400: "#a8a8a8",
                    500: "#8d8d8d",
                    600: "#6f6f6f",
                    800: "#393939",
                },
                red: {
                    600: "#da1e28",
                    800: "#750e13",
                },
                yellow: {
                    500: "#f1c21b",
                },
                green: {
                    500: "#24a148",
                },
                blue: {
                    400: "#78a9ff",
                    500: "#4589ff",
                    600: "#0f62fe",
                    700: "#0043ce",
                    800: "#002d9c",
                },
                purple: {
                    600: "#8a3ffc",
                },
            },
            fontFamily: {
                IBMPlexSans: [
                    "IBM Plex Sans",
                    "Arial",
                    "Helvetica",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [
        function ({ addBase, addComponents, theme }) {
            addBase({
                h1: { fontSize: "54px", lineHeight: "64px", fontWeight: "300" },
                h2: { fontSize: "42px", lineHeight: "48px", fontWeight: "300" },
                h3: { fontSize: "32px", lineHeight: "40px", fontWeight: "400" },
                h4: { fontSize: "28px", lineHeight: "36px", fontWeight: "400" },
                h5: { fontSize: "20px", lineHeight: "28px", fontWeight: "400" },
                h6: { lineHeight: "24px", fontWeight: "600" },
            })
            addComponents({
                ".btn": {
                    backgroundColor: theme("colors.blue.600"),
                    color: "white",
                    border: "0",
                    padding: ".5rem 1rem",
                },
                ".input": {
                    borderBottom: "1px solid #c6c6c6",
                    "&:focus": {
                        borderColor: "#393939",
                        outlineWidth: "0",
                    },
                    "&:disabled": {
                        borderColor: "transparent",
                    },
                },
            })
        },
    ],
}
