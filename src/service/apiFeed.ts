import { generateFeeds } from "@/mocks/feed";

export async function getFeeds() {
  return generateFeeds(1000);
}
