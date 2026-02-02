import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const FadeInComponent = ({
    children,
    value = 1,
    duration = 1000,
    delay = 0,
}: {
    children: React.ReactNode;
    value?: number;
    duration?: number;
    delay?: number;
}) => {
    const opacity = useRef(new Animated.Value(0)).current;

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
        <Animated.View style={{ opacity: opacity }}>{children}</Animated.View>
    );
};

export default FadeInComponent;
