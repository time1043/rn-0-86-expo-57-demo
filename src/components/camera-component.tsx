import { Host, Icon } from "@expo/ui";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { cssInterop } from "nativewind";
import { ComponentProps, ComponentType, RefAttributes, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
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

  async function handleTakePhoto() {}

  return (
    <SafeAreaView className="flex-1 justify-center">
      {/* Original CameraView is not support to className */}
      <StyledCameraView
        className="flex-1"
        facing={facing}
        onCameraReady={() => setIsCameraReady(true)}
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
        <TouchableOpacity
          className="items-center justify-center border-4 border-white bg-black/30 p-1 size-20 rounded-full"
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
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
