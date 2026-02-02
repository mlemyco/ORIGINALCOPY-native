import { Text, View } from "react-native";

const LayoutLabel = ({
    imageDimension,
    footerSize = 18,
}: {
    imageDimension?: number;
    footerSize?: number;
}) =>
    //     {
    //     labelText,
    //     barcode,
    // }: {
    //     labelText: string | React.ReactNode;
    //     barcode: string;
    // }
    {
        // const today = new Date();

        return (
            <View
                className={`w-${imageDimension ? `[${imageDimension}px]` : `image`} whitespace-normal leading-tight flex flex-col items-center gap-2`}
            >
                {/* <View className="w-full flex justify-between">
                <p>*****</p>
                <p>{today.toLocaleDateString()}</p>
            </View>

            {typeof labelText === "string" ? <p>{labelText}</p> : labelText}

            <img src={barcode} width={imageDimension} alt="" /> */}

                <View className="text-center">
                    {/* <p className="">tag us in your photos</p> */}
                    <Text
                        // className={`font-mono-normal text-${footerSize || "xl"}`}
                        style={{
                            fontFamily: "JetBrainsMono-Regular",
                            fontSize: footerSize,
                        }}
                    >
                        @ORIGINALCOPYPHOTOBOOTH
                    </Text>
                </View>
            </View>
        );
    };

export default LayoutLabel;
