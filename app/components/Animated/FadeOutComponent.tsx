import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, ViewStyle } from "react-native";

const FadeOutComponent = ({
    children,
    style,
    value = 0,
    duration = 1000,
    delay = 0,
}: {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    value?: number;
    duration?: number;
    delay?: number;
}) => {
    const opacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: value,
                    duration: duration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start();
        }, delay);

        return () => clearTimeout(timeout);
    });

    return (
        <Animated.View
            style={[{ opacity: opacity, pointerEvents: "none" }, style]}
        >
            {children}
        </Animated.View>
    );
};

export default FadeOutComponent;
