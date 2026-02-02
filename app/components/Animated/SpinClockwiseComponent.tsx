import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const SpinClockwiseComponent = ({
    children,
    startSpin,
    duration = 1000,
    delay = 0,
}: {
    children: React.ReactNode;
    startSpin: boolean;
    duration?: number;
    delay?: number;
}) => {
    const rotate = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (startSpin) {
            const timeout = setTimeout(() => {
                Animated.sequence([
                    Animated.timing(rotate, {
                        toValue: 1,
                        duration: duration,
                        easing: Easing.out(Easing.cubic),
                        useNativeDriver: true,
                    }),
                ]).start();
            }, delay);

            rotate.resetAnimation();

            return () => clearTimeout(timeout);
        }
    }, [startSpin]);

    const rotateInterpolate = rotate.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
            {children}
        </Animated.View>
    );
};

export default SpinClockwiseComponent;

const styles = StyleSheet.create({});
