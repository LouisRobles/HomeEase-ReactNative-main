import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import StepperVertical from "../../../../components/steppers/StepperVertical";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function JobDetailScreen() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId: string }>();

  const steps = [
    { label: "Accepted", timestamp: "Mar 1", status: "done" as const },
    { label: "In Progress", timestamp: "", status: "active" as const },
    { label: "Completed", timestamp: "", status: "pending" as const },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Job" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <View className="items-center mb-4">
          <StatusBadge status="Active" />
        </View>
        <View className="bg-card rounded-2xl p-4 mb-3">
          <StepperVertical steps={steps} />
        </View>
        <PrimaryButton
          label="Start Job"
          fullWidth
          onPress={() => {
            require("react-native").Alert.alert("Job Started!");
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
