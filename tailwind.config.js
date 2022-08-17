module.exports = {
    content: ["./src/pages/*.{js,jsx,ts,tsx}", "./src/components/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primaryPink: "#c17aff",
                primaryPurple: "#9e24ff",
                "black-see-through-50": "rgba(0,0,0,0.5)",
            },
        },
    },
    plugins: [
        require('@headlessui/tailwindcss')({prefix: 'ui'}),
    ],
};
