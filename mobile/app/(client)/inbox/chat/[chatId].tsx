import React, { useState, useRef, useEffect } from "react";
import { View, Text, FlatList, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ChatBubbleSent from "../../../../components/chat/ChatBubbleSent";
import ChatBubbleReceived from "../../../../components/chat/ChatBubbleReceived";
import { conversations } from "../../../../constants/dummyData";
import ImageSourcePickerBottomSheet from "../../../../components/bottom-sheets/ImageSourcePickerBottomSheet";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";
import { useMessageStore, type Message } from "../../../../store/messageStore";

export default function ChatScreen() {
  const router = useRouter();
  const { chatId } = useLocalSearchParams<{ chatId: string }>();
  const [input, setInput] = useState("");
  const imageSheetRef = useRef<BottomSheetHandle | null>(null);
  const messages = useMessageStore((s) =>
    chatId ? (s.messagesByConversation[chatId] ?? []) : [],
  );
  const sendMessage = useMessageStore((s) => s.sendMessage);
  const addIncomingMessage = useMessageStore((s) => s.addIncomingMessage);
  const typing = useMessageStore((s) =>
    chatId ? s.typingByConversation[chatId] : false,
  );
  const markTyping = useMessageStore((s) => s.markTyping);

  const conversation = conversations.find((c) => c.id === chatId);

  const send = () => {
    if (!input.trim()) return;
    if (!chatId) return;
    const text = input.trim();
    sendMessage(chatId, text);
    setInput("");

    // Simulate worker typing and auto-reply
    markTyping(chatId, true);
    setTimeout(() => {
      markTyping(chatId, false);
      addIncomingMessage(chatId, "Sige po, confirmed!");
    }, 2000);
  };

  useEffect(() => {
    if (!chatId) return;
    // Ensure we clear typing state when leaving
    return () => {
      markTyping(chatId, false);
    };
  }, [chatId, markTyping]);

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-divider">
        <Pressable onPress={() => router.back()} className="mr-2">
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable
          className="w-9 h-9 bg-card-light rounded-full items-center justify-center mr-3"
          onPress={() => {}}
        >
          <Ionicons name="person-circle" size={32} color="#A0A8D0" />
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
          <Ionicons name="videocam-outline" size={24} color="#FFFFFF" />
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
          <Ionicons name="attach-outline" size={24} color="#A0A8D0" />
        </Pressable>
        <TextInput
          className="flex-1 bg-card rounded-full px-4 py-2 text-primary max-h-24"
          placeholder="Message..."
          placeholderTextColor="#6B7299"
          value={input}
          onChangeText={setInput}
          multiline
        />
        <Pressable className="bg-accent rounded-full p-2 ml-2" onPress={send}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
      <ImageSourcePickerBottomSheet
        innerRef={imageSheetRef}
        onSelect={() => {}}
      />
    </SafeAreaView>
  );
}
