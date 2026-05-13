import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../Button";
import Modal from "../Modal";

const OrderNumberModal = ({
    modalOpen,
    setModalOpen,
}: {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();

    const [orderNumber, setOrderNumber] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const checkOrderNumber = (newOrderNumber: string) => {
        setOrderNumber(newOrderNumber);

        if (newOrderNumber.length === 0) {
            setStatus("");
        }
    };

    const validateOrderNumber = () => {
        const letters = orderNumber.match(/[A-Za-z]/g)?.length || 0;
        const numbers = orderNumber.match(/\d/g)?.length || 0;

        const matches = letters === 3 && numbers === 3;

        if (!matches) {
            setStatus("order number invalid");
            return false;
        }

        setStatus("");
        router.push({
            pathname: "/TakePhoto",
            params: { rows: 1, cols: 1 },
        });
        return true;
    };

    return (
        <Modal
            modalOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            toWidth={500}
            toHeight={250}
        >
            <View className="h-full items-center justify-center gap-2">
                {status && (
                    <Text className="font-mono-bold text-red-600 text-lg">
                        * {status} *
                    </Text>
                )}

                <TextInput
                    maxLength={6}
                    className="font-mono-normal w-[300px] bg-neutral-300 py-[10px] text-center rounded-full mb-2"
                    placeholder="Enter order number..."
                    onChangeText={checkOrderNumber}
                />

                <Button isPurple handlePressFn={validateOrderNumber}>
                    CONFIRM
                </Button>
            </View>
        </Modal>
    );
};

export default OrderNumberModal;

const styles = StyleSheet.create({});
