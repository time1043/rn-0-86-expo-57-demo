import { CameraCapturedPicture } from "expo-camera";
import { atom } from "jotai";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

export const photosAtom = atom<Photo[]>([]);

export const shouldShowPhotoSavedAlertAtom = atom<boolean>(true);

// write-only atom / action atom
export const addPhotoAtom = atom(null, (_get, set, photo: Photo) => {
  set(photosAtom, (current) => [photo, ...current]);
});
