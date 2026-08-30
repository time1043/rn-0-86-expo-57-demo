import { EmptyState } from "@/components/empty-state";
import { FeedCard } from "@/components/feed-card";
import { getFeeds } from "@/service/apiFeed";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// StatusBar.setHidden(true, "fade");

export default function Index() {
  const {
    data: feeds,
    isLoading,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["feeds"],
    queryFn: getFeeds,
  });

  if (isLoading)
    return (
      <SafeAreaView className="flex-1 flex justify-center items-center">
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );

  if (error)
    return (
      <SafeAreaView className="flex-1 flex justify-center items-center">
        <Text>{error.message}</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView edges={[]}>
      {/* It is a global component and works at final one */}
      {/* <StatusBar hidden /> */}
      <FlatList
        data={feeds}
        renderItem={({ item: feed }) => <FeedCard {...{ feed }} />}
        keyExtractor={(feed) => feed.id.toString()}
        ListEmptyComponent={() => <EmptyState />}
        // showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
