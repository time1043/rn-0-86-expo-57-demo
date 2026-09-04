import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, Text, View } from "react-native";

type VideoPlayerProps = {
  videoUri: string; // Pass your file:///... URI here
};

export default function VideoExhibitor({ videoUri }: VideoPlayerProps) {
  // Create and configure the video player instance
  const player = useVideoPlayer(videoUri, (playerInstance) => {
    playerInstance.loop = true; // Optional: Loop video
    playerInstance.play(); // Optional: Autoplay when ready
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recorded Video Preview</Text>

      <VideoView
        style={styles.video}
        player={player}
        // allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    fontWeight: "bold",
  },
  video: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
});
