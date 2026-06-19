import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { useAuthStore } from "../../store/authStore";
import { colors } from "../../constants";

export default function SelfieScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const isWorker = user?.role === "worker";

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleTakeSelfie = async () => {
    if (!permission?.granted) {
      Alert.alert(
        "Camera Permission",
        "Camera permission is required to take a selfie",
      );
      return;
    }
    setCameraActive(true);
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
        skipProcessing: false,
      });

      if (photo?.uri) {
        setCapturedUri(photo.uri);
        setCameraActive(false);
      }
    } catch {
      Alert.alert("Error", "Failed to capture photo. Please try again.");
    }
  };

  const handleContinue = () => {
    if (isWorker) {
      router.push("/(kyc)/certifications");
    } else {
      router.push("/(kyc)/contract");
    }
  };

  const handleRetake = () => {
    setCapturedUri(null);
    setCameraActive(false);
  };

  // Camera view
  if (cameraActive && permission?.granted) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <CameraView ref={cameraRef} facing="front" style={{ flex: 1 }} />
        <View className="absolute bottom-8 left-0 right-0 flex-row justify-between items-center px-8">
          <Pressable
            className="w-12 h-12 rounded-full bg-black/40 items-center justify-center"
            onPress={() => setCameraActive(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>

          <Pressable
            className="w-20 h-20 rounded-full border-4 border-white items-center justify-center"
            onPress={handleCapture}
          >
            <View className="w-16 h-16 rounded-full bg-white" />
          </Pressable>

          <View className="w-12" />
        </View>

        {/* Oval guide overlay */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View className="w-48 h-56 border-4 border-white/30 rounded-full" />
          <Text className="text-white text-sm mt-8">
            Position your face within the oval
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Preview/selection view
  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Take a Selfie" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["ID", "Selfie", "Certs", "Resume"]}
          currentStep={1}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 2 of 4</Text>

        {capturedUri ? (
          <View className="w-full h-72 bg-card-dark rounded-2xl overflow-hidden mb-4">
            <Text className="absolute z-10 top-2 left-2 text-green-500 font-semibold bg-black/50 px-2 py-1 rounded text-xs">
              ✓ Captured
            </Text>
          </View>
        ) : (
          <View className="w-full h-72 bg-card-dark rounded-2xl items-center justify-center mb-4">
            <View className="w-48 h-56 border-4 border-white rounded-full items-center justify-center">
              <Ionicons name="person" size={80} color={colors.text.muted} />
            </View>
            <Text className="text-text-secondary mt-2">
              Position your face within the oval
            </Text>
          </View>
        )}

        <View className="flex-row flex-wrap gap-2 mb-6">
          {["Good lighting", "Face forward", "No glasses"].map((tip) => (
            <View key={tip} className="bg-card-light rounded-full px-3 py-2">
              <Text className="text-text-secondary text-xs">{tip}</Text>
            </View>
          ))}
        </View>

        {!capturedUri ? (
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
            <PrimaryButton label="Retake" fullWidth onPress={handleRetake} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
