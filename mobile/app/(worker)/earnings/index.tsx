import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TransactionItem from "../../../components/list-items/TransactionItem";
import { workerTransactions } from "../../../constants/dummyData";
import { useWorkerStore } from "../../../store/workerStore";
import { colors } from "../../../constants";

export default function EarningsScreen() {
  const router = useRouter();
  const jobRequests = useWorkerStore((s) => s.jobRequests);

  const completed = jobRequests.filter((r) => r.status === "Completed");
  const totalEarnings = completed.reduce((sum, r) => sum + r.amount, 0);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="px-4 pt-4 pb-2 flex-row justify-between items-center">
        <Text className="text-primary text-2xl font-bold">History</Text>
        <Pressable onPress={() => router.push("/(worker)/earnings/breakdown")}>
          <Text className="text-accent font-semibold">See All</Text>
        </Pressable>
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View className="bg-card rounded-2xl p-5 mx-4 mt-4">
          <View className="flex-row items-center mb-2">
            <Ionicons name="wallet" size={20} color={colors.warning} />
            <Text className="text-text-secondary text-sm ml-2">
              Total Earnings
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons
              name="arrow-undo-outline"
              size={20}
              color={colors.text.muted}
            />
            <Text className="text-primary font-bold text-3xl ml-2">
              ₱{totalEarnings.toFixed(2)}
            </Text>
          </View>
          <Text className="text-text-muted text-xs mt-1">
            After 10% platform fee
          </Text>
          <View className="flex-row gap-2 mt-3">
            <View className="flex-1 bg-card-dark rounded-xl p-3">
              <Text className="text-text-secondary text-xs">
                Completed Jobs
              </Text>
              <Text className="text-primary font-semibold">
                {completed.length}
              </Text>
            </View>
            <View className="flex-1 bg-card-dark rounded-xl p-3">
              <Text className="text-text-secondary text-xs">Pending Jobs</Text>
              <Text className="text-primary font-semibold">
                {jobRequests.filter((r) => r.status === "Pending").length}
              </Text>
            </View>
          </View>
        </View>

        {/* <View className="bg-card rounded-2xl mx-4 mt-3 overflow-hidden">
          <View className="flex-row items-center py-4 px-4 border-b border-divider">
            <Ionicons name="refresh-outline" size={20} color="#4B5FD6" />
            <Text className="text-primary flex-1 ml-3">Top up</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A8D0" />
          </View>
          <View className="flex-row items-center py-4 px-4">
            <Ionicons name="cash-outline" size={20} color="#4B5FD6" />
            <Text className="text-primary flex-1 ml-3">Cash out</Text>
            <Ionicons name="chevron-forward" size={20} color="#A0A8D0" />
          </View>
        </View> */}

        <View className="px-4 mt-4">
          <Text className="text-primary font-bold mb-2">Recent</Text>
          {workerTransactions.slice(0, 3).map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onPress={() => router.push(`/(worker)/earnings/${t.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
