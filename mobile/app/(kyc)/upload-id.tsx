import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import UploadCard from "../../components/ui/UploadCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ErrorBanner from "../../components/ui/ErrorBanner";
import { useImageUpload } from "../../hooks/useImageUpload";

export default function UploadIdScreen() {
  const router = useRouter();
  const frontUpload = useImageUpload();
  const backUpload = useImageUpload();
  const [uploadingWhich, setUploadingWhich] = useState<"front" | "back" | null>(
    null,
  );

  const handlePickFront = async () => {
    setUploadingWhich("front");
    try {
      const result = await frontUpload.pickFromCamera();
      if (result) {
        Alert.alert("Success", "Front of ID captured and compressed");
      }
    } finally {
      setUploadingWhich(null);
    }
  };

  const handlePickBack = async () => {
    setUploadingWhich("back");
    try {
      const result = await backUpload.pickFromCamera();
      if (result) {
        Alert.alert("Success", "Back of ID captured and compressed");
      }
    } finally {
      setUploadingWhich(null);
    }
  };

  const canContinue = !!frontUpload.uri && !!backUpload.uri;

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Government ID" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["ID", "Selfie", "Certs", "Resume"]}
          currentStep={0}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 1 of 4</Text>

        {/* Front ID Upload */}
        <ErrorBanner
          message={frontUpload.error}
          onDismiss={frontUpload.clearError}
        />
        <UploadCard
          label="Tap to upload front of ID"
          onPress={handlePickFront}
          preview={frontUpload.uri ? "Front uploaded" : undefined}
        />
        {frontUpload.uri && frontUpload.compressionRatio && (
          <Text className="text-xs text-text-secondary mt-1 ml-2">
            Compressed by {frontUpload.compressionRatio}%
          </Text>
        )}

        {/* Back ID Upload */}
        <View className="mt-4">
          <ErrorBanner
            message={backUpload.error}
            onDismiss={backUpload.clearError}
          />
          <UploadCard
            label="Tap to upload back of ID"
            onPress={handlePickBack}
            preview={backUpload.uri ? "Back uploaded" : undefined}
          />
          {backUpload.uri && backUpload.compressionRatio && (
            <Text className="text-xs text-text-secondary mt-1 ml-2">
              Compressed by {backUpload.compressionRatio}%
            </Text>
          )}
        </View>

        <View className="mt-8">
          <PrimaryButton
            label="Continue"
            fullWidth
            disabled={!canContinue || frontUpload.loading || backUpload.loading}
            loading={uploadingWhich === "front" || uploadingWhich === "back"}
            onPress={() => router.push("/(kyc)/selfie")}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
