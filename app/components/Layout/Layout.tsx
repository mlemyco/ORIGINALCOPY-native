import { CameraView } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, View } from "react-native";
import FadeInComponent from "../Animated/FadeInComponent";
import Camera from "../Camera";
import GrayscaleComponent from "../GrayscaleComponent";
import LayoutLabel from "./LayoutLabel";
// import WebcamComponent from "../Webcam/WebcamComponent";
// import type Webcam from "react-webcam";

const Layout = ({
    dimensions = [1, 1],
    imageDimension = 400,
    cameraRef,
    printImageRef,
    images,
    indexOfPic,
    isSelected = false,
    slideDown = false,
}: // headingText = "ORIGINALCOPY",
// headingImg = "",
// labelText = "YOU ARE ONE OF A KIND",
{
    dimensions: [number, number]; // [rows, columns]
    imageDimension?: number;
    cameraRef?: React.RefObject<CameraView | null>;
    printImageRef?: React.RefObject<View | null>;
    images?: string[];
    indexOfPic?: number;
    headingText?: string | React.ReactNode;
    headingImg?: string;
    labelText?: string | React.ReactNode;
    isSelected?: boolean;
    slideDown?: boolean;
}) => {
    const scaleFactor = 1.75;
    const imagesGrid: React.ReactNode[] = [];
    // const imageDimension = 400;

    // generate image grid for layout
    for (let i = 0; i < dimensions[0]; i++) {
        const row: React.ReactNode[] = [];
        for (let j = 0; j < dimensions[1]; j++) {
            row.push(
                <View
                    key={`${i}-${j}`}
                    style={{ width: imageDimension, height: imageDimension }}
                    // className={`w-[${imageDimension}px] h-[${imageDimension}px]`}
                >
                    {images && images[i * dimensions[1] + j] ? (
                        <FadeInComponent duration={1000}>
                            <GrayscaleComponent>
                                <Image
                                    style={{
                                        width: imageDimension,
                                        height: imageDimension,
                                        objectFit: "cover",
                                        transform: [{ scaleX: -1 }],
                                    }}
                                    source={{
                                        uri: images[i * dimensions[1] + j],
                                    }}
                                />
                            </GrayscaleComponent>
                        </FadeInComponent>
                    ) : cameraRef ? (
                        <Camera cameraRef={cameraRef} facing="front" />
                    ) : (
                        <Image
                            source={require("../../assets/silver-background.png")}
                            style={{
                                width: imageDimension,
                                height: imageDimension,
                            }}
                        />
                    )}
                </View>,
            );
        }
        imagesGrid.push(
            <View key={i} className="flex gap-3">
                {row}
            </View>,
        );
    }

    const [newTranslateY, setNewTranslateY] = useState(0);
    const [newTranslateX, setNewTranslateX] = useState(0);

    // pan and zoom in on individual picture for taking
    useEffect(() => {
        if (
            indexOfPic === undefined ||
            indexOfPic >= dimensions[0] * dimensions[1]
        ) {
            setNewTranslateX(0);
            setNewTranslateY(0);
            return;
        }

        const numCols = dimensions[1];
        const numRows = dimensions[0];

        const hasCenterX = numCols % 2 !== 0; // has center x if number of columns is odd
        let centerXIdx = (numCols - 1) / 2; // e.g. 5 cols = (5-1)/2 = col of index 2
        const centerYIdx = (numRows - 1) / 2;

        const yDifferenceFromCenter =
            centerYIdx - Math.floor(indexOfPic / numCols); // center index - current row index
        const newTranslateY =
            scaleFactor * (yDifferenceFromCenter * (imageDimension + 12) + 15); // center vertically with 12px gap, 250px image height, 75px for heading height
        setNewTranslateY(newTranslateY);

        if (hasCenterX) {
            centerXIdx = Math.floor((numCols - 1) / 2);
            if (indexOfPic % numCols === centerXIdx) {
                setNewTranslateX(0);
                return;
            }
        }
        const xDifferenceFromCenter = centerXIdx - (indexOfPic % numCols);
        const newTranslateX =
            scaleFactor * (xDifferenceFromCenter * (imageDimension + 12)); // center horizontally with 12px gap, 250px image width
        setNewTranslateX(newTranslateX);
    }, [indexOfPic, dimensions, imageDimension]);

    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const zoomAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (slideDown) {
            const timeout = setTimeout(() => {
                setNewTranslateY(650);
            }, 200);

            return () => clearTimeout(timeout);
        }
    }, [slideDown]);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(translateX, {
                toValue: newTranslateX,
                duration: 1000,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [newTranslateX, translateX]);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(translateY, {
                toValue: newTranslateY,
                duration: 1000,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [newTranslateY, translateY]);

    useEffect(() => {
        Animated.sequence([
            Animated.timing(zoomAnim, {
                toValue: indexOfPic !== undefined ? scaleFactor : 1,
                duration: 1100,
                easing: Easing.inOut(Easing.cubic),
                useNativeDriver: true,
            }),
        ]).start();
    }, [scaleFactor, indexOfPic, zoomAnim]);

    return (
        <Animated.View
            ref={printImageRef}
            style={[
                styles.layout,
                {
                    paddingTop: Math.round(imageDimension * 0.175),
                    paddingBottom: Math.round(imageDimension * 0.0375),
                    paddingHorizontal: Math.round(imageDimension * 0.0375),
                },
                isSelected && styles.selectedLayout,
                {
                    transform: [
                        { translateX },
                        { translateY },
                        {
                            scale: zoomAnim,
                        },
                    ],
                    position: indexOfPic !== undefined ? "absolute" : "static",
                },
            ]}
        >
            {/* <View className="mb-3">
                {typeof headingText === "string" && !headingImg ? (
                    <h4>{headingText}</h4>
                ) : headingImg ? (
                    <View className="relative h-9 w-full">
                        <img
                            src={headingImg}
                            alt=""
                            className="h-full mx-auto grayscale"
                        />
                    </View>
                ) : (
                    headingText
                )}
            </View> */}

            <View
                style={{
                    gap: 12,
                    marginBottom: Math.round(imageDimension * 0.1),
                }}
            >
                {imagesGrid}
            </View>

            <LayoutLabel
                imageDimension={imageDimension}
                footerSize={Math.round(imageDimension * 0.045)}
                // labelText={labelText}
                // barcode={
                //     "https://static.vecteezy.com/system/resources/previews/048/230/807/non_2x/barcode-black-color-for-payment-vector.jpg"
                // }
            />
        </Animated.View>
    );
};

export default Layout;

const styles = StyleSheet.create({
    layout: {
        backgroundColor: "white",
    },
    selectedLayout: {
        boxShadow: "0 15px 20px 0 rgba(0, 0, 0, 0.5)",
    },
});
