import Home from "./(tabs)/Home";
import { useSettingsStore } from "./store/useSettingsStore";

export default function Index() {
    const { settings } = useSettingsStore();

    return (
        <Home
            isFloating={settings.isFloating}
            starsVisible={settings.starsVisible}
        />
    );
}
