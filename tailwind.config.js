/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                kitchenYellow: "#FCD600",
            },
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px",
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
