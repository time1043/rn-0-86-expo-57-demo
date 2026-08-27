import { getFeeds } from "@/service/apiFeed";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  const {
    data: feeds,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["feeds"],
    queryFn: getFeeds,
  });

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text className="text-xl text-gray-400">
        Edit src/app/index.tsx to edit this screen.
      </Text>

      {/* <Link href="/about">About</Link> */}
      <Text
        className="dark:text-white"
        onPress={() => router.navigate("/about")}
      >
        About
      </Text>
    </SafeAreaView>
  );
}
