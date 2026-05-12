import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Skill = {
  id: string;
  name: string;
  category: string;
  rate: number;
};

type Props = {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
};

export const SkillCard: React.FC<Props> = ({ skill, onEdit, onDelete }) => {
  return (
    <View className="bg-card rounded-2xl p-4 mb-3 flex-row items-center">
      <View className="flex-1">
        <Text className="text-primary font-bold">{skill.name}</Text>
        <View className="bg-accent/20 rounded-full px-2 py-0.5 self-start mt-1">
          <Text className="text-accent text-xs">{skill.category}</Text>
        </View>
        <Text className="text-accent font-semibold mt-2">₱{skill.rate}/hr</Text>
      </View>
      <Pressable onPress={onEdit} className="p-2">
        <Ionicons name="pencil-outline" size={20} color="#A0A8D0" />
      </Pressable>
      <Pressable onPress={onDelete} className="p-2">
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </Pressable>
    </View>
  );
};

export default SkillCard;
