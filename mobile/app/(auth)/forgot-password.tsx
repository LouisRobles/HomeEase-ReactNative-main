import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    router.push("/(auth)/password-reset-sent");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Forgot Password" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
      >
        <Text className="text-primary text-2xl font-bold">
          Forgot Password?
        </Text>
        <Text className="text-text-secondary mt-2 mb-6">
          Enter your email and we&apos;ll send you a reset link.
        </Text>
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PrimaryButton label="Send Reset Link" fullWidth onPress={handleSend} />
      </ScrollView>
    </SafeAreaView>
  );
}
