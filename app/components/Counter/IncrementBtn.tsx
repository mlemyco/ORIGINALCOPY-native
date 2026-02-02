import { Pressable, StyleProp, Text, ViewStyle } from "react-native";

const IncrementBtn = ({
    children,
    onPress,
    disabled,
    style,
}: {
    children?: React.ReactNode;
    onPress?: () => void;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            className="rounded-full justify-center items-center"
            style={[
                {
                    width: 50,
                    height: 50,
                    marginHorizontal: 20,
                    marginVertical: 10,
                    backgroundColor: disabled ? "#c8c8c8" : "#575778",
                },
                style,
            ]}
        >
            <Text
                className="font-mono-normal text-h4"
                style={{
                    color: disabled ? "black" : "white",
                    marginTop: -2,
                }}
            >
                {children}
            </Text>
        </Pressable>
    );
};

export default IncrementBtn;
