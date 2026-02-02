import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet } from "react-native";

const WindowOpenComponent = ({
    children,
    toWidth = 1,
    toHeight = 1,
    delay = 0,
}: {
    children: React.ReactNode;
    toWidth?: number;
    toHeight?: number;
    duration?: number;
    delay?: number;
}) => {
    const scaleX = useRef(new Animated.Value(0)).current;
    const scaleY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            scaleY.setValue(0.1);

            Animated.sequence([
                Animated.timing(scaleX, {
                    toValue: 1,
                    duration: 250,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleY, {
                    toValue: 1,
                    duration: 500,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start();
        }, delay);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <Animated.View
            style={{
                // ...StyleSheet.absoluteFillObject,
                position: "absolute",
                top: "50%",
                left: "50%",
                width: toWidth,
                height: toHeight,
                // paddingVertical: 30,
                // paddingHorizontal: 40,
                transform: [
                    { translateX: "-50%" },
                    { translateY: "-50%" },
                    { scaleX },
                    { scaleY },
                ],
                zIndex: 750,
            }}
        >
            {children}
        </Animated.View>
    );
};

export default WindowOpenComponent;

const styles = StyleSheet.create({});
