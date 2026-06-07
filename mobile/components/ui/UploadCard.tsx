import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

type Props = {
  label: string;
  onPress: () => void;
  preview?: string | null;
};

export const UploadCard: React.FC<Props> = ({ label, onPress, preview }) => {
  return (
    <Pressable
      className="bg-card border border-dashed border-divider rounded-xl p-6 items-center justify-center min-h-[120]"
      onPress={onPress}
    >
      {!preview ? (
        <>
          {/* TODO: Replace with contextual upload illustration */}
          <Ionicons
            name="cloud-upload-outline"
            size={40}
            color={colors.text.muted}
          />
          <Text className="text-primary text-sm mt-2">{label}</Text>
        </>
      ) : (
        <View className="items-center">
          <Ionicons name="checkmark-circle" size={40} color={colors.success} />
          <Text className="text-primary text-sm mt-2" numberOfLines={1}>
            {preview}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

export default UploadCard;
