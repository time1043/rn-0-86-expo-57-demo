import { clearPhotos, removePhoto, usePhotoStore } from "@/stores/photo-store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoList() {
  const { photos } = usePhotoStore();

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
      {/* Delete all photos */}
      <TouchableOpacity
        className="absolute top-16 right-4 rounded-full bg-black/50 px-4 py-2 z-10"
        onPress={clearPhotos}
      >
        <Text className="font-semibold text-white">Clear photos</Text>
      </TouchableOpacity>

      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="m-1">
            {/* exhibite each photo */}
            <Image
              source={{ uri: item.uri }}
              className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-800"
              resizeMode="contain"
            />

            {/* Remove specific photo */}
            <TouchableOpacity
              className="absolute bottom-2 left-2 rounded-full bg-black/50 px-4 py-2 z-10 flex-1 flex-row items-center gap-2"
              onPress={() => removePhoto(item.id)}
            >
              <MaterialIcons name="delete" size={24} color="white" />
              <Text className="font-semibold text-white">
                {new Date(item.createdAt).toLocaleString()}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
