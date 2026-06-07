import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import BookingCalendar from "../../../../components/ui/BookingCalendar";
import { useBookingStore } from "../../../../store/bookingStore";

export default function BookingStep2Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [date, setDate] = useState(draft.date ?? "");
  const [instructions, setInstructions] = useState(draft.instructions ?? "");

  const getWorkerLabel = () => {
    if (!draft.workerId) return "Any available worker";
    const workers = require("../../../../constants/dummyData").workers;
    const worker = workers.find((w: any) => w.id === draft.workerId);
    return worker ? worker.name : "Select a worker";
  };

  const canNext = !!date;

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
          <Text className="text-text-secondary text-sm">{draft.category}</Text>
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

        {/* Special instructions */}
        <InputField
          label="Special instructions (optional)"
          value={instructions}
          onChangeText={(t) => {
            setInstructions(t);
            setDraft({ instructions: t });
          }}
          placeholder="Any special requests..."
          multiline
        />

        {/* Select worker */}
        {/* <Text className="text-text-secondary text-sm mb-1">Select Worker</Text>
        <View className="bg-card rounded-xl p-4 flex-row justify-between">
          <Text
            className="text-primary"
            onPress={() => router.push("/(client)/booking/select-worker")}
          >
            {getWorkerLabel()}
          </Text>
        </View> */}

        <View className="mt-8">
          <PrimaryButton
            label="Next"
            fullWidth
            disabled={!canNext}
            onPress={() => {
              if (!canNext) {
                Alert.alert("Please select a date to continue.");
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
