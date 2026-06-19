import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ScreenHeader } from "@/components/ui/ScreenHeader";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { OutlinedButton } from "@/components/ui/OutlinedButton";
import PriceBreakdownCard from "@/components/ui/PriceBreakdown";
import { useBookingStore } from "@/store/bookingStore";
import { calculatePriceBreakdown } from "@/utils/pricing";
import { colors } from "@/constants";

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { bookings, updateBookingStatus } = useBookingStore();

  const booking = bookings.find((b: any) => b.id === id);

  if (!booking) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Booking Details" showBack />
        <View className="flex-1 items-center justify-center">
          <Ionicons
            name="document-outline"
            size={48}
            color={colors.text.muted}
          />
          <Text className="text-text-secondary text-sm mt-2">
            Booking not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Mock price breakdown - replace with actual data from booking
  const priceBreakdown = calculatePriceBreakdown(booking.amount, 1, 0, 0);

  const statusColor =
    {
      Pending: colors.warning,
      Active: colors.active,
      Completed: colors.success,
      Cancelled: colors.error,
    }[booking.status as string] || colors.text.muted;

  const canReschedule = booking.status === "Pending";
  const canCancel = booking.status === "Pending" || booking.status === "Active";
  const canComplete = booking.status === "Active";

  const handleReschedule = () => {
    Alert.alert("Reschedule", "Feature coming soon");
    // router.push(`/(client)/booking/new/step-2?bookingId=${booking.id}`);
  };

  const handleCancel = () => {
    Alert.alert("Cancel Booking?", "This action cannot be undone.", [
      { text: "Keep Booking", onPress: () => {} },
      {
        text: "Cancel Booking",
        onPress: () => {
          updateBookingStatus(booking.id, "Cancelled");
          router.back();
        },
        style: "destructive",
      },
    ]);
  };

  const handleComplete = () => {
    updateBookingStatus(booking.id, "Completed");
    router.push({
      pathname: "/(client)/booking/post-service" as any,
      params: { bookingId: booking.id },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Booking Details" showBack />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        className="flex-1"
      >
        {/* Status Badge */}
        <View className="flex-row items-center gap-2 mb-4">
          <View
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusColor }}
          />
          <Text
            className="font-semibold text-sm"
            style={{ color: statusColor }}
          >
            {booking.status}
          </Text>
          <Text className="text-text-secondary text-xs ml-auto">
            ID: {booking.id}
          </Text>
        </View>

        {/* Service Info */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-text-secondary text-xs mb-2">Service</Text>
          <Text className="text-primary font-bold text-lg">
            {booking.service}
          </Text>
        </View>

        {/* Worker Info */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-text-secondary text-xs mb-2">
            Assigned Worker
          </Text>
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-accent/20 items-center justify-center">
              <Ionicons name="person" size={24} color={colors.accent.DEFAULT} />
            </View>
            <View className="ml-3 flex-1">
              <Text className="text-primary font-semibold">
                {booking.worker}
              </Text>
              <Text className="text-text-secondary text-xs">Professional</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={colors.text.muted}
            />
          </View>
        </View>

        {/* Date & Time */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <View className="flex-row items-center mb-2">
            <Ionicons name="calendar" size={16} color={colors.accent.DEFAULT} />
            <Text className="text-primary font-semibold ml-2">
              {new Date(booking.date).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>
          {(booking as any).time && (
            <View className="flex-row items-center">
              <Ionicons name="time" size={16} color={colors.accent.DEFAULT} />
              <Text className="text-primary font-semibold ml-2">
                {(booking as any).time}
              </Text>
            </View>
          )}
          {(booking as any).address && (
            <View className="flex-row items-start mt-2">
              <Ionicons
                name="location"
                size={16}
                color={colors.accent.DEFAULT}
              />
              <Text className="text-primary font-semibold ml-2 flex-1">
                {(booking as any).address}
              </Text>
            </View>
          )}
        </View>

        {/* Price Breakdown */}
        <View className="mb-3">
          <PriceBreakdownCard breakdown={priceBreakdown} detailed={true} />
        </View>

        {/* Payment Method */}
        <View className="bg-card rounded-2xl p-4 mb-3">
          <Text className="text-text-secondary text-xs mb-2">
            Payment Method
          </Text>
          <View className="flex-row items-center">
            <Ionicons
              name={
                booking.paymentMethod === "Cash"
                  ? "wallet"
                  : booking.paymentMethod === "Maya"
                    ? "card"
                    : "phone-portrait"
              }
              size={20}
              color={colors.accent.DEFAULT}
            />
            <Text className="text-primary font-semibold ml-3">
              {booking.paymentMethod}
            </Text>
          </View>
        </View>

        {/* Reviews Section (if completed) */}
        {booking.status === "Completed" && (
          <View className="bg-card rounded-2xl p-4 mb-3">
            <Text className="text-text-secondary text-xs mb-2">
              Your Rating
            </Text>
            {booking.rating ? (
              <View>
                <View className="flex-row items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= booking.rating! ? "star" : "star-outline"}
                      size={20}
                      color={colors.accent.DEFAULT}
                    />
                  ))}
                </View>
                {booking.reviewText && (
                  <Text className="text-primary text-sm mt-2">
                    {`"${booking.reviewText}"`}
                  </Text>
                )}
              </View>
            ) : (
              <Text className="text-text-secondary text-sm">
                No review yet. Leave a review to help others.
              </Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View className="gap-2 mt-4">
          {canComplete && (
            <PrimaryButton
              label="Mark as Complete"
              fullWidth
              onPress={handleComplete}
            />
          )}
          {canReschedule && (
            <OutlinedButton label="Reschedule" onPress={handleReschedule} />
          )}
          {canCancel && (
            <Pressable
              className="bg-error/10 rounded-xl py-3"
              onPress={handleCancel}
            >
              <Text className="text-error font-semibold text-center">
                Cancel Booking
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
