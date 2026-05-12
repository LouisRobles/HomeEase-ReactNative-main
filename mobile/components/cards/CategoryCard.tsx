import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Category = { id: string; name: string; count: number };

type Props = {
  category: Category;
  onPress: () => void;
};

export const CategoryCard: React.FC<Props> = ({ category, onPress }) => {
  return (
    <Pressable
      className="bg-card rounded-2xl p-4 items-center mb-3 mx-1 flex-1 min-w-[140]"
      onPress={onPress}
    >
      {/* TODO: Replace with category-specific icon SVG */}
      <View className="w-14 h-14 bg-accent/20 rounded-full items-center justify-center mb-2">
        <Ionicons name="construct-outline" size={28} color="#4B5FD6" />
      </View>
      <Text
        className="text-primary font-bold text-sm text-center"
        numberOfLines={1}
      >
        {category.name}
      </Text>
      <Text className="text-primary text-xs text-center">
        {category.count} workers
      </Text>
    </Pressable>
  );
};

export default CategoryCard;
