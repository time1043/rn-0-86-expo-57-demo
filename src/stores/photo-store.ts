import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraCapturedPicture } from "expo-camera";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

type PhotoState = {
  photos: Photo[];
  shouldShowPhotoSavedAlert: boolean;
};

export const usePhotoStore = create<PhotoState>()(
  persist(
    (set) => ({
      photos: [],
      shouldShowPhotoSavedAlert: true,
    }),
    {
      name: "photo-store",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const addPhoto = (photo: Photo) =>
  usePhotoStore.setState((state) => ({
    photos: [photo, ...state.photos],
  }));

export const removePhoto = (id: string) =>
  usePhotoStore.setState((state) => ({
    photos: state.photos.filter((photo) => photo.id !== id),
  }));

export const clearPhotos = () => usePhotoStore.setState({ photos: [] });

export const setShouldShowPhotoSavedAlert = (value: boolean) =>
  usePhotoStore.setState({
    shouldShowPhotoSavedAlert: value,
  });
