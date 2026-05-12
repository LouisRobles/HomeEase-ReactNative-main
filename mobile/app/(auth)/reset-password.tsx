import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";

const requirements = [
  {
    key: "length",
    label: "At least 8 characters",
    test: (s: string) => s.length >= 8,
  },
  {
    key: "upper",
    label: "One uppercase letter",
    test: (s: string) => /[A-Z]/.test(s),
  },
  { key: "number", label: "One number", test: (s: string) => /\d/.test(s) },
];

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const strength = requirements.filter((r) => r.test(newPassword)).length;

  const handleReset = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (strength < 3) {
      Alert.alert("Error", "Password does not meet requirements");
      return;
    }
    Alert.alert("Success", "Password reset!", [
      { text: "OK", onPress: () => router.replace("/(auth)/sign-in") },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Reset Password" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 16 }}
      >
        <Text className="text-primary text-2xl font-bold">Reset Password</Text>
        <Text className="text-text-secondary mt-2 mb-6">
          Enter your new password below.
        </Text>

        <InputField
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
          secureTextEntry
        />

        <View className="mb-4">
          <View className="flex-row h-1 rounded-full overflow-hidden bg-card-dark">
            <View
              className={`h-full rounded-full ${
                strength === 0
                  ? "bg-error"
                  : strength === 1
                    ? "bg-error"
                    : strength === 2
                      ? "bg-warning"
                      : "bg-success"
              }`}
              style={{ width: `${(strength / 3) * 100}%` }}
            />
          </View>
          <View className="flex-row mt-3 gap-2">
            {requirements.map((r) => (
              <Text
                key={r.key}
                className={`text-xs ${
                  r.test(newPassword) ? "text-success" : "text-text-muted"
                }`}
              >
                ✓ {r.label}
              </Text>
            ))}
          </View>
        </View>

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          secureTextEntry
        />

        <PrimaryButton label="Reset Password" fullWidth onPress={handleReset} />
      </ScrollView>
    </SafeAreaView>
  );
}
