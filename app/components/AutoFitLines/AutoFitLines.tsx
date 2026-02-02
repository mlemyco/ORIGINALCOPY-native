import { View } from "react-native";
import AutoFitLine from "./AutoFitLine/AutoFitLine";

const AutoFitLines = ({
    containerWidth,
    lines,
}: {
    containerWidth: number;
    lines: string[];
}) => {
    return (
        <View className="items-center" style={{ width: containerWidth }}>
            {lines.map((line, index) => (
                <AutoFitLine key={index} fitWidth={containerWidth}>
                    {line}
                </AutoFitLine>
            ))}
        </View>
    );
};

export default AutoFitLines;
