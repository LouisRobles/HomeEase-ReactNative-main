import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import TransactionItem from "../../../../components/list-items/TransactionItem";
import { transactions } from "../../../../constants/dummyData";

const FILTERS = ["All", "This Week", "This Month"];

export default function TransactionsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState("All");

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Transaction History" showBack />
      <View className="flex-row gap-2 px-4 py-2">
        {FILTERS.map((f) => (
          <Pressable
            key={f}
            className={`px-3 py-2 rounded-xl ${
              filter === f ? "bg-accent" : "bg-card"
            }`}
            onPress={() => setFilter(f)}
          >
            <Text
              className={
                filter === f
                  ? "text-primary font-semibold text-sm"
                  : "text-text-secondary text-sm"
              }
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() => router.push(`/(client)/transactions/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
