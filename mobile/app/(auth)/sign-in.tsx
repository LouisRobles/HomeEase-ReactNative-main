import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlinedButton from "../../components/ui/OutlinedButton";
import { useAuthStore } from "../../store/authStore";
import { isValidEmail } from "../../utils/validators";
import { Image } from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const role = (params.role as string) || "client";
  const setUser = useAuthStore((s) => s.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email,
        role: role as "client" | "worker",
      };
      setUser(userData);
      const destination =
        role === "worker" ? "/(worker)/home" : "/(client)/home";
      router.replace(destination);
    } catch (err) {
      Alert.alert("Error", "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mt-8">
          <Image
            source={require("../../assets/images/logo/home_ease-logo.png")}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>

        <Text className="text-primary text-2xl font-bold">Welcome Back</Text>
        <Text className="text-text-secondary mb-6">Sign in to continue</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <InputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Pressable
          className="self-end mb-4"
          onPress={() =>
            router.push({
              pathname: "/(auth)/forgot-password",
              params: { role },
            })
          }
        >
          <Text className="text-accent font-semibold">Forgot Password?</Text>
        </Pressable>

        <PrimaryButton
          label="Sign In"
          fullWidth
          onPress={handleSignIn}
          loading={loading}
        />

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-divider" />
          <Text className="text-text-muted px-3 text-sm">or</Text>
          <View className="flex-1 h-px bg-divider" />
        </View>

        <OutlinedButton
          label="Create an account"
          onPress={() => router.push("/role-selection")}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
