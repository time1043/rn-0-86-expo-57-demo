import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

// Initialize the MMKV instance
export const storage = createMMKV({
  id: "mmkv-storage",
});

// Create the adapter for Zustand
export const zustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.remove(name);
  },
};
