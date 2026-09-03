import { CameraCapturedPicture } from "expo-camera";
import { create } from "zustand";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

type PhotoState = {
  photos: Photo[];
};

export const usePhotoStore = create<PhotoState>(() => ({
  photos: [],
}));

export const addPhoto = (photo: Photo) =>
  usePhotoStore.setState((state) => ({
    photos: [photo, ...state.photos],
  }));

export const removePhoto = (id: string) =>
  usePhotoStore.setState((state) => ({
    photos: state.photos.filter((photo) => photo.id !== id),
  }));

export const clearPhotos = () => usePhotoStore.setState({ photos: [] });
