import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlinedButton from "../../components/ui/OutlinedButton";
import EmptyState from "../../components/feedback/EmptyState";

type Cert = { id: string; name: string; issuer: string };

export default function CertificationsScreen() {
  const router = useRouter();
  const [certs, setCerts] = useState<Cert[]>([]);

  const handleAdd = () => {
    setCerts((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Certification ${prev.length + 1}`,
        issuer: "Issuing Org",
      },
    ]);
  };

  const handleSubmit = () => {
    // For demo, allow submission even without certs (workers can add later)
    // In production, require at least one certification
    router.push("/(kyc)/pending");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Certifications" showBack />
      <View className="flex-1 px-4">
        <StepperHorizontal
          steps={["ID Upload", "Selfie", "Certs"]}
          currentStep={2}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 3 of 3</Text>

        {certs.length === 0 ? (
          <EmptyState
            title="No certifications yet"
            subtitle="Add at least one certification to proceed"
            actionLabel="Add Certification"
            onAction={handleAdd}
          />
        ) : (
          <FlatList
            data={certs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-card rounded-2xl p-4 mb-3">
                <Text className="text-primary font-bold">{item.name}</Text>
                <Text className="text-text-secondary text-sm">
                  {item.issuer}
                </Text>
              </View>
            )}
          />
        )}

        {certs.length > 0 && (
          <View className="py-4 gap-3">
            <OutlinedButton label="Add Certification" onPress={handleAdd} />
          </View>
        )}

        <View className="py-4">
          <PrimaryButton
            label="Submit for Verification"
            fullWidth
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
