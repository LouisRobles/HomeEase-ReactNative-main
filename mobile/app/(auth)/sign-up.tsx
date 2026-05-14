import React, { useState, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import InputField from "../../components/ui/InputField";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useAuthStore } from "../../store/authStore";
import { isValidEmail, isValidPassword } from "../../utils/validators";

export default function SignUpScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const role = (params.role as string) || "client";
  const setUser = useAuthStore((s) => s.setUser);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const handleSignUp = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!isValidPassword(password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters with uppercase and a number",
      );
      return;
    }
    if (phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    if (!acceptedTerms) {
      Alert.alert("Error", "Please accept the Terms and Conditions");
      return;
    }
    setLoading(true);
    try {
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        name: fullName,
        email,
        role: role as "client" | "worker",
      };
      setUser(userData);
      // Workers go to KYC flow, clients go to OTP verification
      if (role === "worker") {
        router.push({ pathname: "/(kyc)/landing", params: { role } });
      } else {
        router.push("/(auth)/otp-verification");
      }
    } catch (err) {
      Alert.alert("Error", "Sign up failed. Please try again.");
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
        <View className="pt-4 pb-2">
          <Text className="text-primary text-2xl font-bold">
            Create Account
          </Text>
        </View>

        <InputField
          ref={fullNameRef}
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <InputField
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <InputField
          ref={phoneRef}
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <InputField
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          secureTextEntry
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <InputField
          ref={confirmPasswordRef}
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleSignUp}
        />

        <Pressable
          className="flex-row items-center mb-6"
          onPress={() => setAcceptedTerms(!acceptedTerms)}
        >
          <View
            className={`w-5 h-5 rounded border-2 mr-2 items-center justify-center ${
              acceptedTerms ? "bg-accent border-accent" : "border-divider"
            }`}
          >
            {acceptedTerms && (
              <Text className="text-primary text-xs font-bold">✓</Text>
            )}
          </View>
          <Text className="text-text-secondary text-sm flex-1">
            I agree to the{" "}
            <Text className="text-accent">Terms and Conditions</Text>
          </Text>
        </Pressable>

        <PrimaryButton
          label="Sign Up"
          fullWidth
          onPress={handleSignUp}
          loading={loading}
        />

        <Pressable
          className="mt-6 flex-row justify-center"
          onPress={() => router.push("/(auth)/sign-in")}
        >
          <Text className="text-text-secondary">Already have an account? </Text>
          <Text className="text-accent font-semibold">Sign In</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
