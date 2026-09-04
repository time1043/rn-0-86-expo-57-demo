import {
  clearPhotosAtom,
  Photo,
  photosAtom,
  removePhotoAtom,
} from "@/stores/photo-atom";
import { Link } from "expo-router";
import { useAtomValue, useSetAtom } from "jotai";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoList() {
  const photos = useAtomValue(photosAtom);
  const clearPhotos = useSetAtom(clearPhotosAtom);
  const removePhoto = useSetAtom(removePhotoAtom);

  // Delete all photos after confirmation.
  const handleClearPhotos = () => {
    Alert.alert("Delete all photos?", "This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete All",
        style: "destructive",
        onPress: () => clearPhotos(),
      },
    ]);
  };

  // Delete a single photo after confirmation.
  const handleRemovePhoto = (id: string) => {
    Alert.alert("Delete photo?", "This action cannot be undone.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => removePhoto(id),
      },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-stone-50 dark:bg-zinc-950">
      <FlatList
        data={photos}
        keyExtractor={(photo) => photo.id}
        contentContainerClassName="grow px-4 pb-8"
        columnWrapperClassName="justify-between"
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ListHeaderComponent
            photos={photos}
            onClearPhotos={handleClearPhotos}
          />
        }
        ListEmptyComponent={<ListEmptyComponent />}
        renderItem={({ item: photo }) => (
          <PhotoCard
            photo={photo}
            onRemove={() => handleRemovePhoto(photo.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

function PhotoCard({
  photo,
  onRemove,
}: {
  photo: Photo;
  onRemove: () => void;
}) {
  return (
    <View className="mb-3 aspect-square w-[48.5%] overflow-hidden rounded-2xl bg-zinc-200 dark:bg-zinc-800">
      <Image
        source={{ uri: photo.uri }}
        resizeMode="cover"
        className="size-full"
      />

      {/* Photo metadata */}
      <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-3 py-2">
        <Text className="text-xs font-medium text-white">
          {new Date(photo.createdAt).toLocaleString()}
        </Text>
      </View>

      <Pressable
        onPress={onRemove}
        className="absolute right-2 top-2 size-8 items-center justify-center rounded-full bg-black/50"
      >
        <Text className="text-sm font-bold text-white">×</Text>
      </Pressable>
    </View>
  );
}

function ListHeaderComponent({
  photos,
  onClearPhotos,
}: {
  photos: Photo[];
  onClearPhotos: () => void;
}) {
  return (
    <View className="flex-row items-end justify-between pb-5 pt-3">
      <View className="gap-1">
        <Text className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Gallery
        </Text>

        <Text className="text-sm text-zinc-500 dark:text-zinc-400">
          Photos captured with Galex
        </Text>
      </View>

      <View className="items-end gap-2">
        {photos.length > 0 && (
          <Pressable onPress={onClearPhotos}>
            <Text className="text-xs font-medium text-red-500">Delete All</Text>
          </Pressable>
        )}

        <View className="rounded-full bg-zinc-200 px-3 py-1.5 dark:bg-zinc-800">
          <Text className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
            {photos.length} {photos.length === 1 ? "Photo" : "Photos"}
          </Text>
        </View>
      </View>
    </View>
  );
}

function ListEmptyComponent() {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-24">
      <View className="mb-5 size-20 items-center justify-center rounded-3xl bg-zinc-200 dark:bg-zinc-800">
        <Text className="text-4xl">📷</Text>
      </View>

      <Text className="text-center text-xl font-semibold text-zinc-900 dark:text-white">
        No photos yet
      </Text>

      <Text className="pt-2 text-center text-sm leading-5 text-zinc-500 dark:text-zinc-400">
        Take your first photo at
        <Link href={"/"}>
          <Text className="underline"> Len</Text>
        </Link>
        , and they will appear here
      </Text>
    </View>
  );
}
