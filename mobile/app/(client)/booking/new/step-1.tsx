import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import ServiceTypePickerBottomSheet from "../../../../components/bottom-sheets/ServiceTypePickerBottomSheet";
import { useBookingStore } from "../../../../store/bookingStore";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";

export default function BookingStep1Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [category, setCategory] = useState<string | null>(draft.category);
  const [description, setDescription] = useState(draft.description);
  const addressSet = !!draft.address;
  const serviceSheetRef = useRef<BottomSheetHandle | null>(null);

  const canNext = category && addressSet;

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Book a Service" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["Service", "Schedule", "Payment"]}
          currentStep={0}
        />
        <Text className="text-primary font-bold text-lg mt-4">
          Service Details
        </Text>

        <Pressable
          className="bg-card rounded-xl p-4 mt-3 flex-row items-center justify-between"
          onPress={() => serviceSheetRef.current?.expand()}
        >
          <Text
            className={
              category ? "text-primary font-semibold" : "text-text-muted"
            }
          >
            {category ?? "Select service category"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#A0A8D0" />
        </Pressable>

        <InputField
          label="Description"
          value={description}
          onChangeText={(t) => {
            setDescription(t);
            setDraft({ description: t });
          }}
          placeholder="Describe what you need..."
          multiline
        />

        <Text className="text-text-secondary text-sm mb-1">Address</Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row items-center"
          onPress={() => router.push("/(client)/booking/address-picker")}
        >
          <Ionicons name="location-outline" size={20} color="#4B5FD6" />
          <Text
            className={
              addressSet
                ? "text-primary ml-3 flex-1"
                : "text-text-muted ml-3 flex-1"
            }
          >
            {addressSet ? draft.address! : "Tap to set your location"}
          </Text>
        </Pressable>

        <View className="mt-8">
          <PrimaryButton
            label="Next"
            fullWidth
            disabled={!canNext}
            onPress={() => {
              if (!canNext) {
                Alert.alert("Error", "Please select category and address");
                return;
              }
              setDraft({ category, description });
              router.push("/(client)/booking/new/step-2");
            }}
          />
        </View>
      </ScrollView>
      <ServiceTypePickerBottomSheet
        innerRef={serviceSheetRef}
        onSelect={(name) => {
          setCategory(name);
          setDraft({ category: name });
          serviceSheetRef.current?.close();
        }}
      />
    </SafeAreaView>
  );
}
