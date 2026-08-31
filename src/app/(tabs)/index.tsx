import { EmptyState } from "@/components/empty-state";
import { FeedCard } from "@/components/feed-card";
import { getFeeds } from "@/service/apiFeed";
import { useQuery } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [showStatusBar, setShowStatusBar] = useState(true);

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

  function handleScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const verticalScrollVelocity = event.nativeEvent.velocity?.y;
    if (!verticalScrollVelocity) return;

    // Implement
    // to hide status bar from top to bottom
    // and show status bar from bottom to top

    // // There are different behaviors on iOS and Android
    // // In Android, the scroll direction is reversed
    // if (verticalScrollVelocity && verticalScrollVelocity > 0) {
    //   console.log(verticalScrollVelocity);
    //   setShowStatusBar(false);
    //   return;
    // }
    // if (verticalScrollVelocity && verticalScrollVelocity < 0) {
    //   console.log(verticalScrollVelocity);
    //   setShowStatusBar(true);
    //   return;
    // }

    // const isScrollingUp =
    //   Platform.OS === "ios"
    //     ? verticalScrollVelocity > 0
    //     : verticalScrollVelocity < 0;
    // if (isScrollingUp) {
    //   console.log(verticalScrollVelocity);
    //   setShowStatusBar(false);
    // } else {
    //   console.log(verticalScrollVelocity);
    //   setShowStatusBar(true);
    // }

    const isScrollingUp = Platform.select({
      ios: verticalScrollVelocity > 0,
      android: verticalScrollVelocity < 0,
      default: verticalScrollVelocity > 0,
    });
    setShowStatusBar(!isScrollingUp);
  }

  return (
    // <SafeAreaView edges={["top"]}> // for observing list through liquid glass
    // <SafeAreaView edges={["bottom"]}> // ios top bar which is so intelligent turns color automatically
    <SafeAreaView edges={[]}>
      <StatusBar hidden={!showStatusBar} animated style="auto" />
      <FlatList
        data={feeds}
        renderItem={({ item: feed }) => <FeedCard {...{ feed }} />}
        keyExtractor={(feed) => feed.id.toString()}
        ListEmptyComponent={() => <EmptyState />}
        // showsVerticalScrollIndicator={false}
        // onScroll={handleScrollEndDrag} // works only on android
        onScrollEndDrag={handleScrollEndDrag} // works on ios and android
        scrollEventThrottle={160}
      />
    </SafeAreaView>
  );
}
