/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                bgColor: "#575778",
                lightGrey: "rgb(200, 200, 200)",
                darkGrey: "rgb(68, 68, 68)",
                darkerGrey: "rgb(114, 114, 114)",
            },
            fontFamily: {
                bold: ["OTNM-Bold"],
                book: ["OTNM-Book"],
                italic: ["OTNM-Italic"],
                normal: ["OTNM-Medium"],
                semibold: ["OTNM-SemiBold"],
                thin: ["OTNM-Thin"],
                "extra-bold": ["OTNMExtra-Bold"],
                "extra-book": ["OTNMExtra-Book"],
                "extra-italic": ["OTNMExtra-Italic"],
                "extra-normal": ["OTNMExtra-Medium"],
                "extra-semibold": ["OTNMExtra-SemiBold"],
                "extra-thin": ["OTNMExtra-Thin"],
                "semi-bold": ["OTNMSemi-Bold"],
                "semi-book": ["OTNMSemi-Book"],
                "semi-italic": ["OTNMSemi-Italic"],
                "semi-normal": ["OTNMSemi-Medium"],
                "semi-semibold": ["OTNMSemi-SemiBold"],
                "semi-thin": ["OTNMSemi-Thin"],
                "ultra-bold": ["OTNMUltra-Bold"],
                "ultra-book": ["OTNMUltra-Book"],
                "ultra-italic": ["OTNMUltra-Italic"],
                "ultra-normal": ["OTNMUltra-Medium"],
                "ultra-semibold": ["OTNMUltra-SemiBold"],
                "ultra-thin": ["OTNMUltra-Thin"],
                barcode: ["Barcode"],
                "mono-normal": ["JetBrainsMono-Regular"],
                "mono-bold": ["JetBrainsMono-Bold"],
            },
            fontSize: {
                h1: 96,
                h2: 60,
                h3: 36,
                h4: 24,
            },
            width: {
                image: 400,
            },
            height: {
                image: 400,
            },
        },
    },
    plugins: [],
};
