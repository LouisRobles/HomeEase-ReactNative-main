import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import StepperVertical from "../../../../components/steppers/StepperVertical";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import { useWorkerStore } from "../../../../store/workerStore";
import { colors } from "../../../../constants";

export default function JobDetailScreen() {
  const router = useRouter();
  const { jobId } = useLocalSearchParams<{ jobId: string }>();
  const jobRequests = useWorkerStore((s) => s.jobRequests);
  const updateRequestStatus = useWorkerStore((s) => s.updateRequestStatus);

  const job = jobRequests.find((r) => r.id === jobId);

  if (!job) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Job Detail" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Job not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isInProgress = job.status === "Accepted";
  const isCompleted = job.status === "Completed";

  const steps = [
    {
      label: "Accepted",
      timestamp: job.date,
      status: "done" as const,
    },
    {
      label: "In Progress",
      timestamp: "",
      status: isCompleted ? ("done" as const) : ("active" as const),
    },
    {
      label: "Completed",
      timestamp: "",
      status: isCompleted ? ("done" as const) : ("pending" as const),
    },
  ];

  const handleMarkComplete = () => {
    Alert.alert(
      "Mark as Complete?",
      "Confirm that you have finished this job. The client will be notified.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: () => {
            updateRequestStatus(job.id, "Completed");
            Alert.alert(
              "Job Completed!",
              "Great work! The client has been notified and payment will be released.",
              [{ text: "OK", onPress: () => router.back() }],
            );
          },
        },
      ],
    );
  };

  const handleMessageClient = () => {
    router.push("/(worker)/inbox/chat/c1");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Job Detail" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Status */}
        <View className="items-center mb-4">
          <StatusBadge
            status={
              isCompleted ? "Completed" : isInProgress ? "Active" : "Accepted"
            }
          />
        </View>

        {/* Job Info */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-primary font-bold text-lg">{job.service}</Text>
          <Text className="text-text-secondary text-sm mt-1">
            Client: {job.client}
          </Text>
          <Text className="text-text-muted text-xs mt-1">Date: {job.date}</Text>
        </View>

        {/* Earnings */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-text-secondary text-xs mb-1">
            Your Earnings
          </Text>
          <Text className="text-success font-bold text-2xl">
            ₱{(job.amount * 0.9).toFixed(2)}
          </Text>
          <Text className="text-text-muted text-xs mt-1">
            After 10% platform fee from ₱{job.amount}.00
          </Text>
        </View>

        {/* Progress Stepper */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-primary font-bold mb-3">Job Progress</Text>
          <StepperVertical steps={steps} />
        </View>

        {/* Actions */}
        <View className="gap-3 mt-4">
          {isInProgress && (
            <PrimaryButton
              label="Mark as Complete"
              fullWidth
              onPress={handleMarkComplete}
            />
          )}
          {isCompleted && (
            <View className="bg-success/10 border border-success rounded-2xl p-4 items-center">
              <Text className="text-success font-semibold">
                This job has been completed.
              </Text>
              <Text className="text-text-secondary text-xs mt-1">
                Payment will be released to your account.
              </Text>
            </View>
          )}
          <OutlinedButton
            label="Message Client"
            onPress={handleMessageClient}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
