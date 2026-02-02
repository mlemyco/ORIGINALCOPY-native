import { Text, View } from "react-native";
import IncrementBtn from "./IncrementBtn";

const Counter = ({
    min,
    max,
    count,
    setCount,
}: {
    min: number;
    max: number;
    count: number;
    setCount: (count: number) => void;
}) => {
    return (
        <View className="flex-row justify-center items-center">
            <IncrementBtn
                onPress={() => setCount(Math.max(min, count - 1))}
                disabled={count <= min}
            >
                -
            </IncrementBtn>

            <Text className="font-mono-normal text-h4">{count}</Text>

            <IncrementBtn
                onPress={() => setCount(Math.min(max, count + 1))}
                disabled={count >= max}
            >
                +
            </IncrementBtn>
        </View>
    );
};

export default Counter;
