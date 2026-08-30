import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView>
      {/* <StatusBar hidden={false} /> */}
      <Text className="dark:text-white">AboutScreen</Text>
    </SafeAreaView>
  );
}
