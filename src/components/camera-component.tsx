import { Photo, photosAtom } from "@/stores/photo-atom";
import { Host, Icon } from "@expo/ui";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as Crypto from "expo-crypto";
import { router } from "expo-router";
import { useSetAtom } from "jotai";
import { cssInterop } from "nativewind";
import {
  ComponentProps,
  ComponentType,
  RefAttributes,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Button,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type StyledCameraViewProps = ComponentProps<typeof CameraView> & {
  className?: string;
} & RefAttributes<CameraView>;

const StyledCameraView = cssInterop(CameraView, {
  className: "style",
}) as ComponentType<StyledCameraViewProps>;

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const isCameraDisabled = !isCameraReady || isTakingPhoto;

  const cameraRef = useRef<CameraView>(null);

  const [shouldShowPhotoSavedAlert, setShouldShowPhotoSavedAlert] =
    useState(true);

  // const [_, setPhotos] = useAtom(photosAtom);
  const setPhotos = useSetAtom(photosAtom);
  const addPhoto = async (photo: Photo) => {
    setPhotos((current) => [photo, ...current]);
  };

  // Camera permissions are still loading.
  if (!permission) {
    return <View />;
  }

  // Camera permissions are not granted yet.
  if (!permission.granted) {
    return (
      <SafeAreaView className="flex-1 justify-center">
        <Text className="text-center pb-10">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handleTakePhoto() {
    if (!cameraRef.current || isCameraDisabled) {
      return;
    }

    setIsTakingPhoto(true);

    try {
      const pictureRef = await cameraRef.current?.takePictureAsync({
        quality: 1,
      });
      if (!pictureRef) {
        return;
      }

      // Alert if user takes a photo and doesn't set it
      if (shouldShowPhotoSavedAlert) {
        Alert.alert("Photo saved", "Would want to check your photo?", [
          {
            text: "Never remind me",
            onPress: () => setShouldShowPhotoSavedAlert(false),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Go to Photo",
            onPress: () => router.push("/gallery"),
          },
        ]);
      }

      addPhoto({
        id: Crypto.randomUUID(),
        createdAt: Date.now(),
        ...pictureRef,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsTakingPhoto(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 justify-center">
      {/* Original CameraView is not support to className */}
      <StyledCameraView
        className="flex-1"
        facing={facing}
        onCameraReady={() => setIsCameraReady(true)}
        ref={cameraRef}
      />

      {/* Camera switch button */}
      <TouchableOpacity
        className="absolute top-16 right-4 rounded-full bg-black/50 px-4 py-2"
        onPress={toggleCameraFacing}
      >
        <Text className="font-semibold text-white">Flip Camera</Text>
      </TouchableOpacity>

      {/* Take photo button */}
      <View className="absolute bottom-8 w-full items-center">
        <Pressable
          className={`items-center justify-center border-4 border-white bg-black/30 p-1 size-20 rounded-full ${isCameraDisabled ? "opacity-50" : ""}`}
          pointerEvents="box-only"
          onPress={handleTakePhoto}
          disabled={isCameraDisabled}
        >
          <Host matchContents pointerEvents="none">
            <Icon
              name={Icon.select({
                ios: "camera.fill",
                android: import("@expo/material-symbols/photo_camera.xml"),
              })}
              size={32}
              color="white"
            />
          </Host>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
