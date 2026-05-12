import React, { useRef, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import UploadCard from "../../components/ui/UploadCard";
import PrimaryButton from "../../components/ui/PrimaryButton";
import ImageSourcePickerBottomSheet from "../../components/bottom-sheets/ImageSourcePickerBottomSheet";
import type { BottomSheetHandle } from "../../components/bottom-sheets/BottomSheetWrapper";

export default function UploadIdScreen() {
  const router = useRouter();
  const sheetRef = useRef<BottomSheetHandle | null>(null);
  const [frontUri, setFrontUri] = useState<string | null>(null);
  const [backUri, setBackUri] = useState<string | null>(null);
  const [activeUpload, setActiveUpload] = useState<"front" | "back" | null>(
    null,
  );

  const openPicker = (which: "front" | "back") => {
    setActiveUpload(which);
    sheetRef.current?.expand();
  };

  const handleSelect = (uri: string) => {
    if (activeUpload === "front") setFrontUri(uri);
    else if (activeUpload === "back") setBackUri(uri);
    setActiveUpload(null);
  };

  const canContinue = !!frontUri && !!backUri;

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Government ID" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["ID Upload", "Selfie", "Certs"]}
          currentStep={0}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 1 of 3</Text>

        <UploadCard
          label="Tap to upload front of ID"
          onPress={() => openPicker("front")}
          preview={frontUri ? "Front uploaded" : undefined}
        />
        <View className="mt-4">
          <UploadCard
            label="Tap to upload back of ID"
            onPress={() => openPicker("back")}
            preview={backUri ? "Back uploaded" : undefined}
          />
        </View>

        <View className="mt-8">
          <PrimaryButton
            label="Continue"
            fullWidth
            disabled={!canContinue}
            onPress={() => router.push("/(kyc)/selfie")}
          />
        </View>
      </ScrollView>
      <ImageSourcePickerBottomSheet
        innerRef={sheetRef}
        onSelect={handleSelect}
      />
    </SafeAreaView>
  );
}
