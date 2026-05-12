import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import OtpInput from "../../components/ui/OtpInput";
import PrimaryButton from "../../components/ui/PrimaryButton";

const COUNTDOWN_SECONDS = 60;

export default function OtpVerificationScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Error", "Please complete OTP");
      return;
    }
    setLoading(true);
    try {
      router.push("/(auth)/account-created-success");
    } catch (err) {
      Alert.alert("Error", "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setCountdown(COUNTDOWN_SECONDS);
    setCanResend(false);
    setOtp("");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="flex-1 px-6 pt-8">
        <Text className="text-primary text-2xl font-bold">
          OTP Verification
        </Text>
        <Text className="text-text-secondary mt-2 mb-8">
          Enter the 6-digit code sent to your email
        </Text>

        <OtpInput value={otp} onChangeText={setOtp} length={6} />

        <View className="mt-8">
          <PrimaryButton
            label="Verify"
            fullWidth
            onPress={handleVerify}
            loading={loading}
          />
        </View>

        <View className="mt-6 items-center">
          {canResend ? (
            <Pressable onPress={handleResend}>
              <Text className="text-accent font-semibold">Resend OTP</Text>
            </Pressable>
          ) : (
            <Text className="text-text-muted text-sm">
              Resend code in {countdown}s
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
