import React, { useState } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { workers } from "../../../constants/dummyData";
import { useBookingStore } from "../../../store/bookingStore";
import { useWorkerCapacity } from "../../../hooks/useWorkerCapacity";
import { colors } from "../../../constants";

function WorkerSelectItem({
  item,
  selectedId,
  onSelect,
}: {
  item: (typeof workers)[number];
  selectedId: string | null;
  onSelect: (id: string, name: string) => void;
}) {
  const { isAtCapacity, activeJobCount } = useWorkerCapacity(item.name);
  const isUnavailable = item.status === "unavailable" || isAtCapacity;

  const handlePress = () => {
    if (isAtCapacity) {
      Alert.alert(
        "Worker at Capacity",
        `${item.name} currently has the maximum number of active jobs and cannot accept new bookings. Please choose another worker.`,
      );
      return;
    }
    onSelect(item.id, item.name);
  };

  return (
    <Pressable
      className={`bg-card rounded-2xl p-4 mb-3 flex-row items-center ${
        selectedId === item.id ? "border-2 border-accent" : ""
      } ${isUnavailable ? "opacity-60" : ""}`}
      onPress={handlePress}
    >
      <View className="w-6 h-6 rounded-full border-2 border-accent items-center justify-center mr-3">
        {selectedId === item.id && (
          <View className="w-3 h-3 rounded-full bg-accent" />
        )}
      </View>
      <View className="flex-1">
        <Text className="text-primary font-bold">{item.name}</Text>
        <Text className="text-text-secondary text-xs">{item.service}</Text>
        <Text className="text-accent text-sm">₱{item.rate}/hr</Text>
        {activeJobCount > 0 && (
          <Text
            className={`text-xs mt-0.5 ${
              isAtCapacity ? "text-error" : "text-warning"
            }`}
          >
            {isAtCapacity
              ? "At full capacity — cannot accept new bookings"
              : `${activeJobCount} active job${activeJobCount > 1 ? "s" : ""} currently`}
          </Text>
        )}
      </View>
      {isAtCapacity && <Ionicons name="ban" size={20} color={colors.error} />}
    </Pressable>
  );
}

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
        {/* Any available option */}
        <Pressable
          className={`bg-card rounded-2xl p-4 mb-3 flex-row items-center ${
            !selectedId ? "border-2 border-accent" : ""
          }`}
          onPress={() => setSelectedId(null)}
        >
          <View className="w-6 h-6 rounded-full border-2 border-accent items-center justify-center mr-3">
            {!selectedId && <View className="w-3 h-3 rounded-full bg-accent" />}
          </View>
          <View className="flex-1">
            <Text className="text-primary font-semibold">
              Any Available Worker
            </Text>
            <Text className="text-text-secondary text-xs mt-0.5">
              We&apos;ll assign the best available worker for your booking
            </Text>
          </View>
        </Pressable>

        <FlatList
          data={workers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <WorkerSelectItem
              item={item}
              selectedId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
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
