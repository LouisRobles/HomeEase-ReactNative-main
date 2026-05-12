import React from "react";
import { View, Text } from "react-native";

type Props = {
  message: string;
  timestamp: string;
};

export const ChatBubbleSent: React.FC<Props> = ({ message, timestamp }) => {
  return (
    <View className="items-end mb-2">
      <View className="bg-accent rounded-2xl rounded-br-sm px-4 py-2 max-w-[75%]">
        <Text className="text-primary">{message}</Text>
        <Text className="text-primary/60 text-xs text-right mt-1">
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

export default ChatBubbleSent;
