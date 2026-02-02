import { CameraView } from "expo-camera";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import FadeInComponent from "../components/Animated/FadeInComponent";
import FadeOutComponent from "../components/Animated/FadeOutComponent";
import WindowOpenComponent from "../components/Animated/WindowOpenComponent";
import AutoFitLines from "../components/AutoFitLines/AutoFitLines";
import Button from "../components/Button";
import Counter from "../components/Counter/Counter";
import Layout from "../components/Layout/Layout";
import { printPhoto } from "../services/printService";
import { useSettingsStore } from "../store/useSettingsStore";

export default function TakePhoto({
    // countdownValue,
    // headingText,
    headingImg,
    // labelText,
    // maxCopies,
}: {
    countdownValue: number;
    headingText: string;
    headingImg: string;
    labelText: string;
    maxCopies: number;
}) {
    const { settings } = useSettingsStore();
    const countdownValue = settings.countdownValue;
    const headingText = settings.logoText;
    const labelText = settings.labelText;
    const maxCopies = settings.maxCopies;

    const router = useRouter();

    const contentWidth = 650;

    const { rows, cols } = useLocalSearchParams<{
        rows?: string;
        cols?: string;
    }>();

    const cameraRef = useRef<CameraView>(null);

    const [isCounting, setIsCounting] = useState(false);
    const [countdown, setCountdown] = useState(countdownValue);
    const [allPhotosTaken, setAllPhotosTaken] = useState(false);
    const [isSelectingPrints, setIsSelectingPrints] = useState(false);
    const [isTaking, setIsTaking] = useState(false);
    const [takingPhotoIdx, setTakingPhotoIdx] = useState<number | undefined>();
    const [finalImages, setFinalImages] = useState<string[]>([]);
    const [copiesToPrint, setCopiesToPrint] = useState(1);
    const [slideDown, setSlideDown] = useState(false);
    const [isPrinting, setIsPrinting] = useState(false);
    const [donePrinting, setDonePrinting] = useState(false);
    const [imageToPrint, setImageToPrint] = useState("");

    function startCountdown() {
        setIsCounting(true);
        setCountdown(countdownValue);

        return new Promise<void>((resolve) => {
            let counter = countdownValue;
            const interval = setInterval(() => {
                if (counter > 1) {
                    counter--;
                    setCountdown(counter);
                } else {
                    clearInterval(interval);
                    setIsCounting(false);
                    resolve();
                }
            }, 1000);
        });
    }

    async function takeAllPhotos() {
        const total = Number(rows) * Number(cols);

        for (let i = 0; i < total; i++) {
            setTakingPhotoIdx(i);

            await new Promise((resolve) => setTimeout(resolve, 1100));
            setIsTaking(true);

            await startCountdown(); // countdown to take photo

            // take photo
            const photo = await cameraRef.current?.takePictureAsync();
            const dataUrl = photo?.uri;
            if (!dataUrl) return;

            setImageToPrint(dataUrl);
            setFinalImages((prevFinalImages) => [...prevFinalImages, dataUrl]);

            await new Promise((resolve) => setTimeout(resolve, 1500)); // let audience see the taken photo
        }

        await new Promise((resolve) => setTimeout(resolve, 1000)); // wait to transition to final images

        setIsTaking(false);
        setAllPhotosTaken(true);
        setTakingPhotoIdx(undefined);
    }

    function retakePhotos() {
        setFinalImages([]);
        setAllPhotosTaken(false);
        setCountdown(countdownValue);
    }

    function selectPrints() {
        setIsSelectingPrints(true);
    }

    async function getImageToPrint() {
        // if (!printImageRef.current) return;

        // const canvas = await html2canvas(printImageRef.current);
        // const imgDataUrl = canvas.toDataURL("image/png");
        const imgDataUrl = imageToPrint;

        return imgDataUrl;
    }

    function printCopies() {
        setIsSelectingPrints(false);
        setSlideDown(true);
        setIsPrinting(true);

        getImageToPrint().then((imgDataUrl) => {
            if (!imgDataUrl) return;

            console.log("imgDataUrl:", imgDataUrl);
            printPhoto(imgDataUrl, copiesToPrint);
        });

        // console.log("PRINTING", copiesToPrint, imageToPrint);

        setTimeout(() => {
            setIsPrinting(false);
            setDonePrinting(true);
        }, 2000);
    }

    return (
        <View className="w-screen h-screen justify-center items-center gap-5">
            <Text
                className={`font-normal text-h3 text-${settings.lightMode ? "black" : "white"} ${slideDown ? "opacity-0" : ""}`}
            >
                {allPhotosTaken ? "all done!" : "get ready!"}
            </Text>

            <View className="size-[650px] justify-center items-center">
                {donePrinting && (
                    <FadeInComponent duration={1500}>
                        <AutoFitLines
                            containerWidth={contentWidth}
                            lines={[
                                "TAKE YOUR",
                                "ORIGINALCOPY",
                                "RECEIPT BELOW",
                            ]}
                        />
                    </FadeInComponent>
                )}
            </View>

            {!donePrinting && (
                <View
                    className={`absolute z-[5] justify-center items-center ${
                        slideDown ? "overflow-hidden" : ""
                    }`}
                >
                    <Layout
                        dimensions={[Number(rows), Number(cols)]}
                        images={finalImages}
                        headingText={headingText}
                        headingImg={headingImg}
                        labelText={labelText}
                        cameraRef={cameraRef}
                        indexOfPic={takingPhotoIdx}
                        isSelected={true}
                        slideDown={slideDown}
                    />
                </View>
            )}

            {allPhotosTaken && !(isPrinting && donePrinting) ? (
                <>
                    <View
                        className={`flex-row gap-4 ${slideDown ? "opacity-0" : ""}`}
                    >
                        <Button handlePressFn={selectPrints}>PRINT</Button>
                        <Button handlePressFn={retakePhotos}>RETAKE</Button>
                    </View>
                    {donePrinting && (
                        <FadeInComponent duration={1500}>
                            <Button
                                handlePressFn={() => {
                                    router.dismissAll();
                                    router.replace("/");
                                }}
                            >
                                FINISH
                            </Button>
                        </FadeInComponent>
                    )}
                </>
            ) : (
                <>
                    {isCounting && (
                        <View className="absolute justify-center items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[150px] border border-white rounded-full z-[6]">
                            <Text className="text-h1 text-white font-normal">
                                {countdown}
                            </Text>
                        </View>
                    )}
                    {!isTaking && (
                        <Button handlePressFn={takeAllPhotos}>
                            TAKE PHOTO
                        </Button>
                    )}
                </>
            )}

            {isSelectingPrints && (
                <WindowOpenComponent toWidth={375} toHeight={250}>
                    <View style={styles.modal}>
                        <Counter
                            min={1}
                            max={maxCopies}
                            count={copiesToPrint}
                            setCount={setCopiesToPrint}
                        />
                        <View className="flex-row gap-4">
                            <Button
                                isPurple
                                handlePressFn={() =>
                                    setIsSelectingPrints(false)
                                }
                            >
                                CANCEL
                            </Button>
                            <Button isPurple handlePressFn={printCopies}>
                                PRINT
                            </Button>
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
                // <Modal visible={isSelectingPrints} transparent>
                //     <View style={styles.modal}>
                //         <Counter
                //             min={1}
                //             max={maxCopies}
                //             count={copiesToPrint}
                //             setCount={setCopiesToPrint}
                //         />
                //         <View className="flex-row gap-4">
                //             <Button
                //                 isPurple
                //                 handlePressFn={() =>
                //                     setIsSelectingPrints(false)
                //                 }
                //             >
                //                 CANCEL
                //             </Button>
                //             <Button isPurple handlePressFn={printCopies}>
                //                 PRINT
                //             </Button>
                //         </View>
                //     </View>
                // </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: "center",
        alignItems: "center",
        rowGap: 20,
        backgroundColor: "white",
        borderRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 40,
        overflow: "hidden",
        zIndex: 1000,
    },
});
