import { photosAtom } from "@/stores/photo-atom";
import { useAtomValue } from "jotai";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoList() {
  const photos = useAtomValue(photosAtom);

  if (photos.length === 0) {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center">
          <Text className="dark:text-white">No photos yet</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.uri }}
            className="aspect-square w-full"
            resizeMode="cover"
          />
        )}
      />
    </SafeAreaView>
  );
}
