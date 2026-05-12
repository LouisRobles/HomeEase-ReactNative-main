import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function AccountCreatedSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white items-center justify-center px-8">
      {/* TODO: Replace with success celebration illustration */}
      <View className="w-40 h-40 bg-success/20 rounded-full items-center justify-center mb-8">
        <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
      </View>
      <Text className="text-primary text-3xl font-bold text-center">
        Account Created!
      </Text>
      <Text className="text-text-secondary text-center mt-3 text-lg">
        Welcome to HomeEase!
      </Text>
      <View className="w-full mt-10">
        <PrimaryButton
          label="Get Started"
          fullWidth
          onPress={() => router.replace("/(kyc)/landing")}
        />
      </View>
    </SafeAreaView>
  );
}
