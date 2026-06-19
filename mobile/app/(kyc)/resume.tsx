import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import UploadCard from "../../components/ui/UploadCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlinedButton from "../../components/ui/OutlinedButton";
import ErrorBanner from "../../components/ui/ErrorBanner";
import { useImageUpload } from "../../hooks/useImageUpload";
import { colors } from "../../constants";

export default function ResumeScreen() {
  const router = useRouter();
  const resumeUpload = useImageUpload();
  const [uploading, setUploading] = useState(false);

  const handlePickResume = async () => {
    setUploading(true);
    try {
      const result = await resumeUpload.pickFromGallery();
      if (result) {
        Alert.alert("Success", "Resume uploaded and compressed");
      }
    } finally {
      setUploading(false);
    }
  };

  const bulletPoints = [
    "Work experience and employment history",
    "Relevant skills and certifications",
    "Educational background",
    "Years of experience in your trade",
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Resume" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["ID", "Selfie", "Certs", "Resume"]}
          currentStep={3}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 4 of 4</Text>

        <View className="bg-card rounded-xl p-4 mb-6">
          <Text className="text-primary font-bold mb-2">
            Why we need your resume
          </Text>
          <Text className="text-text-secondary text-sm">
            Your resume helps clients understand your experience, skills, and
            professional background. It will be visible on your public profile.
          </Text>
        </View>

        <ErrorBanner
          message={resumeUpload.error}
          onDismiss={resumeUpload.clearError}
        />
        <UploadCard
          label="Tap to upload your resume (PDF or image)"
          onPress={handlePickResume}
          preview={resumeUpload.uri ? "Resume uploaded" : undefined}
        />

        {resumeUpload.uri && resumeUpload.compressionRatio && (
          <Text className="text-xs text-text-secondary mt-1 ml-2">
            Compressed by {resumeUpload.compressionRatio}%
          </Text>
        )}

        <View className="mt-4 mb-6">
          <Text className="text-text-secondary text-sm font-semibold mb-2">
            Your resume should include:
          </Text>
          {bulletPoints.map((point, index) => (
            <View key={index} className="flex-row items-start mb-2">
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.success}
                style={{ marginTop: 2 }}
              />
              <Text className="text-text-secondary text-sm ml-2 flex-1">
                {point}
              </Text>
            </View>
          ))}
        </View>

        <PrimaryButton
          label="Submit for Verification"
          disabled={!resumeUpload.uri}
          loading={uploading}
          fullWidth
          onPress={() => router.push("/(kyc)/contract")}
        />
        <View className="mt-3">
          <OutlinedButton
            label="Skip for Now"
            onPress={() => router.push("/(kyc)/contract")}
          />
        </View>
        <Pressable
          className="mt-4 items-center"
          onPress={() => router.push("/(worker)/profile/resume-preview")}
        >
          <View className="flex-row items-center">
            <Ionicons
              name="sparkles-outline"
              size={16}
              color={colors.accent.DEFAULT}
            />
            <Text className="text-accent text-sm ml-1 font-semibold">
              Preview AI Analysis Result
            </Text>
          </View>
          <Text className="text-text-muted text-xs mt-1 text-center">
            See how AI will parse your resume
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
