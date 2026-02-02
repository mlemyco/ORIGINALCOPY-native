import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

const RollInComponent = ({
    children,
    distance,
    duration = 1200,
    delay = 0,
}: {
    children: React.ReactNode;
    distance: number;
    duration?: number;
    delay?: number;
}) => {
    const positionX = useRef(new Animated.Value(distance)).current;

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.sequence([
                Animated.timing(positionX, {
                    toValue: 0,
                    duration: duration,
                    easing: Easing.out(Easing.cubic),
                    useNativeDriver: true,
                }),
            ]).start();
        }, delay);

        return () => clearTimeout(timeout);
    });

    return (
        <Animated.View style={{ transform: [{ translateX: positionX }] }}>
            {children}
        </Animated.View>
    );
};

export default RollInComponent;
