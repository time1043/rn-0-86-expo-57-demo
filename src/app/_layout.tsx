import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
    // <Stack
    //   // See React Navigation documentation for more information on available screenOptions: https://reactnavigation.org/docs/headers/#sharing-common-options-across-screens
    //   screenOptions={{
    //     // title: "App",
    //     headerStyle: {
    //       backgroundColor: "#f4511e",
    //     },
    //     headerTintColor: "#fff",
    //     headerTitleStyle: {
    //       fontWeight: "bold",
    //     },
    //   }}
    // >
    //   {/* Optionally configure static options outside the route.*/}
    //   <Stack.Screen name="index" options={{ title: "Home" }} />
    //   <Stack.Screen name="about" options={{ title: "About" }} />
    // </Stack>
  );
}
