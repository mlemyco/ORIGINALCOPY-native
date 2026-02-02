import { defaultSettings } from "@/app/config/defaults";
import { useSettingsStore } from "@/app/store/useSettingsStore";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    View,
} from "react-native";
import FadeOutComponent from "../Animated/FadeOutComponent";
import SpinClockwiseComponent from "../Animated/SpinClockwiseComponent";
import WindowOpenComponent from "../Animated/WindowOpenComponent";
import Button from "../Button";
import CloseButton from "../CloseButton/CloseButton";
import Layout from "../Layout/Layout";

const Settings = () => {
    const SETTINGS_PASSWORD = process.env.EXPO_PUBLIC_SETTINGS_PASSWORD;

    const settingsStore = useSettingsStore();
    const settings = settingsStore.settings;
    const setSettings = settingsStore.updateSettings;

    const iconSize = 36;

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [addingLayout, setAddingLayout] = useState(false);
    const [newLayout, setNewLayout] = useState<[number, number] | null>(null);
    const [newLayoutValue, setNewLayoutValue] = useState<string>("");

    function toggleSettingsModal(isOpen: boolean) {
        setSettingsOpen(isOpen);

        if (!isOpen) {
            setIsAuthenticated(false);
        }
    }

    function closeSettingsModal() {
        setIsAuthenticated(false);
    }

    function handleUnfocusNewLayout() {
        setAddingLayout(false);
        addNewLayout(newLayout);
        setNewLayout(null);
        setNewLayoutValue("");
    }

    function handleNewLayoutChange(newLayout: string) {
        const numValue = parseInt(newLayout);
        if (!isNaN(numValue) && numValue > 0) {
            setNewLayout([numValue, 1]);
            setNewLayoutValue(newLayout);
        } else {
            setNewLayoutValue("");
        }
    }

    function addNewLayout(layout: [number, number] | null) {
        if (!layout) return;

        // don't add duplicate layouts
        if (
            settings.layouts.some(
                (l) => l[0] === layout[0] && l[1] === layout[1],
            )
        ) {
            return;
        }

        setSettings((prevSettings) => ({
            ...prevSettings,
            layouts: [...prevSettings.layouts, layout],
        }));
    }

    function removeLayout(layoutToRemove: [number, number]) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            layouts: prevSettings.layouts.filter(
                (layout) => layout !== layoutToRemove,
            ),
        }));
    }

    function toggleLightMode(isLightMode: boolean) {
        // document.body.classList.toggle("light-mode", isLightMode);

        setSettings((prevSettings) => ({
            ...prevSettings,
            lightMode: isLightMode,
        }));
    }

    function handleLogoTextChange(newText: string) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            logoText: newText,
        }));

        if (newText.trim() === "") {
            setSettings((prevSettings) => ({
                ...prevSettings,
                logoText: defaultSettings.logoText,
            }));
        }
    }

    function handleLogoImgChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!event.target.files) return;

        const newImg = event.target.files[0];
        const previewUrl = URL.createObjectURL(newImg);
        // setLogoImgUrl(previewUrl);

        setSettings((prevSettings) => ({
            ...prevSettings,
            logoImg: previewUrl,
        }));
    }

    function removeLogoImg() {
        // setLogoImgUrl("");
        setSettings((prevSettings) => ({
            ...prevSettings,
            logoImg: "",
        }));
    }

    function handleLabelTextChange(newText: string) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            labelText: newText,
        }));

        if (newText.trim() === "") {
            setSettings((prevSettings) => ({
                ...prevSettings,
                labelText: defaultSettings.labelText,
            }));
        }
    }

    function handleMaxCopiesChange(newMaxCopiesText: string) {
        const newMaxCopies = parseInt(newMaxCopiesText);
        if (!isNaN(newMaxCopies) && newMaxCopies > 0) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                maxCopies: newMaxCopies,
            }));
        } else {
            setSettings((prevSettings) => ({
                ...prevSettings,
                maxCopies: defaultSettings.maxCopies,
            }));
        }
    }

    function handleCountdownValueChange(newCountdownText: string) {
        const newCountdownValue = parseInt(newCountdownText);
        if (!isNaN(newCountdownValue) && newCountdownValue > 0) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                countdownValue: newCountdownValue,
            }));
        } else {
            setSettings((prevSettings) => ({
                ...prevSettings,
                countdownValue: defaultSettings.countdownValue,
            }));
        }
    }

    function toggleIsMuted(isMuted: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            isMuted: isMuted,
        }));
    }

    function toggleFloatingStars(isFloating: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            isFloating: isFloating,
        }));
    }

    function toggleStarsVisible(starsVisible: boolean) {
        setSettings((prevSettings) => ({
            ...prevSettings,
            starsVisible: starsVisible,
        }));
    }

    function resetSettings() {
        // document.body.classList.toggle("light-mode", defaultSettings.lightMode);
        setSettings(defaultSettings);

        // TODO: reset all inputs including lightmode

        // // reset all inputs
        // document.querySelectorAll(".modal input").forEach((input) => {
        //     (input as HTMLInputElement).value = "";
        // });
    }

    function checkPassword(inputPassword: string) {
        const correctPassword = SETTINGS_PASSWORD;
        if (inputPassword === correctPassword) {
            setIsAuthenticated(true);
        }
    }

    const SwitchWrapper = ({ children }: { children: React.ReactNode }) => {
        return <View>{children}</View>;
    };

    return (
        <>
            {/* <Modal
                visible={settingsOpen}
                onDismiss={closeSettingsModal}
                animationType="slide"
                transparent
            > */}
            {settingsOpen && (
                <WindowOpenComponent toWidth={650} toHeight={750}>
                    <View style={styles.modal}>
                        {isAuthenticated ? (
                            <View className="h-full items-center justify-between">
                                <Text className="text-h2 font-normal">
                                    SETTINGS
                                </Text>

                                <View style={styles.modalContent}>
                                    <View className="flex-1 gap-3">
                                        {/* ADD AND DELETE LAYOUT DIMENSIONS */}
                                        <View className="flex-row items-center">
                                            <View style={styles.icon}>
                                                <FontAwesome6
                                                    name="image-portrait"
                                                    size={iconSize}
                                                    color="black"
                                                />
                                            </View>

                                            {/* LAYOUTS LIST */}
                                            <View className="flex-1 flex-row flex-wrap gap-y-[10px] mr-[25px]">
                                                {settings.layouts
                                                    .sort(
                                                        // sort layouts by rows then columns
                                                        (
                                                            a: [number, number],
                                                            b: [number, number],
                                                        ) => {
                                                            return (
                                                                a[0] - b[0] ||
                                                                a[1] - b[1]
                                                            );
                                                        },
                                                    )
                                                    .map((layout) => {
                                                        return (
                                                            <Pressable
                                                                style={
                                                                    styles.layoutOption
                                                                }
                                                                key={`${layout[0]}x${layout[1]}`}
                                                                onPress={() => {
                                                                    removeLayout(
                                                                        layout,
                                                                    );
                                                                }}
                                                            >
                                                                <Text className="font-mono-normal">{`${layout[0]} x ${layout[1]}`}</Text>
                                                            </Pressable>
                                                        );
                                                    })}

                                                {addingLayout ? (
                                                    <TextInput
                                                        maxLength={1}
                                                        keyboardType="numeric"
                                                        autoFocus
                                                        onBlur={
                                                            handleUnfocusNewLayout
                                                        }
                                                        onChangeText={
                                                            handleNewLayoutChange
                                                        }
                                                        value={newLayoutValue}
                                                    />
                                                ) : (
                                                    <Pressable
                                                        style={
                                                            styles.layoutOption
                                                        }
                                                        onPress={() =>
                                                            setAddingLayout(
                                                                true,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesome6 name="plus" />
                                                    </Pressable>
                                                )}
                                            </View>
                                        </View>

                                        {/* TOGGLE SETTINGS */}
                                        <View className="gap-2">
                                            <View
                                                style={styles.toggleOptionRow}
                                            >
                                                <View
                                                    style={styles.toggleOption}
                                                >
                                                    <View style={styles.icon}>
                                                        <Ionicons
                                                            name="sunny"
                                                            size={iconSize}
                                                            color="black"
                                                        />
                                                    </View>
                                                    <SwitchWrapper>
                                                        <Switch
                                                            value={
                                                                settings.lightMode
                                                            }
                                                            onValueChange={() =>
                                                                toggleLightMode(
                                                                    !settings.lightMode,
                                                                )
                                                            }
                                                        />
                                                    </SwitchWrapper>
                                                </View>

                                                <View
                                                    style={styles.toggleOption}
                                                >
                                                    <View style={styles.icon}>
                                                        <Feather
                                                            name={`volume-${
                                                                settings.isMuted
                                                                    ? "x"
                                                                    : "2"
                                                            }`}
                                                            size={iconSize}
                                                            color="black"
                                                        />
                                                    </View>
                                                    <SwitchWrapper>
                                                        <Switch
                                                            value={
                                                                !settings.isMuted
                                                            }
                                                            onValueChange={() =>
                                                                toggleIsMuted(
                                                                    !settings.isMuted,
                                                                )
                                                            }
                                                        />
                                                    </SwitchWrapper>
                                                </View>
                                            </View>

                                            <View
                                                style={styles.toggleOptionRow}
                                            >
                                                <View
                                                    style={styles.toggleOption}
                                                >
                                                    <View style={styles.icon}>
                                                        <AntDesign
                                                            name="star"
                                                            size={iconSize}
                                                            color="black"
                                                        />
                                                    </View>
                                                    <SwitchWrapper>
                                                        <Switch
                                                            value={
                                                                settings.starsVisible
                                                            }
                                                            onValueChange={() =>
                                                                toggleStarsVisible(
                                                                    !settings.starsVisible,
                                                                )
                                                            }
                                                        />
                                                    </SwitchWrapper>
                                                </View>

                                                <View
                                                    style={styles.toggleOption}
                                                >
                                                    <View style={styles.icon}>
                                                        <FontAwesome5
                                                            name="arrows-alt-v"
                                                            size={iconSize}
                                                            color="black"
                                                        />
                                                    </View>
                                                    <SwitchWrapper>
                                                        <Switch
                                                            value={
                                                                settings.isFloating
                                                            }
                                                            onValueChange={() =>
                                                                toggleFloatingStars(
                                                                    !settings.isFloating,
                                                                )
                                                            }
                                                        />
                                                    </SwitchWrapper>
                                                </View>
                                            </View>
                                        </View>

                                        {/* MAX COPIES SETTING */}
                                        <View style={styles.settingsOption}>
                                            <View style={styles.icon}>
                                                <FontAwesome6
                                                    name="copy"
                                                    size={iconSize}
                                                    color="black"
                                                />
                                            </View>
                                            <TextInput
                                                style={styles.settingsInput}
                                                keyboardType="numeric"
                                                // value={settings.maxCopies.toString()}
                                                placeholder={settings.maxCopies.toString()}
                                                onChangeText={
                                                    handleMaxCopiesChange
                                                }
                                            />
                                        </View>

                                        {/* COUNTDOWN SETTING */}
                                        <View style={styles.settingsOption}>
                                            <View style={styles.icon}>
                                                <FontAwesome6
                                                    name="clock"
                                                    size={iconSize}
                                                    color="black"
                                                />
                                            </View>
                                            <TextInput
                                                style={styles.settingsInput}
                                                keyboardType="numeric"
                                                // value={settings.countdownValue.toString()}
                                                placeholder={settings.countdownValue.toString()}
                                                onChangeText={
                                                    handleCountdownValueChange
                                                }
                                            />
                                        </View>
                                    </View>

                                    {/* LAYOUT PRINT SETTINGS */}
                                    <View className="">
                                        <Layout
                                            dimensions={[1, 1]}
                                            imageDimension={250}
                                            isSelected
                                            headingText={
                                                <View className="gap-2">
                                                    {settings.logoImg ? (
                                                        <View className="relative h-9 w-full">
                                                            <Image
                                                                source={{
                                                                    uri: settings.logoImg,
                                                                }}
                                                                className="h-full mx-auto grayscale"
                                                            />
                                                            <CloseButton
                                                                closeFn={
                                                                    removeLogoImg
                                                                }
                                                            />
                                                        </View>
                                                    ) : (
                                                        <TextInput
                                                            placeholder={
                                                                settings.logoText
                                                            }
                                                            // value={
                                                            //     settings.logoText
                                                            // }
                                                            onChangeText={
                                                                handleLogoTextChange
                                                            }
                                                        />
                                                    )}

                                                    {!settings.logoImg && (
                                                        <>
                                                            <View className="add-file flex-none">
                                                                <Feather
                                                                    name="file-plus"
                                                                    size={
                                                                        iconSize
                                                                    }
                                                                    color="black"
                                                                />
                                                            </View>
                                                            {/* <input
                                                            id="header-file"
                                                            className="absolute hidden"
                                                            type="file"
                                                            onChange={
                                                                handleLogoImgChange
                                                            }
                                                        /> */}
                                                        </>
                                                    )}
                                                </View>
                                            }
                                            labelText={
                                                <TextInput
                                                    placeholder={
                                                        settings.labelText
                                                    }
                                                    onChangeText={
                                                        handleLabelTextChange
                                                    }
                                                />
                                            }
                                        />
                                    </View>
                                </View>

                                <Button handlePressFn={resetSettings} isPurple>
                                    RESET
                                </Button>

                                <FadeOutComponent
                                    delay={200}
                                    style={{
                                        width: 600,
                                        backgroundColor: "white",
                                        position: "absolute",
                                        inset: 0,
                                    }}
                                />
                            </View>
                        ) : (
                            <TextInput
                                className="font-mono-normal w-[300px] bg-neutral-300 py-[10px] text-center rounded-full"
                                secureTextEntry
                                textContentType="password"
                                placeholder="Enter password..."
                                onChangeText={(passwordToCheck) => {
                                    checkPassword(passwordToCheck);
                                }}
                            />
                        )}

                        {/* CLOSE BUTTON */}
                        <View className="absolute top-0 right-0 m-6 text-neutral-400">
                            <Pressable
                                onPress={() => {
                                    toggleSettingsModal(false);
                                    closeSettingsModal();
                                }}
                                hitSlop={10}
                            >
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
            {/* </Modal> */}

            {/* GEAR BUTTON */}
            <View className={`absolute right-0 bottom-0 m-10 text-5xl`}>
                <SpinClockwiseComponent startSpin={settingsOpen}>
                    <Pressable
                        onPress={() => toggleSettingsModal(!settingsOpen)}
                        hitSlop={20}
                    >
                        <Text>
                            <FontAwesome6
                                name="gear"
                                size={iconSize}
                                color={settings.lightMode ? "black" : "white"}
                            />
                        </Text>
                    </Pressable>
                </SpinClockwiseComponent>
            </View>
        </>
    );
};

export default Settings;

const styles = StyleSheet.create({
    modal: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: "-50%" }, { translateY: "-50%" }],
        width: 650,
        height: 750,
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
    modalContent: {
        flexDirection: "row",
    },
    icon: {
        width: 50,
        marginRight: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    layoutOption: {
        backgroundColor: "rgb(200, 200, 200)",
        borderRadius: 9999,
        paddingVertical: 5,
        paddingHorizontal: 12,
        marginRight: 10,
        justifyContent: "center",
        alignItems: "center",
        height: 30,
    },
    toggleOptionRow: {
        flexDirection: "row",
        gap: 20,
    },
    toggleOption: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    settingsOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    settingsInput: {
        fontFamily: "JetBrainsMono-Regular",
        color: "#444",
        backgroundColor: "rgb(200, 200, 200)",
        borderRadius: 9999,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginRight: 35,
        textAlign: "center",
        flex: 1,
    },
});
