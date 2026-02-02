import { useSettingsStore } from "@/app/store/useSettingsStore";
import { useState } from "react";
import { LayoutChangeEvent, Text } from "react-native";

const AutoFitLine = ({
    children,
    fitWidth,
    baseFontSize = 20,
}: {
    children: React.ReactNode;
    fitWidth: number;
    baseFontSize?: number;
}) => {
    const { settings } = useSettingsStore();

    const [fontSize, setFontSize] = useState(baseFontSize);
    const [measured, setMeasured] = useState(false);

    const onTextLayout = (e: LayoutChangeEvent) => {
        if (measured || fitWidth === 0) return;

        const textWidth = e.nativeEvent.layout.width;
        if (textWidth === 0) return;

        const scale = fitWidth / textWidth;
        const nextFontSize = Math.floor(baseFontSize * scale);

        setFontSize(nextFontSize);
        setMeasured(true);
    };

    return (
        <Text
            onLayout={onTextLayout}
            numberOfLines={1}
            // adjustsFontSizeToFit
            // minimumFontScale={minFontSize / maxFontSize}
            className={`text-center text-${settings.lightMode ? "black" : "white"} font-extra-normal uppercase`}
            style={{
                fontSize: fontSize,
                lineHeight: fontSize,
                marginBottom: -fontSize * 0.2,
            }}
        >
            {children}
        </Text>
    );
};

export default AutoFitLine;
