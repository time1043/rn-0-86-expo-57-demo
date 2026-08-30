import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  usePathname,
} from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { StatusBar, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const pathname = usePathname();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* showHideTransition is only available on iOS */}
      <StatusBar
        hidden={pathname === "/"}
        animated
        showHideTransition="slide"
      />

      <NativeTabs>
        <NativeTabs.Trigger name="index">
          {/* <NativeTabs.Trigger.Icon sf="house.fill" md="home" /> */}
          <NativeTabs.Trigger.Icon
            sf={{ default: "house", selected: "house.fill" }}
            md={{ default: "home", selected: "home_filled" }}
          />
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="about">
          {/* <NativeTabs.Trigger.Icon sf="gear" md="settings" /> */}
          <NativeTabs.Trigger.Icon
            sf={{ default: "gear.circle", selected: "gear.circle.fill" }}
            md={{ default: "settings", selected: "settings_applications" }}
          />
          <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  );
}
