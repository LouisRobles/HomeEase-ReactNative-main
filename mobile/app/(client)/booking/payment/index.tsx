import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import { useBookingStore } from "../../../../store/bookingStore";

export default function PaymentScreen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const processPayment = useBookingStore((s) => s.processPayment);
  const [accountValue, setAccountValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const method = draft.paymentMethod;

  const methodLabel =
    method === "gcash"
      ? "GCash"
      : method === "maya"
        ? "Maya"
        : method === "bank"
          ? "Bank Transfer"
          : method === "cash"
            ? "Cash"
            : null;

  const amount = 400; // Mock amount aligned with other booking screens

  const handleSubmit = async () => {
    if (!method) {
      Alert.alert("Payment method", "Please select a payment method first.");
      router.back();
      return;
    }

    const requiresInput =
      method === "gcash" || method === "maya" || method === "bank";
    if (requiresInput && !accountValue.trim()) {
      Alert.alert(
        "Payment details",
        "Please enter the required payment details for this method.",
      );
      return;
    }

    try {
      setSubmitting(true);
      await processPayment(method, amount);
      router.replace("/(client)/booking/payment/success");
    } catch (e) {
      Alert.alert(
        "Payment failed",
        "Unable to process your payment. Please try again.",
      );
      router.replace("/(client)/booking/payment/failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <Text className="text-primary text-2xl font-bold mb-4">Payment</Text>

        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-semibold mb-1">
            Booking Summary
          </Text>
          <Text className="text-text-secondary text-sm">
            Service: {draft.category ?? "Selected service"}
          </Text>
          <Text className="text-text-secondary text-sm">
            Address: {draft.address ?? "Selected address"}
          </Text>
          <Text className="text-text-secondary text-sm">
            Date: {draft.date ?? "Date"} · Time: {draft.time ?? "Time"}
          </Text>
          <View className="flex-row justify-between items-center mt-3">
            <Text className="text-text-secondary text-sm">Total Amount</Text>
            <Text className="text-accent font-bold text-lg">
              ₱{amount.toFixed(2)}
            </Text>
          </View>
        </View>

        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-text-secondary text-sm">Payment Method</Text>
          <Text className="text-primary font-semibold mt-1">
            {methodLabel ?? "Not selected"}
          </Text>
        </View>

        {method === "gcash" && (
          <View className="bg-card rounded-2xl p-4 mb-4">
            <Text className="text-primary font-semibold mb-2">
              GCash Details
            </Text>
            <Text className="text-text-secondary text-xs mb-2">
              Enter the mobile number linked to your GCash account.
            </Text>
            <TextInput
              className="bg-card-dark rounded-xl px-3 py-2 text-primary"
              placeholder="09XXXXXXXXX"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              value={accountValue}
              onChangeText={setAccountValue}
            />
          </View>
        )}

        {method === "maya" && (
          <View className="bg-card rounded-2xl p-4 mb-4">
            <Text className="text-primary font-semibold mb-2">
              Maya Details
            </Text>
            <Text className="text-text-secondary text-xs mb-2">
              Enter the mobile number linked to your Maya account.
            </Text>
            <TextInput
              className="bg-card-dark rounded-xl px-3 py-2 text-primary"
              placeholder="09XXXXXXXXX"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              value={accountValue}
              onChangeText={setAccountValue}
            />
          </View>
        )}

        {method === "bank" && (
          <View className="bg-card rounded-2xl p-4 mb-4">
            <Text className="text-primary font-semibold mb-2">
              Bank Transfer Details
            </Text>
            <Text className="text-text-secondary text-xs mb-2">
              Enter the reference or account number you&apos;ll use for the
              transfer.
            </Text>
            <TextInput
              className="bg-card-dark rounded-xl px-3 py-2 text-primary"
              placeholder="Reference / Account Number"
              placeholderTextColor="#6B7280"
              value={accountValue}
              onChangeText={setAccountValue}
            />
          </View>
        )}

        {method === "cash" && (
          <View className="bg-card rounded-2xl p-4 mb-4">
            <Text className="text-primary font-semibold mb-2">
              Cash Payment
            </Text>
            <Text className="text-text-secondary text-xs">
              You&apos;ll pay the worker in cash after the service is completed.
            </Text>
          </View>
        )}

        <View className="mt-4 gap-3">
          <PrimaryButton
            label="Confirm & Pay"
            fullWidth
            loading={submitting}
            disabled={submitting || !method}
            onPress={handleSubmit}
          />
          <OutlinedButton
            label="Back to Review"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
