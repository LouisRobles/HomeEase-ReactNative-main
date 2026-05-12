import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Notification = {
  id: string;
  title: string;
  body: string;
  time: string;
  type: string;
  isRead: boolean;
};

type Props = {
  notification: Notification;
  onPress: () => void;
};

export const NotificationItem: React.FC<Props> = ({
  notification,
  onPress,
}) => {
  const iconColor =
    notification.type === "booking"
      ? "#4B5FD6"
      : notification.type === "payment"
        ? "#4CAF50"
        : "#F59E0B";

  return (
    <Pressable
      className={`flex-row items-start py-4 border-b border-divider px-3 rounded-xl mb-2 ${
        !notification.isRead ? "bg-card-light" : ""
      }`}
      onPress={onPress}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center mr-3"
        style={{ backgroundColor: `${iconColor}20` }}
      >
        <Ionicons
          name={
            notification.type === "payment"
              ? "wallet-outline"
              : notification.type === "booking"
                ? "calendar-outline"
                : "chatbubble-outline"
          }
          size={20}
          color={iconColor}
        />
      </View>
      <View className="flex-1">
        <Text className="text-primary font-bold">{notification.title}</Text>
        <Text className="text-primary text-sm" numberOfLines={2}>
          {notification.body}
        </Text>
        <Text className="text-text-muted text-xs mt-1">
          {notification.time}
        </Text>
      </View>
      {!notification.isRead && (
        <View className="w-2 h-2 rounded-full bg-accent mt-2 ml-2" />
      )}
    </Pressable>
  );
};

export default NotificationItem;
