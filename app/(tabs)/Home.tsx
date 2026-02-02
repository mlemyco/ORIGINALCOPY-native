import { Image, StyleSheet, Text, View } from "react-native";
import FadeInComponent from "../components/Animated/FadeInComponent";
import FloatingComponent from "../components/Animated/FloatingComponent";
import RollInComponent from "../components/Animated/RollInComponent";
import Button from "../components/Button";
import Camera from "../components/Camera";
import { useSettingsStore } from "../store/useSettingsStore";

const Home = ({
    isFloating,
    starsVisible,
}: {
    isFloating: boolean;
    starsVisible: boolean;
}) => {
    const { settings } = useSettingsStore();

    return (
        <View className="w-screen h-screen justify-center items-center">
            <View className="w-screen h-screen opacity-35 absolute inset-0">
                <FadeInComponent delay={1000}>
                    <Camera facing={"front"} />
                </FadeInComponent>
            </View>

            {starsVisible && (
                <View className="w-screen h-screen absolute">
                    <RollInComponent distance={700} delay={300}>
                        <FloatingComponent isFloating={isFloating} delay={1000}>
                            <Image
                                source={require("../assets/chrome-star-1.png")}
                                style={[
                                    styles.star,
                                    styles.regularStar,
                                    styles.frontStar1,
                                ]}
                            />
                        </FloatingComponent>
                    </RollInComponent>

                    <RollInComponent distance={-700} delay={500}>
                        <FloatingComponent isFloating={isFloating} delay={1700}>
                            <Image
                                source={require("../assets/chrome-star-2.png")}
                                style={[
                                    styles.star,
                                    styles.regularStar,
                                    styles.frontStar2,
                                ]}
                            />
                        </FloatingComponent>
                    </RollInComponent>
                </View>
            )}

            <View className="fade-in items-center">
                <View className="mb-20 scale-[1.3]">
                    <Text
                        className={`${settings.lightMode ? "text-black" : "text-white"} font-extra-normal text-[120px] -mb-[20px]`}
                    >
                        ORIGINALCOPY
                    </Text>
                    <View className="flex-row justify-between">
                        <Text
                            className={`${settings.lightMode ? "text-black" : "text-white"} text-h3 font-extra-normal w-fit`}
                        >
                            houston&apos;s
                        </Text>
                        <Text
                            className={`${settings.lightMode ? "text-black" : "text-white"}  text-h3 font-extra-normal w-fit`}
                        >
                            receipt photobooth
                        </Text>
                    </View>
                </View>

                <Button
                    navigateOptions={{
                        pathname: "/TakePhoto",
                        params: { rows: 1, cols: 1 },
                    }}
                >
                    START HERE
                </Button>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    star: {
        position: "absolute",
    },
    regularStar: {
        width: 450,
        height: 450,
        resizeMode: "contain",
    },
    frontStar1: {
        right: -150,
        top: 0,
    },
    frontStar2: {
        left: -150,
        top: 725,
    },
});

// const styles = StyleSheet.create({
//     home: {
//         // width: "100%",
//         height: "100%",
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     "background-elements": {
//         width: "100%",
//         height: "100%",
//         position: "absolute",
//         top: 0,
//         left: 0,
//     },
//     //     background-elements {
//     //         width: 100%,
//     //         height: 100%,
//     //         position: absolute,
//     //         top: 0,
//     //         left: 0,
//     //         &::before {
//     //             content: "",
//     //             width: 100%,
//     //             height: 100%,
//     //             display: block,
//     //             position: absolute,
//     //             background-image: url("/src/assets/chrome-star-1.png"),
//     //             background-position: top right -150px,
//     //             background-size: 55%,
//     //             background-repeat: no-repeat,
//     //         }
//     //         &::after {
//     //             content: "",
//     //             width: 100%,
//     //             height: 100%,
//     //             display: block,
//     //             position: absolute,
//     //             background-image: url("/src/assets/chrome-star-2.png"),
//     //             background-position: bottom left -150%,
//     //             background-size: 55%,
//     //             background-repeat: no-repeat,
//     //         }
//     //         &.roll-in {
//     //             &::before {
//     //                 animation-name: rollInLeft,
//     //                 animation-duration: 1s,
//     //                 animation-delay: 0s,
//     //                 animation-timing-function: ease,
//     //                 animation-iteration-count: 1,
//     //             }
//     //             &::after {
//     //                 animation-name: rollInRight,
//     //                 animation-duration: 1s,
//     //                 animation-delay: 0.2s,
//     //                 animation-timing-function: ease,
//     //                 animation-iteration-count: 1,
//     //                 animation-fill-mode: forwards,
//     //             }
//     //         }
//     //         &.roll-in-floating {
//     //             &::before {
//     //                 content: "",
//     //                 animation-name: rollInLeft, floating,
//     //                 animation-duration: 1s, 3s,
//     //                 animation-delay: 0s, 1s,
//     //                 animation-timing-function: ease, ease-in-out,
//     //                 animation-iteration-count: 1, infinite,
//     //             }
//     //             &::after {
//     //                 animation-name: rollInRight, floating,
//     //                 animation-duration: 1s, 3s,
//     //                 animation-delay: 0.2s, 1.7s,
//     //                 animation-timing-function: ease, ease-in-out,
//     //                 animation-iteration-count: 1, infinite,
//     //                 animation-fill-mode: forwards, none,
//     //             }
//     //         }
//     //     }
// });
