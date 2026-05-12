import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";

export default function PayoutMethodScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Payout Method" showBack />
      <View className="px-4 py-6">
        <View className="bg-card rounded-2xl p-4 flex-row items-center mb-4">
          <View className="w-12 h-12 bg-green-500 rounded-full items-center justify-center mr-3">
            <Text className="text-primary font-bold text-lg">G</Text>
          </View>
          <View className="flex-1">
            <Text className="text-primary font-bold">GCash</Text>
            <Text className="text-text-secondary text-sm">09XX-XXX-XXXX</Text>
          </View>
          <Text
            className="text-accent font-semibold"
            onPress={() => router.push("/(worker)/earnings/payout/edit")}
          >
            Edit
          </Text>
        </View>
        <Text className="text-primary font-bold mb-2">Payout History</Text>
        <View className="bg-card rounded-xl p-3 mb-2">
          <Text className="text-primary">₱500 · Mar 1, 2026</Text>
        </View>
        <View className="bg-card rounded-xl p-3">
          <Text className="text-primary">₱600 · Feb 28, 2026</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
