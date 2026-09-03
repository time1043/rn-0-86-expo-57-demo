import { CameraCapturedPicture } from "expo-camera";
import { create } from "zustand";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

type PhotoStore = {
  photos: Photo[];

  addPhoto: (photo: Photo) => void;
  removePhoto: (id: string) => void;
};

export const usePhotoStore = create<PhotoStore>((set) => ({
  photos: [],

  addPhoto: (photo) =>
    set((state) => ({
      photos: [photo, ...state.photos],
    })),

  removePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
    })),
}));
