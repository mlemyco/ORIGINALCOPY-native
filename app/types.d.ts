interface settingsProps {
    isFloating: boolean;
    starsVisible: boolean;
    validateOrderNumber: boolean;
    logoText: string; // | File;
    logoImg: string;
    labelText: string;
    lightMode: boolean;
    layouts: [number, number][];
    isMuted: boolean;
    maxCopies: number;
    countdownValue: number;
}

export type { settingsProps };
