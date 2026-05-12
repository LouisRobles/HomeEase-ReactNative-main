import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import StepperVertical from "../../../../components/steppers/StepperVertical";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import DangerButton from "../../../../components/ui/DangerButton";
import { useBookingStore } from "../../../../store/bookingStore";
import type { StatusType } from "../../../../components/ui/StatusBadge";

export default function BookingDetailScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { bookings } = useBookingStore();
  const booking = bookings.find((b) => b.id === bookingId);

  if (!booking) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Booking Details" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Booking not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const steps = [
    { label: "Requested", timestamp: booking.date, status: "done" as const },
    { label: "Accepted", timestamp: "", status: "done" as const },
    { label: "In Progress", timestamp: "", status: "active" as const },
    { label: "Completed", timestamp: "", status: "pending" as const },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Booking Details" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
      >
        <View className="items-center mb-4">
          <StatusBadge status={booking.status as StatusType} />
        </View>

        <View className="bg-card rounded-2xl p-4 mb-3 flex-row items-center">
          <View className="w-12 h-12 bg-card-light rounded-full items-center justify-center mr-3">
            <Ionicons name="person-circle" size={40} color="#A0A8D0" />
          </View>
          <View className="flex-1">
            <Text className="text-primary font-bold">{booking.worker}</Text>
            <Text className="text-text-secondary text-sm">
              {booking.service}
            </Text>
          </View>
          <Pressable
            onPress={() => router.push(`/(client)/inbox/chat/c1`)}
            className="p-2"
          >
            <Ionicons name="chatbubble-outline" size={24} color="#4B5FD6" />
          </Pressable>
          <Pressable
            onPress={() =>
              require("react-native").Alert.alert(
                "Calling...",
                "Feature coming soon",
              )
            }
            className="p-2"
          >
            <Ionicons name="call-outline" size={24} color="#4B5FD6" />
          </Pressable>
        </View>

        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-primary font-bold mb-2">Service Details</Text>
          <Text className="text-text-secondary text-sm">
            {booking.service} · {booking.date} · {booking.paymentMethod}
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-primary font-bold mb-2">Payment</Text>
          <Text className="text-text-secondary text-sm">
            {booking.paymentMethod} · ₱{booking.amount}
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-4 mb-3">
          <StepperVertical steps={steps} />
        </View>

        <View className="gap-3 mt-4">
          {booking.status === "Pending" && (
            <DangerButton
              label="Cancel Booking"
              fullWidth
              onPress={() =>
                router.push(`/(client)/booking/${bookingId}/cancel`)
              }
            />
          )}
          {booking.status === "Active" && (
            <OutlinedButton
              label="Track Service"
              onPress={() =>
                router.push(`/(client)/booking/${bookingId}/track`)
              }
            />
          )}
          {booking.status === "Completed" && (
            <PrimaryButton
              label="Rate & Review"
              fullWidth
              onPress={() => router.push("/(client)/profile/rate-review")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
