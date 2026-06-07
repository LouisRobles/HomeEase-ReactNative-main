import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import StepperVertical from "../../../../components/steppers/StepperVertical";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function JobDetailScreen() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const [jobStatus, setJobStatus] = useState<string>("In Progress");

  const getSteps = () => {
    if (jobStatus === "Completed") {
      return [
        { label: "Accepted", timestamp: "Mar 1", status: "done" as const },
        { label: "In Progress", timestamp: "", status: "done" as const },
        { label: "Completed", timestamp: "", status: "done" as const },
      ];
    }
    return [
      { label: "Accepted", timestamp: "Mar 1", status: "done" as const },
      { label: "In Progress", timestamp: "", status: "active" as const },
      { label: "Completed", timestamp: "", status: "pending" as const },
    ];
  };

  const steps = getSteps();

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
        {jobStatus === "In Progress" ? (
          <PrimaryButton
            label="Mark as Complete"
            fullWidth
            onPress={() => {
              setJobStatus("Completed");
              Alert.alert("Job marked as complete!");
            }}
          />
        ) : (
          <View className="mt-4">
            <Text className="text-success text-center font-semibold text-primary">
              This job has been completed.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
