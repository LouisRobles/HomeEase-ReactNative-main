import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ConversationItem from "../../../components/list-items/ConversationItem";
import NotificationItem from "../../../components/list-items/NotificationItem";
import EmptyState from "../../../components/feedback/EmptyState";
import { useNotificationStore } from "../../../store/notificationStore";

// Worker-specific dummy data
const workerConversations = [
  {
    id: "c1",
    name: "Sarah Johnson",
    lastMessage: "Can you start earlier tomorrow?",
    time: "2:15 PM",
    unread: 1,
  },
  {
    id: "c2",
    name: "Michael Chen",
    lastMessage: "Great work today! Really satisfied.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "c3",
    name: "Emma Wilson",
    lastMessage: "Confirmed for this Saturday",
    time: "Mon",
    unread: 2,
  },
];

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

export default function WorkerInboxScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<"messages" | "notifications">("messages");
  const markAllRead = useNotificationStore((s) => s.markAllRead);
  const conversations = workerConversations;

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
                  ? "text-white font-semibold"
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
                  ? "text-white font-semibold"
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
                onPress={() => router.push(`/(worker)/inbox/chat/${item.id}`)}
              />
            )}
          />
        ) : (
          <EmptyState
            title="No conversations yet"
            subtitle="Accept job requests to start chatting with clients."
          />
        )
      ) : (
        <FlatList
          data={workerNotifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={() =>
                router.push(`/(worker)/inbox/notification/${item.id}`)
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
