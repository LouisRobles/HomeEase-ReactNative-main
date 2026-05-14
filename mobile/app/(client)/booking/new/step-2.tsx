import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { useBookingStore } from "../../../../store/bookingStore";
import DateTimePickerBottomSheet from "../../../../components/bottom-sheets/DateTimePickerBottomSheet";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";

export default function BookingStep2Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [date, setDate] = useState(draft.date ?? "");
  const [time, setTime] = useState(draft.time ?? "");
  const [instructions, setInstructions] = useState(draft.instructions ?? "");
  const [selectedWorkerId, setSelectedWorkerId] = useState(draft.workerId);
  const dateRef = useRef<BottomSheetHandle | null>(null);
  const timeRef = useRef<BottomSheetHandle | null>(null);

  const getWorkerLabel = () => {
    if (!selectedWorkerId) return "Any available worker";
    const workers = require("../../../../constants/dummyData").workers;
    const worker = workers.find((w: any) => w.id === selectedWorkerId);
    return worker ? worker.name : "Select a worker";
  };

  const canNext = !!date && !!time;

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
        <View className="bg-card rounded-2xl p-4 mt-4 mb-2">
          <Text className="text-primary font-bold mb-2">Service Summary</Text>
          <Text className="text-text-secondary text-sm">{draft.category}</Text>
          {draft.estimatedPrice > 0 && (
            <Text className="text-accent text-sm font-semibold mt-1">
              Estimated: ₱{draft.estimatedPrice}
            </Text>
          )}
        </View>
        <Text className="text-primary font-bold text-lg mt-4">Schedule</Text>

        <Text className="text-text-secondary text-sm mb-1 mt-3">Date</Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row justify-between"
          onPress={() => dateRef.current?.expand()}
        >
          <Text className={date ? "text-primary" : "text-text-muted"}>
            {date || "Select date"}
          </Text>
        </Pressable>

        <Text className="text-text-secondary text-sm mb-1 mt-3">Time</Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row justify-between"
          onPress={() => timeRef.current?.expand()}
        >
          <Text className={time ? "text-primary" : "text-text-muted"}>
            {time || "Select time"}
          </Text>
        </Pressable>

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

        <Text className="text-text-secondary text-sm mb-1">Select Worker</Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row justify-between"
          onPress={() => router.push("/(client)/booking/select-worker")}
        >
          <Text className="text-primary">{getWorkerLabel()}</Text>
        </Pressable>

        <View className="mt-8">
          <PrimaryButton
            label="Next"
            fullWidth
            disabled={!canNext}
            onPress={() => {
              if (!canNext) {
                Alert.alert("Error", "Please select date and time");
                return;
              }
              setDraft({ date, time, instructions });
              router.push("/(client)/booking/new/step-3");
            }}
          />
        </View>
      </ScrollView>
      <DateTimePickerBottomSheet
        innerRef={dateRef}
        mode="date"
        onSelect={(v) => {
          setDate(v);
          setDraft({ date: v });
        }}
      />
      <DateTimePickerBottomSheet
        innerRef={timeRef}
        mode="time"
        onSelect={(v) => {
          setTime(v);
          setDraft({ time: v });
        }}
      />
    </SafeAreaView>
  );
}
