import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl text-gray-400">
        Edit src/app/index.tsx to edit this screen.
      </Text>

      {/* <Link href="/about">About</Link> */}
      <Text onPress={() => router.navigate("/about")}>About</Text>
    </View>
  );
}
