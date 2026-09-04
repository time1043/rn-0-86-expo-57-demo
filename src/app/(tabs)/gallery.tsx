import VideoExhibitor from "@/components/video-exhibitor";

export default function GalleryScreen() {
  const videoUri =
    "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fgalex-9ad54196-68c9-4180-bfa3-4541554b4cbb/Camera/346db459-2220-49ed-92c1-1dd956e51245.mp4";
  return <VideoExhibitor {...{ videoUri }} />;
}
