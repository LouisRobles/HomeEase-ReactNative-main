import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import StatusBadge from "../../../components/ui/StatusBadge";

const RECORDS: Record<
  string,
  {
    client: string;
    service: string;
    date: string;
    amount: number;
    status: string;
  }
> = {
  rec1: {
    client: "Carlo Mendoza",
    service: "House Cleaning",
    date: "2026-03-01",
    amount: 400,
    status: "Completed",
  },
  rec2: {
    client: "Liza Torres",
    service: "Plumbing",
    date: "2026-02-28",
    amount: 500,
    status: "Cancelled",
  },
};

export default function RecordDetailScreen() {
  const router = useRouter();
  const { recordId } = useLocalSearchParams<{ recordId: string }>();
  const record = recordId ? RECORDS[recordId] : null;

  if (!record) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Job Record" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isCompleted = record.status === "Completed";

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Job Record" showBack />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="items-center mb-4">
          <StatusBadge status={record.status as "Completed" | "Cancelled"} />
        </View>
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-primary font-bold">{record.client}</Text>
          <Text className="text-text-secondary text-sm">
            {record.service} · {record.date}
          </Text>
        </View>
        {isCompleted ? (
          <View className="bg-success/10 border border-success rounded-2xl p-4 mb-3">
            <Text className="text-success font-bold text-2xl">
              ₱{record.amount}.00
            </Text>
          </View>
        ) : (
          <View className="bg-error/10 border border-error rounded-2xl p-4 mb-3">
            <Text className="text-error">Cancelled</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
