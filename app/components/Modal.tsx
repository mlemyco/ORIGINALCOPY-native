import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import FadeOutComponent from "./Animated/FadeOutComponent";
import WindowOpenComponent from "./Animated/WindowOpenComponent";

const Modal = ({
    modalOpen,
    onClose,
    toWidth,
    toHeight,
    children,
}: {
    modalOpen: boolean;
    onClose: () => void;
    toWidth: number;
    toHeight: number;
    children: React.ReactNode;
}) => {
    return (
        <>
            {modalOpen && (
                <WindowOpenComponent toWidth={toWidth} toHeight={toHeight}>
                    <View
                        style={[
                            styles.modal,
                            {
                                width: toWidth,
                                height: toHeight,
                            },
                        ]}
                    >
                        {children}

                        {/* CLOSE BUTTON */}
                        <View className="absolute top-0 right-0 m-6 text-neutral-400">
                            <Pressable onPress={onClose} hitSlop={10}>
                                <Text className="text-h3">
                                    <Feather
                                        name="x"
                                        size={30}
                                        color={"gray"}
                                    />
                                </Text>
                            </Pressable>
                        </View>

                        {/* FADE IN FROM WHITE */}
                        <FadeOutComponent
                            delay={570}
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "200%",
                                height: "200%",
                                backgroundColor: "white",
                            }}
                        />
                    </View>
                </WindowOpenComponent>
            )}
        </>
    );
};

export default Modal;

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        backgroundColor: "white",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 5px 30px 10px rgba(0, 0, 0, 0.3)",
        paddingVertical: 30,
        paddingHorizontal: 40,
        overflow: "hidden",
        zIndex: 1000,
    },
});
