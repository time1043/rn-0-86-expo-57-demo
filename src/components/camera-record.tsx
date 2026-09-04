import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CameraRecord() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!cameraPermission || !micPermission) {
    return <View />;
  }

  if (!cameraPermission.granted || !micPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need camera and microphone permissions
        </Text>
        <TouchableOpacity
          onPress={() => {
            requestCameraPermission();
            requestMicPermission();
          }}
        >
          <Text style={styles.button}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const toggleRecord = async () => {
    if (!cameraRef.current) return;

    if (recording) {
      setRecording(false);
      cameraRef.current.stopRecording();
    } else {
      try {
        setRecording(true);
        // Start the recording process
        const video = await cameraRef.current.recordAsync();
        console.log({ video });
        // {"video": {"uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgalex-9ad54196-68c9-4180-bfa3-4541554b4cbb/Camera/346db459-2220-49ed-92c1-1dd956e51245.mp4"}}
      } catch (error) {
        console.error("Recording error details:", error);
        setRecording(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. Added mode="video" to resolve the recording crash */}
      <CameraView style={styles.camera} ref={cameraRef} mode="video" />

      {/* 2. Moved button container outside as a sibling using absolute positioning */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.recordButton} onPress={toggleRecord}>
          <Text style={styles.text}>{recording ? "Stop" : "Record"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
  },
  // 3. Updated styles to align overlay items correctly on top of the camera
  buttonContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  recordButton: {
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 50,
  },
  button: {
    fontSize: 16,
    color: "#2196F3",
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
