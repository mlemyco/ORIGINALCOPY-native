import { BlurView } from "expo-blur";
import { Href, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";
import { useSettingsStore } from "../store/useSettingsStore";

type ButtonProps = {
    navigateOptions?: Href;
    handlePressFn?: () => void;
    isPurple?: boolean;
    children: React.ReactNode;
};

const Button = ({
    navigateOptions,
    handlePressFn,
    isPurple = false,
    children,
}: ButtonProps) => {
    const { settings } = useSettingsStore();

    const router = useRouter();

    const handlePress = () => {
        if (navigateOptions) {
            router.push(navigateOptions);
        } else if (handlePressFn) {
            handlePressFn();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            className={`rounded-full overflow-hidden ${isPurple ? "bg-bgColor" : settings.lightMode ? "bg-white/30 border border-black" : "bg-white/10 border border-white/30"}`}
        >
            <BlurView intensity={20} className="px-[28] py-[12]">
                <Text
                    className={`font-bold text-4xl text-${isPurple ? "white" : settings.lightMode ? "black" : "white"}`}
                >
                    {children}
                </Text>
            </BlurView>
        </Pressable>
    );
};

export default Button;
