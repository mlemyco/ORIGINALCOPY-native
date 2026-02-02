import React from "react";
import { View } from "react-native";

const GrayscaleComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    inset: 0,
                    mixBlendMode: "saturation",
                }}
            ></View>
        </>
    );
};

export default GrayscaleComponent;
