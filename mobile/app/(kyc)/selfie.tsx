import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useAuthStore } from "../../store/authStore";

export default function SelfieScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [captured, setCaptured] = useState(false);
  const isWorker = user?.role === "worker";

  const handleTakeSelfie = () => {
    setCaptured(true);
  };

  const handleContinue = () => {
    if (isWorker) {
      router.push("/(kyc)/certifications");
    } else {
      router.push("/(kyc)/pending");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Take a Selfie" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["ID Upload", "Selfie", "Certs"]}
          currentStep={1}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 2 of 3</Text>

        {/* TODO: Replace with live camera feed using expo-camera */}
        <View className="w-full h-72 bg-card-dark rounded-2xl items-center justify-center mb-4">
          <View className="w-48 h-56 border-4 border-white rounded-full items-center justify-center">
            <Ionicons name="person" size={80} color="#A0A8D0" />
          </View>
          <Text className="text-text-secondary mt-2">
            Position your face within the oval
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-2 mb-6">
          {["Good lighting", "Face forward", "No glasses"].map((tip) => (
            <View key={tip} className="bg-card-light rounded-full px-3 py-2">
              <Text className="text-text-secondary text-xs">{tip}</Text>
            </View>
          ))}
        </View>

        {!captured ? (
          <PrimaryButton
            label="Take Selfie"
            fullWidth
            onPress={handleTakeSelfie}
          />
        ) : (
          <View className="gap-3">
            <PrimaryButton
              label="Continue"
              fullWidth
              onPress={handleContinue}
            />
            <PrimaryButton
              label="Retake"
              fullWidth
              onPress={() => setCaptured(false)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
