import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function PasswordResetSentScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white items-center justify-center px-8">
      {/* TODO: Replace with email sent illustration */}
      <View className="w-32 h-32 bg-accent/20 rounded-full items-center justify-center mb-8">
        <Ionicons name="mail" size={80} color="#4B5FD6" />
      </View>
      <Text className="text-primary text-2xl font-bold text-center">
        Check Your Email!
      </Text>
      <Text className="text-text-secondary text-center mt-3">
        We sent a reset link to your email.
      </Text>
      <View className="w-full mt-10">
        <PrimaryButton
          label="Back to Sign In"
          fullWidth
          onPress={() => router.replace("/(auth)/sign-in")}
        />
      </View>
    </SafeAreaView>
  );
}
