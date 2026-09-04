import { CameraCapturedPicture } from "expo-camera";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { zustandMMKVStorage } from "./mmkv-storage";

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
      storage: createJSONStorage(() => zustandMMKVStorage),
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
