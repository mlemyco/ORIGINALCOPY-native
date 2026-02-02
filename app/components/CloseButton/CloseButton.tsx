import { Feather } from "@expo/vector-icons";
import { Pressable } from "react-native";

const CloseButton = ({ closeFn }: { closeFn: () => void }) => {
    return (
        <Pressable
            onPress={closeFn}
            className="rounded-full bg-gray-300 size-8 flex justify-center items-center absolute -right-2 -top-2 p-2"
        >
            {/* <i className="fa-solid fa-xmark"></i> */}
            <Feather name="x" />
        </Pressable>
    );
};

export default CloseButton;
