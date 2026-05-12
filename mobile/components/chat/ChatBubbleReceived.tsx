import React from "react";
import { View, Text } from "react-native";

type Props = {
  message: string;
  timestamp: string;
};

export const ChatBubbleReceived: React.FC<Props> = ({ message, timestamp }) => {
  return (
    <View className="items-start mb-2">
      <View className="bg-card rounded-2xl rounded-bl-sm px-4 py-2 max-w-[75%]">
        <Text className="text-primary">{message}</Text>
        <Text className="text-text-muted text-xs mt-1">{timestamp}</Text>
      </View>
    </View>
  );
};

export default ChatBubbleReceived;
