import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import { transactions } from "../../../constants/dummyData";

export default function EarningsTransactionScreen() {
  const router = useRouter();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const t = transactions.find((x) => x.id === transactionId);

  if (!t) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Transaction Details" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Transaction Details" showBack />
      <View className="px-4 py-6">
        <View className="bg-success/20 rounded-2xl p-6 mb-4 items-center">
          <Text className="text-success font-bold text-4xl">
            +₱{t.amount}.00
          </Text>
        </View>
        <View className="bg-card rounded-2xl p-4">
          <Row label="Reference" value={t.id} />
          <Row label="Booking" value={t.bookingId} />
          <Row label="Date" value={t.date} />
          <Row label="Method" value={t.method} />
          <Row label="Status" value={t.status} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-divider last:border-0">
      <Text className="text-text-secondary text-sm">{label}</Text>
      <Text className="text-primary font-semibold">{value}</Text>
    </View>
  );
}
