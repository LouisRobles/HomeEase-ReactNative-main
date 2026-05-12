import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import WorkerCard from "../../../components/cards/WorkerCard";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { workers } from "../../../constants/dummyData";
import { useBookingStore } from "../../../store/bookingStore";

export default function SelectWorkerScreen() {
  const router = useRouter();
  const setDraft = useBookingStore((s) => s.setDraft);
  const draft = useBookingStore((s) => s.draft);
  const [selectedId, setSelectedId] = useState<string | null>(draft.workerId);

  const handleConfirm = () => {
    setDraft({ workerId: selectedId });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top"]}>
      <ScreenHeader title="Select a Worker" showBack />
      <View className="px-4 flex-1">
        <Pressable
          className={`bg-card rounded-2xl p-4 mb-3 flex-row items-center ${
            !selectedId ? "border-2 border-accent" : ""
          }`}
          onPress={() => setSelectedId(null)}
        >
          <View className="w-6 h-6 rounded-full border-2 border-accent items-center justify-center mr-3">
            {!selectedId && <View className="w-3 h-3 rounded-full bg-accent" />}
          </View>
          <Text className="text-primary font-semibold flex-1">
            Any Available Worker
          </Text>
        </Pressable>
        <FlatList
          data={workers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              className={`bg-card rounded-2xl p-4 mb-3 flex-row items-center ${
                selectedId === item.id ? "border-2 border-accent" : ""
              }`}
              onPress={() => setSelectedId(item.id)}
            >
              <View className="w-6 h-6 rounded-full border-2 border-accent items-center justify-center mr-3">
                {selectedId === item.id && (
                  <View className="w-3 h-3 rounded-full bg-accent" />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-primary font-bold">{item.name}</Text>
                <Text className="text-text-secondary text-xs">
                  {item.service}
                </Text>
                <Text className="text-accent text-sm">₱{item.rate}/hr</Text>
              </View>
            </Pressable>
          )}
        />
        <View className="py-4">
          <PrimaryButton
            label="Confirm Selection"
            fullWidth
            onPress={handleConfirm}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
