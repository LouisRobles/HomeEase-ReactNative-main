import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import DangerButton from "../../../../components/ui/DangerButton";
import GenericConfirmationModal from "../../../../components/modals/GenericConfirmationModal";
import { useBookingStore } from "../../../../store/bookingStore";

const REASONS = [
  "Changed my mind",
  "Worker taking too long",
  "Found another",
  "Emergency",
  "Other",
];

export default function CancelBookingScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { bookings } = useBookingStore();
  const [reason, setReason] = useState<string | null>(null);
  const [otherText, setOtherText] = useState("");
  const [confirmVisible, setConfirmVisible] = useState(false);

  const booking = bookings.find((b) => b.id === bookingId);

  const handleConfirmCancel = () => {
    setConfirmVisible(false);
    require("react-native").Alert.alert("Cancelled", "Booking cancelled");
    router.replace("/(client)/booking");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Cancel Booking" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <View className="bg-error/10 border border-error rounded-xl p-4 flex-row items-start mb-4">
          <Ionicons name="warning-outline" size={24} color="#EF4444" />
          <Text className="text-error ml-2 flex-1">
            Cancellation may not be refundable.
          </Text>
        </View>

        {booking && (
          <View className="bg-card rounded-2xl p-4 mb-4">
            <Text className="text-primary font-bold">{booking.service}</Text>
            <Text className="text-text-secondary text-sm">
              {booking.worker} · {booking.date} · ₱{booking.amount}
            </Text>
          </View>
        )}

        <Text className="text-text-secondary text-sm mb-2">Reason</Text>
        {REASONS.map((r) => (
          <Pressable
            key={r}
            className={`bg-card rounded-xl p-3 mb-2 flex-row items-center ${
              reason === r ? "border-2 border-accent" : ""
            }`}
            onPress={() => setReason(r)}
          >
            <View
              className={`w-5 h-5 rounded-full border-2 border-accent items-center justify-center mr-3 ${
                reason === r ? "bg-accent" : ""
              }`}
            >
              {reason === r && (
                <View className="w-2 h-2 rounded-full bg-primary-white" />
              )}
            </View>
            <Text className="text-primary">{r}</Text>
          </Pressable>
        ))}
        {reason === "Other" && (
          <InputField
            label="Please specify"
            value={otherText}
            onChangeText={setOtherText}
            placeholder="Reason..."
          />
        )}

        <View className="flex-row gap-3 mt-8">
          <OutlinedButton
            label="Keep My Booking"
            onPress={() => router.back()}
          />
          <View className="flex-1">
            <DangerButton
              label="Confirm Cancellation"
              fullWidth
              disabled={!reason || (reason === "Other" && !otherText.trim())}
              onPress={() => setConfirmVisible(true)}
            />
          </View>
        </View>
      </ScrollView>
      <GenericConfirmationModal
        visible={confirmVisible}
        title="Cancel booking?"
        message="This action cannot be undone."
        confirmLabel="Yes, cancel"
        cancelLabel="Keep booking"
        onConfirm={handleConfirmCancel}
        onCancel={() => setConfirmVisible(false)}
      />
    </SafeAreaView>
  );
}
