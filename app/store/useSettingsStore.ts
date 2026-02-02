import { create } from "zustand";
import { defaultSettings } from "../config/defaults";
import { settingsProps } from "../types";

type SettingsState = {
    settings: typeof defaultSettings;
    setSettings: (settings: typeof defaultSettings) => void;
    updateSettings: (
        newSettings:
            | Partial<settingsProps>
            | ((prev: settingsProps) => Partial<settingsProps>),
    ) => void;
    resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: defaultSettings,

    setSettings: (settings) => set({ settings }),

    updateSettings: (
        newSettings:
            | Partial<settingsProps>
            | ((prev: settingsProps) => Partial<settingsProps>),
    ) =>
        set((state) => ({
            settings: {
                ...state.settings,
                ...(typeof newSettings === "function"
                    ? newSettings(state.settings)
                    : newSettings),
            },
        })),

    resetSettings: () => set({ settings: defaultSettings }),
}));
