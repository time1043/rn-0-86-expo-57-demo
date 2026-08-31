import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Lens</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="camera" md="camera" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="gallery">
          <NativeTabs.Trigger.Label>Gallery</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="photo" md="photo_album" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
