import type { settingsProps } from "../types";

const defaultSettings: settingsProps = {
    isFloating: true,
    starsVisible: true,
    validateOrderNumber: true,
    logoText: "ORIGINALCOPY", // TODO: test with images, tall images
    logoImg: "",
    labelText: "YOU ARE ONE OF A KIND",
    lightMode: false,
    layouts: [[1, 1]],
    isMuted: false,
    maxCopies: 3,
    countdownValue: 3,
    finishTimeout: 7,
};

export { defaultSettings };
