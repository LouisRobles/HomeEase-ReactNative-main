import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import { transactions } from "../../../../constants/dummyData";

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  const transaction = transactions.find((t) => t.id === transactionId);

  if (!transaction) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Transaction Details" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isSuccess = transaction.status === "Completed";

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Transaction Details" showBack />
      <View className="px-4 py-6">
        <View
          className={`rounded-2xl p-6 mb-4 ${
            isSuccess ? "bg-success/20" : "bg-error/20"
          }`}
        >
          <Text
            className={`text-3xl font-bold ${
              isSuccess ? "text-success" : "text-error"
            }`}
          >
            ₱{transaction.amount}.00
          </Text>
          <Text className="text-text-secondary mt-1">{transaction.status}</Text>
          <StatusBadge status={transaction.status as "Completed" | "Pending"} />
        </View>
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Row label="Reference" value={transaction.id} />
          <Row label="Booking" value={transaction.bookingId} />
          <Row label="Date" value={transaction.date} />
          <Row label="Method" value={transaction.method} />
        </View>
        <OutlinedButton
          label="Download Receipt"
          onPress={() =>
            require("react-native").Alert.alert(
              "Receipt",
              "Receipt saved to Downloads",
            )
          }
        />
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
