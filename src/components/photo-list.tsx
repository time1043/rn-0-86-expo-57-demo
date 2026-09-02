import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoList() {
  const uri =
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgalex-9ad54196-68c9-4180-bfa3-4541554b4cbb/Camera/e87ea975-8702-4e77-bbd4-8869fbf6860b.jpg";

  return (
    <SafeAreaView className="flex-1">
      <Image
        source={{ uri }}
        className="aspect-square w-full"
        resizeMode="cover"
      />
    </SafeAreaView>
  );
}
