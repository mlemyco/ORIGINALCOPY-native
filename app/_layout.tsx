import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono/400Regular";
import { JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono/700Bold";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Settings from "./components/Settings/Settings";
import "./globals.css";
import { useSettingsStore } from "./store/useSettingsStore";

export default function RootLayout() {
    const { settings } = useSettingsStore();
    const [fontsLoaded] = useFonts({
        "JetBrainsMono-Regular": JetBrainsMono_400Regular,
        "JetBrainsMono-Bold": JetBrainsMono_700Bold,
        Barcode: require("./assets/fonts/barcode_font/BarcodeFont.ttf"),
        "OTNM-Bold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BoldSqueezed.otf"),
        "OTNM-Book": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BookSqueezed.otf"),
        "OTNM-Italic": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ItalicSqueezed.otf"),
        "OTNM-Medium": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-MediumSqueezed.otf"),
        "OTNM-SemiBold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-SemiBoldSqueezed.otf"),
        "OTNM-Thin": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ThinSqueezed.otf"),
        "OTNMExtra-Bold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BoldExtraSqueezed.otf"),
        "OTNMExtra-Book": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BookExtraSqueezed.otf"),
        "OTNMExtra-Italic": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ItalicExtraSqueezed.otf"),
        "OTNMExtra-Medium": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-MediumExtraSqueezed.otf"),
        "OTNMExtra-SemiBold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-SemiBoldExtraSqueezed.otf"),
        "OTNMExtra-Thin": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ThinExtraSqueezed.otf"),
        "OTNMSemi-Bold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BoldSemiSqueezed.otf"),
        "OTNMSemi-Book": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BookSemiSqueezed.otf"),
        "OTNMSemi-Italic": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ItalicSemiSqueezed.otf"),
        "OTNMSemi-Medium": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-MediumSemiSqueezed.otf"),
        "OTNMSemi-SemiBold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-SemiBoldSemiSqueezed.otf"),
        "OTNMSemi-Thin": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ThinSemiSqueezed.otf"),
        "OTNMUltra-Bold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BoldUltraSqueezed.otf"),
        "OTNMUltra-Book": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-BookUltraSqueezed.otf"),
        "OTNMUltra-Italic": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ItalicUltraSqueezed.otf"),
        "OTNMUltra-Medium": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-MediumUltraSqueezed.otf"),
        "OTNMUltra-SemiBold": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-SemiBoldUltraSqueezed.otf"),
        "OTNMUltra-Thin": require("./assets/fonts/OT_Neue_Montreal/OTNeueMontreal-ThinUltraSqueezed.otf"),
    });

    if (!fontsLoaded) return null;

    return (
        <View
            className={`w-screen h-screen ${settings.lightMode ? "bg-white" : "bg-bgColor"}`}
        >
            <Image
                source={require("./assets/chrome-star-1.png")}
                style={[styles.star, styles.bigStar, styles.star1]}
            />
            <Image
                source={require("./assets/chrome-star-1.png")}
                style={[styles.star, styles.bigStar, styles.star2]}
            />
            <Image
                source={require("./assets/chrome-star-2.png")}
                style={[styles.star, styles.bigStar, styles.star3]}
            />
            <Image
                source={require("./assets/chrome-star-2.png")}
                style={[styles.star, styles.bigStar, styles.star4]}
            />

            <BlurView
                intensity={90}
                tint="systemUltraThinMaterialDark"
                style={StyleSheet.absoluteFill}
            />

            <Image
                source={require("./assets/grain.png")}
                className="absolute w-screen h-screen opacity-[0.1] pointer-events-none"
            />

            <Stack
                screenOptions={{
                    headerShown: false,
                    animation: "none",
                    contentStyle: { backgroundColor: "transparent" },
                }}
            />

            <Settings />
        </View>
    );
}

const styles = StyleSheet.create({
    star: {
        position: "absolute",
    },
    bigStar: {
        width: 500,
        height: 500,
        resizeMode: "contain",
    },
    star1: {
        top: -180,
        left: -150,
    },
    star2: {
        right: -25,
        top: 140,
    },
    star3: {
        bottom: 50,
        left: -50,
    },
    star4: {
        bottom: -150,
        right: -150,
    },
});
