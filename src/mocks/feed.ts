import { feedSchema, FeedType } from "@/schemas/feed";
import { faker } from "@faker-js/faker";
import { fake, setFaker } from "zod-schema-faker/v4";

setFaker(faker);

function generateFeed(): FeedType {
  const mockFeedWithoutImage = fake(feedSchema);

  // https://freeapihub.com/apis/picsum-photos-api
  return {
    ...mockFeedWithoutImage,
    image: `https://picsum.photos/seed/post-${mockFeedWithoutImage.id}/600/400`,
  };
}

export function generateFeeds(count: number = 10): FeedType[] {
  return Array.from({ length: count }, generateFeed);
}
