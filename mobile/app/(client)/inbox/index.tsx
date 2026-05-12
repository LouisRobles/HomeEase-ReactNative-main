import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ConversationItem from "../../../components/list-items/ConversationItem";
import NotificationItem from "../../../components/list-items/NotificationItem";
import EmptyState from "../../../components/feedback/EmptyState";
import { notifications } from "../../../constants/dummyData";
import { useNotificationStore } from "../../../store/notificationStore";
import { useMessageStore } from "../../../store/messageStore";

export default function InboxScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"messages" | "notifications">("messages");
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const conversations = useMessageStore((s) => s.conversations);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-primary text-2xl font-bold">Inbox</Text>
        <View className="flex-row mt-3 gap-2">
          <Pressable
            className={`px-4 py-2 rounded-xl ${
              tab === "messages" ? "bg-accent" : "bg-card"
            }`}
            onPress={() => setTab("messages")}
          >
            <Text
              className={
                tab === "messages"
                  ? "text-primary font-semibold"
                  : "text-text-secondary"
              }
            >
              Messages
            </Text>
          </Pressable>
          <Pressable
            className={`px-4 py-2 rounded-xl ${
              tab === "notifications" ? "bg-accent" : "bg-card"
            }`}
            onPress={() => setTab("notifications")}
          >
            <Text
              className={
                tab === "notifications"
                  ? "text-primary font-semibold"
                  : "text-text-secondary"
              }
            >
              Notifications
            </Text>
          </Pressable>
        </View>
        {tab === "notifications" && (
          <Pressable className="self-end mt-2" onPress={markAllRead}>
            <Text className="text-accent text-sm">Mark all as read</Text>
          </Pressable>
        )}
      </View>
      {tab === "messages" ? (
        conversations.length > 0 ? (
          <FlatList
            data={[...conversations].sort((a, b) =>
              (b.time ?? "").localeCompare(a.time ?? ""),
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <ConversationItem
                conversation={item}
                onPress={() => router.push(`/(client)/inbox/chat/${item.id}`)}
              />
            )}
          />
        ) : (
          <EmptyState
            title="No conversations yet"
            subtitle="Start a new chat from your bookings or worker profiles."
          />
        )
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() =>
                router.push(`/(client)/inbox/notification/${item.id}`)
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
