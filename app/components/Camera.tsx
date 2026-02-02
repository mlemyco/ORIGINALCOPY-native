import { CameraView, useCameraPermissions } from "expo-camera";
import { Text, View } from "react-native";
import Button from "./Button";
import GrayscaleComponent from "./GrayscaleComponent";

const Camera = ({
    facing,
    cameraRef,
}: {
    facing: "front" | "back";
    cameraRef?: React.RefObject<CameraView | null>;
}) => {
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        // Camera permissions are still loading.
        return (
            <View>
                <Text>Loading camera...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View className="w-screen h-screen justify-center items-center">
                <Text>We need your permission to show the camera</Text>
                <Button handlePressFn={requestPermission}>
                    grant permission
                </Button>
            </View>
        );
    }

    return (
        <>
            <GrayscaleComponent>
                <CameraView
                    ref={cameraRef}
                    facing={facing}
                    style={{ width: "100%", height: "100%" }}
                />
            </GrayscaleComponent>
        </>
    );
};

export default Camera;
