import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraComponent() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

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

  return (
    <SafeAreaView className="flex-1 justify-center">
      <CameraView style={{ flex: 1 }} facing={facing} />

      <View className="absolute bottom-16 flex-row bg-transparent w-full px-16">
        <TouchableOpacity
          className="flex-1 items-center"
          onPress={toggleCameraFacing}
        >
          <Text className="text-2xl font-bold text-white">Flip Camera</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
