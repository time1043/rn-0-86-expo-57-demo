import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraCapturedPicture } from "expo-camera";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

const photosAtomStorage = createJSONStorage<Photo[]>(() => AsyncStorage);
export const photosAtom = atomWithStorage<Photo[]>(
  "photos",
  [],
  photosAtomStorage,
);

export const shouldShowPhotoSavedAlertAtom = atom<boolean>(true);

// write-only atom / action atom
export const addPhotoAtom = atom(null, async (get, set, photo: Photo) => {
  const current = await get(photosAtom);
  set(photosAtom, [photo, ...current]);
});

export const removePhotoAtom = atom(null, async (get, set, id: string) => {
  const photos = await get(photosAtom);
  set(
    photosAtom,
    photos.filter((photo) => photo.id !== id),
  );
});

export const clearPhotosAtom = atom(null, (_get, set) => {
  set(photosAtom, []);
});
