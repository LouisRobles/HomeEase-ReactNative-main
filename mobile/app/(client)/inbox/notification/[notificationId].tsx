import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { notifications } from "../../../../constants/dummyData";

export default function NotificationDetailScreen() {
  const router = useRouter();
  const { notificationId } = useLocalSearchParams<{ notificationId: string }>();
  const notification = notifications.find((n) => n.id === notificationId);

  if (!notification) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Notification" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const iconColor =
    notification.type === "booking"
      ? "#4B5FD6"
      : notification.type === "payment"
        ? "#4CAF50"
        : "#F59E0B";

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Notification" showBack />
      <View className="px-4 py-6">
        <View
          className="w-16 h-16 rounded-full items-center justify-center mb-4"
          style={{ backgroundColor: `${iconColor}20` }}
        >
          <Ionicons name="notifications" size={32} color={iconColor} />
        </View>
        <Text className="text-primary text-xl font-bold">
          {notification.title}
        </Text>
        <Text className="text-text-muted text-sm mt-1">
          {notification.time}
        </Text>
        <Text className="text-text-secondary mt-4">{notification.body}</Text>
        {notification.type === "booking" && (
          <View className="mt-8">
            <PrimaryButton
              label="View Booking"
              fullWidth
              onPress={() => router.push("/(client)/booking/BK-001")}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
