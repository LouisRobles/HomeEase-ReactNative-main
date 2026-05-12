import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../components/ui/OutlinedButton";

export default function BookingSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white items-center justify-center px-8">
      <View className="w-40 h-40 bg-success/20 rounded-full items-center justify-center mb-8">
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      </View>
      <Text className="text-primary text-2xl font-bold text-center">
        Booking Submitted!
      </Text>
      <Text className="text-text-secondary text-center mt-3">
        Your request has been sent to the worker.
      </Text>
      <View className="bg-card border border-accent rounded-2xl p-4 w-full mt-6">
        <Text className="text-text-secondary text-xs">Reference</Text>
        <Text className="text-primary font-bold">BK-005</Text>
        <Text className="text-text-secondary text-sm mt-2">
          Service · Worker · Date · Time · Payment
        </Text>
      </View>
      <View className="w-full mt-8 gap-3">
        <OutlinedButton
          label="Track My Booking"
          onPress={() => router.push("/(client)/booking/BK-001")}
        />
        <PrimaryButton
          label="Go to Home"
          fullWidth
          onPress={() => router.replace("/(client)/home")}
        />
      </View>
    </SafeAreaView>
  );
}
