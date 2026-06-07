import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ChatBubbleSent from "../../../../components/chat/ChatBubbleSent";
import ChatBubbleReceived from "../../../../components/chat/ChatBubbleReceived";
import ImageSourcePickerBottomSheet from "../../../../components/bottom-sheets/ImageSourcePickerBottomSheet";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";
import { useMessageStore, type Message } from "../../../../store/messageStore";
import { colors } from "../../../../constants";

// Worker-specific conversations
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

export default function WorkerChatScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [input, setInput] = useState("");
  const imageSheetRef = useRef<BottomSheetHandle | null>(null);
  const messages = useMessageStore((s) =>
    id ? (s.messagesByConversation[id] ?? []) : [],
  );
  const sendMessage = useMessageStore((s) => s.sendMessage);
  const addIncomingMessage = useMessageStore((s) => s.addIncomingMessage);
  const typing = useMessageStore((s) =>
    id ? s.typingByConversation[id] : false,
  );
  const markTyping = useMessageStore((s) => s.markTyping);

  const conversation = workerConversations.find((c) => c.id === id);

  const send = () => {
    if (!input.trim()) return;
    if (!id) return;
    const text = input.trim();
    sendMessage(id, text);
    setInput("");

    // Simulate client typing and auto-reply
    markTyping(id, true);
    setTimeout(() => {
      markTyping(id, false);
      addIncomingMessage(id, "Thanks po, will proceed!");
    }, 2000);
  };

  useEffect(() => {
    if (!id) return;
    // Ensure we clear typing state when leaving
    return () => {
      markTyping(id, false);
    };
  }, [id, markTyping]);

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-divider">
        <Pressable onPress={() => router.back()} className="mr-2">
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </Pressable>
        <Pressable
          className="w-9 h-9 bg-card-light rounded-full items-center justify-center mr-3"
          onPress={() => {}}
        >
          <Ionicons name="person-circle" size={32} color={colors.text.muted} />
        </Pressable>
        <View className="flex-1">
          <Text className="text-primary font-bold">
            {conversation?.name ?? "Chat"}
          </Text>
          <Text className="text-success text-xs">
            {typing ? "Typing..." : "Online"}
          </Text>
        </View>
        <Pressable>
          <Ionicons name="videocam-outline" size={24} color={colors.white} />
        </Pressable>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
        renderItem={({ item }) =>
          item.isSent ? (
            <ChatBubbleSent message={item.text} timestamp={item.time} />
          ) : (
            <ChatBubbleReceived message={item.text} timestamp={item.time} />
          )
        }
      />

      <View className="flex-row items-center p-3 border-t border-divider">
        <Pressable
          className="p-2 mr-2"
          onPress={() => imageSheetRef.current?.expand()}
        >
          <Ionicons name="attach-outline" size={24} color={colors.text.muted} />
        </Pressable>
        <TextInput
          className="flex-1 bg-card rounded-full px-4 py-2 text-primary max-h-24"
          placeholder="Message..."
          placeholderTextColor={colors.text.muted}
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable className="bg-accent rounded-full p-2 ml-2" onPress={send}>
          <Ionicons name="send" size={20} color={colors.white} />
        </Pressable>
      </View>
      <ImageSourcePickerBottomSheet
        innerRef={imageSheetRef}
        onSelect={() => {}}
      />
    </SafeAreaView>
  );
}
