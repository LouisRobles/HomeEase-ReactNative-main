import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { useBookingStore } from "../../../../store/bookingStore";
import PaymentMethodBottomSheet from "../../../../components/bottom-sheets/PaymentMethodBottomSheet";
import GenericConfirmationModal from "../../../../components/modals/GenericConfirmationModal";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";

export default function BookingStep3Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(
    draft.paymentMethod,
  );
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const paymentRef = useRef<BottomSheetHandle | null>(null);

  const paymentLabel =
    paymentMethod === "gcash"
      ? "GCash"
      : paymentMethod === "maya"
        ? "Maya"
        : paymentMethod === "bank"
          ? "Bank Transfer"
          : paymentMethod === "cash"
            ? "Cash"
            : null;

  const handleConfirmBooking = () => {
    setConfirmVisible(true);
  };

  const onConfirm = async () => {
    setConfirmVisible(false);
    setLoading(true);
    try {
      router.push("/(client)/booking/payment");
    } catch (err) {
      Alert.alert("Error", "Failed to process booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Review & Payment" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["Service", "Schedule", "Payment"]}
          currentStep={2}
        />
        <View className="bg-card rounded-2xl p-4 mt-4">
          <Text className="text-primary font-bold mb-2">Summary</Text>
          <Text className="text-text-secondary text-sm">
            Service: {draft.category}
          </Text>
          <Text className="text-text-secondary text-sm">
            Address: {draft.address}
          </Text>
          <Text className="text-text-secondary text-sm">
            Date: {draft.date} · Time: {draft.time}
          </Text>
        </View>

        <Text className="text-text-secondary text-sm mb-1 mt-4">
          Payment Method
        </Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row justify-between"
          onPress={() => paymentRef.current?.expand()}
        >
          <Text
            className={
              paymentLabel ? "text-primary font-semibold" : "text-text-muted"
            }
          >
            {paymentLabel ?? "Select payment method"}
          </Text>
        </Pressable>

        <View className="flex-row justify-between items-center mt-6">
          <Text className="text-primary font-bold">Total</Text>
          <Text className="text-accent font-bold text-lg">₱400.00</Text>
        </View>

        <View className="mt-8">
          <PrimaryButton
            label="Confirm Booking"
            fullWidth
            disabled={!paymentMethod || loading}
            loading={loading}
            onPress={() => {
              if (!paymentMethod) {
                Alert.alert("Error", "Please select a payment method");
                return;
              }
              handleConfirmBooking();
            }}
          />
        </View>
      </ScrollView>
      <PaymentMethodBottomSheet
        innerRef={paymentRef}
        onSelect={(m) => {
          setPaymentMethod(m);
          setDraft({ paymentMethod: m });
        }}
      />
      <GenericConfirmationModal
        visible={confirmVisible}
        title="Confirm booking?"
        message="You are about to confirm this booking and proceed to payment."
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        onConfirm={onConfirm}
        onCancel={() => setConfirmVisible(false)}
      />
    </SafeAreaView>
  );
}
