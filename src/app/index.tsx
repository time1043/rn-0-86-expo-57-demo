import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>
        Edit src/app/index.tsx to edit this screen.
      </Text>

      {/* <Link href="/about">About</Link> */}
      <Text onPress={() => router.navigate("/about")}>About</Text>
    </View>
  );
}

// It is like css-modules / css-in-js in react-web
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  hint: {
    fontSize: 16,
    color: "#888",
  },
});
