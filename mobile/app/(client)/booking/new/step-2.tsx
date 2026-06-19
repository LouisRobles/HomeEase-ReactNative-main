import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import BookingCalendar from "../../../../components/ui/BookingCalendar";
import { useBookingStore } from "../../../../store/bookingStore";
import { workers } from "../../../../constants/dummyData";

export default function BookingStep2Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [date, setDate] = useState(draft.date ?? "");
  const [instructions, setInstructions] = useState(draft.instructions ?? "");

  const canNext = !!date;

  const selectedWorker = workers.find((w) => w.id === draft.workerId);

  const getWorkerLabel = () => {
    if (!draft.workerId) return "Any available worker";
    return selectedWorker?.name ?? "Select a worker";
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Schedule" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["Service", "Schedule", "Payment"]}
          currentStep={1}
        />

        {/* Service summary */}
        <View className="bg-card rounded-2xl p-4 mt-4 mb-2">
          <Text className="text-primary font-bold mb-2">Service Summary</Text>
          <Text className="text-text-secondary text-sm">
            {draft.category ?? "No category selected"}
          </Text>
          {draft.estimatedPrice > 0 && (
            <Text className="text-accent text-sm font-semibold mt-1">
              Estimated: ₱{draft.estimatedPrice}
            </Text>
          )}
        </View>

        {/* Calendar */}
        <Text className="text-primary font-bold text-lg mt-4 mb-3">
          Select a date
        </Text>
        <BookingCalendar
          workerId={draft.workerId}
          selectedDate={date}
          onDateSelect={(d) => {
            setDate(d);
            setDraft({ date: d });
          }}
        />

        {/* Worker selection */}
        <Text className="text-primary font-bold text-base mb-2 mt-2">
          Preferred Worker
        </Text>
        <View className="bg-card rounded-2xl p-4 mb-4">
          {draft.workerId && selectedWorker ? (
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-primary font-semibold">
                  {selectedWorker.name}
                </Text>
                <Text className="text-text-secondary text-xs">
                  {selectedWorker.service} · ₱{selectedWorker.rate}/hr
                </Text>
              </View>
              <OutlinedButton
                label="Change"
                onPress={() => router.push("/(client)/booking/select-worker")}
              />
            </View>
          ) : (
            <View>
              <Text className="text-text-secondary text-sm mb-3">
                Any available worker will be assigned to your booking. You can
                optionally choose a specific worker.
              </Text>
              <OutlinedButton
                label="Choose a Worker"
                onPress={() => router.push("/(client)/booking/select-worker")}
              />
            </View>
          )}
        </View>

        {/* Special instructions */}
        <InputField
          label="Special instructions (optional)"
          value={instructions}
          onChangeText={(t) => {
            setInstructions(t);
            setDraft({ instructions: t });
          }}
          placeholder="Any special requests or notes for the worker..."
          multiline
        />

        <View className="mt-8">
          <PrimaryButton
            label="Next"
            fullWidth
            disabled={!canNext}
            onPress={() => {
              if (!canNext) {
                Alert.alert(
                  "Select a Date",
                  "Please select a date to continue.",
                );
                return;
              }
              setDraft({ date, instructions });
              router.push("/(client)/booking/new/step-3");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
