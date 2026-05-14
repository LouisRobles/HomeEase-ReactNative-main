import React, { useState, useRef } from "react";
import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import InputField from "../../../../components/ui/InputField";
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
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [customTip, setCustomTip] = useState<string>("");
  const [showCustomTip, setShowCustomTip] = useState(false);
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

  const BASE_AMOUNT = draft.estimatedPrice > 0 ? draft.estimatedPrice : 400;
  const TAX_RATE = 0.12;
  const taxAmount = parseFloat((BASE_AMOUNT * TAX_RATE).toFixed(2));
  const serviceFee = parseFloat((BASE_AMOUNT * 0.1).toFixed(2));
  const total = parseFloat(
    (BASE_AMOUNT + taxAmount + serviceFee + tipAmount).toFixed(2),
  );

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

        <Text className="text-text-secondary text-sm mb-1 mt-4">Add a Tip</Text>
        <View className="flex-row gap-2 flex-wrap mt-1">
          {[0, 20, 50, 100].map((amount) => (
            <Pressable
              key={amount}
              className={
                tipAmount === amount
                  ? "bg-accent rounded-xl px-4 py-2"
                  : "bg-card rounded-xl px-4 py-2"
              }
              onPress={() => {
                setTipAmount(amount);
                setShowCustomTip(false);
                setCustomTip("");
                setDraft({ tip: amount });
              }}
            >
              <Text
                className={
                  tipAmount === amount
                    ? "text-primary font-semibold text-sm"
                    : "text-text-secondary text-sm"
                }
              >
                {amount === 0 ? "No Tip" : `₱${amount}`}
              </Text>
            </Pressable>
          ))}
          <Pressable
            className={
              showCustomTip
                ? "bg-accent rounded-xl px-4 py-2"
                : "bg-card rounded-xl px-4 py-2"
            }
            onPress={() => setShowCustomTip(true)}
          >
            <Text
              className={
                showCustomTip
                  ? "text-primary font-semibold text-sm"
                  : "text-text-secondary text-sm"
              }
            >
              Custom
            </Text>
          </Pressable>
        </View>

        {showCustomTip && (
          <View className="mt-3">
            <InputField
              label=""
              value={customTip}
              onChangeText={(value) => {
                setCustomTip(value);
                const parsedValue = parseFloat(value) || 0;
                setTipAmount(parsedValue);
                setDraft({ tip: parsedValue });
              }}
              placeholder="Enter custom amount"
              keyboardType="numeric"
            />
          </View>
        )}

        <View className="bg-card rounded-2xl p-4 mt-6">
          <Text className="text-primary font-bold mb-3">Order Summary</Text>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-text-secondary text-sm">Service Fee</Text>
            <Text className="text-primary text-sm">₱{BASE_AMOUNT}.00</Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-text-secondary text-sm">VAT (12%)</Text>
            <Text className="text-primary text-sm">₱{taxAmount}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-text-secondary text-sm">
              Platform Fee (10%)
            </Text>
            <Text className="text-primary text-sm">₱{serviceFee}</Text>
          </View>
          {tipAmount > 0 && (
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-text-secondary text-sm">Tip</Text>
              <Text className="text-primary text-sm">₱{tipAmount}.00</Text>
            </View>
          )}
          <View className="border-b border-divider my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-primary font-bold text-base">Total</Text>
            <Text className="text-accent font-bold text-lg">₱{total}</Text>
          </View>
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
