module.exports = {
    content: ["./src/pages/*.{js,jsx,ts,tsx}", "./src/components/*.{js,jsx,ts,tsx}", "./src/classes/*.{js,jsx,ts,tsx}",
        "./projects/**/*"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primaryPink: "#c17aff", // TODO remove
                primaryPurple: "#9e24ff", // TODO remove
                "primary-pink": "#c17aff",
                "primary-purple": "#9e24ff",
                "black-transparent-1/4": "rgba(0,0,0,0.25)",
                "black-transparent-1/2": "rgba(0,0,0,0.5)",
                "black-transparent-3/4": "rgba(0,0,0,0.75)",
                "white-transparent-1/2": "rgba(255,255,255,0.5)",
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
    ],
};
