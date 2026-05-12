import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../../components/ui/ScreenHeader";

export default function WorkerTermsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Terms and Conditions" showBack />
      <View className="p-4">
        <Text className="text-text-secondary">Terms content.</Text>
      </View>
    </SafeAreaView>
  );
}
