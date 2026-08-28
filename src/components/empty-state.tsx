import { Text, View } from "react-native";

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  icon?: string;
}

export function EmptyState({
  message = "No feeds available",
  subMessage = "Check back later for new content",
  icon = "📭",
}: EmptyStateProps) {
  return (
    <View className="flex-1 justify-center items-center p-8">
      <View className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 mb-4">
        <Text className="text-4xl mb-4">{icon}</Text>
      </View>
      <Text className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
        {message}
      </Text>
      <Text className="text-sm text-gray-500 dark:text-gray-500 text-center">
        {subMessage}
      </Text>
    </View>
  );
}
