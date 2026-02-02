import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

const FloatingComponent = ({
    children,
    isFloating = true,
    distance = 30,
    duration = 1500,
    delay = 0,
}: {
    children: React.ReactNode;
    isFloating?: boolean;
    distance?: number;
    duration?: number;
    delay?: number;
}) => {
    const positionY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(positionY, {
                        toValue: -distance,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                    Animated.timing(positionY, {
                        toValue: 0,
                        duration: duration,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        }, delay);

        return () => clearTimeout(timeout);
    });

    return isFloating ? (
        <Animated.View style={{ transform: [{ translateY: positionY }] }}>
            {children}
        </Animated.View>
    ) : (
        <View>{children}</View>
    );
};

export default FloatingComponent;
