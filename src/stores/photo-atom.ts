import { CameraCapturedPicture } from "expo-camera";
import { atom } from "jotai";

export type Photo = CameraCapturedPicture & {
  id: string;
  createdAt: number;
};

export const photosAtom = atom<Photo[]>([]);
