import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import TransactionItem from "../../../components/list-items/TransactionItem";
import { workerTransactions } from "../../../constants/dummyData";

export default function EarningsBreakdownScreen() {
  const router = useRouter();
  const total = workerTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Earnings Breakdown" showBack />
      <View className="px-4 py-4">
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-text-secondary text-sm">Total</Text>
          <Text className="text-primary font-bold text-2xl">₱{total}.00</Text>
          <Text className="text-text-muted text-xs mt-1">
            {workerTransactions.length} jobs · Avg ₱
            {Math.round(total / workerTransactions.length)}
          </Text>
        </View>
        <FlatList
          data={workerTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              onPress={() => router.push(`/(worker)/earnings/${item.id}`)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
