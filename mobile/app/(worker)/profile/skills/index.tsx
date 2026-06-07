import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import SkillCard from "../../../../components/cards/SkillCard";
import { colors } from "../../../../constants";

const SKILLS = [
  { id: "s1", name: "Pipe Repair", category: "Plumbing", rate: 250 },
  { id: "s2", name: "Installation", category: "Plumbing", rate: 300 },
  { id: "s3", name: "Drain Cleaning", category: "Plumbing", rate: 280 },
];

export default function SkillsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Skills & Services" showBack />
      <FlatList
        data={SKILLS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <SkillCard skill={item} onEdit={() => {}} onDelete={() => {}} />
        )}
      />
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => {}}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
}
