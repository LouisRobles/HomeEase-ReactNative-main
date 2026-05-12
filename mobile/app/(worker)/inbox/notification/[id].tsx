import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

// Worker-specific notifications
const workerNotifications = [
  {
    id: "n1",
    title: "New Job Request",
    body: "Sarah Johnson requested plumbing service",
    time: "10 mins ago",
    type: "booking",
    isRead: false,
  },
  {
    id: "n2",
    title: "Payment Received",
    body: "₱1,200 for completed work",
    time: "2 hours ago",
    type: "payment",
    isRead: false,
  },
  {
    id: "n3",
    title: "Rating Received",
    body: "⭐⭐⭐⭐⭐ 5-star review from Michael",
    time: "Yesterday",
    type: "booking",
    isRead: true,
  },
  {
    id: "n4",
    title: "Job Cancelled",
    body: "Emma Wilson cancelled the job",
    time: "Mon",
    type: "message",
    isRead: true,
  },
];

export default function WorkerNotificationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const notification = workerNotifications.find((n) => n.id === id);

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
      </View>
    </SafeAreaView>
  );
}
