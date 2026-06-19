import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../../../components/ui/PrimaryButton";
import { transactions } from "../../../../../constants/dummyData";

export default function ReceiptScreen() {
  const router = useRouter();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Receipt" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Receipt not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Receipt" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Receipt Card */}
        <View className="bg-primary-white mx-4 mt-4 rounded-2xl border border-divider overflow-hidden">
          {/* Header */}
          <View className="bg-accent p-6 items-center">
            <Text className="text-primary font-bold text-2xl">HomeEase</Text>
            <Text className="text-primary/80 text-sm mt-1">
              Official Receipt
            </Text>
          </View>

          {/* Dashed Divider */}
          <View className="border-b border-dashed border-divider mx-4" />

          {/* Body */}
          <View className="p-6">
            <Row label="Reference" value={transaction.id} />
            <Row label="Booking ID" value={transaction.bookingId} />
            <Row label="Date" value={transaction.date} />
            <Row label="Payment Method" value={transaction.method} />
            <Row label="Status" value={transaction.status} />
          </View>

          {/* Divider */}
          <View className="border-b border-divider mx-4" />

          {/* Total */}
          <View className="p-6 flex-row justify-between items-center">
            <Text className="text-primary font-bold text-lg">Total Paid</Text>
            <Text className="text-accent font-bold text-2xl">
              ₱{transaction.amount}.00
            </Text>
          </View>

          {/* Footer */}
          <View className="bg-card p-4 items-center">
            <Text className="text-text-secondary text-xs text-center">
              Thank you for using HomeEase!
            </Text>
            <Text className="text-accent text-xs text-center mt-1">
              support@homeease.com
            </Text>
          </View>
        </View>

        {/* Done Button */}
        <View className="px-4 mt-6">
          <PrimaryButton label="Done" fullWidth onPress={() => router.back()} />
        </View>
      </ScrollView>
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
