import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StarRating from "../../../../components/ui/StarRating";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import InputField from "../../../../components/ui/InputField";
import GenericSuccessModal from "../../../../components/modals/GenericSuccessModal";
import { useBookingStore } from "../../../../store/bookingStore";

export default function RateBookingScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const booking = useBookingStore((s) =>
    s.bookings.find((b) => b.id === bookingId),
  );
  const submitReview = useBookingStore((s) => s.submitReview);

  const [rating, setRating] = useState(booking?.rating ?? 0);
  const [review, setReview] = useState(booking?.reviewText ?? "");
  const [successVisible, setSuccessVisible] = useState(false);

  const labels = ["Terrible", "Bad", "Okay", "Good", "Excellent"];

  const handleSubmit = () => {
    if (!booking) {
      Alert.alert("Error", "Booking not found");
      return;
    }
    if (rating < 1) {
      Alert.alert("Error", "Please select a rating");
      return;
    }
    submitReview(booking.id, rating, review.trim());
    setSuccessVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Rate & Review" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="bg-card rounded-2xl p-4 mb-4 flex-row items-center">
          <View className="w-12 h-12 bg-card-light rounded-full items-center justify-center mr-3">
            <Text className="text-primary text-lg">👤</Text>
          </View>
          <View>
            <Text className="text-primary font-bold">
              {booking?.worker ?? "Worker"}
            </Text>
            <Text className="text-text-secondary text-sm">
              {booking?.service ?? "Service"}
            </Text>
          </View>
        </View>
        <Text className="text-text-secondary mb-2">
          How was your experience?
        </Text>
        <View className="flex-row items-center mb-2">
          <StarRating
            rating={rating}
            size={32}
            interactive
            onRate={setRating}
          />
        </View>
        <Text className="text-text-muted text-sm mb-4">
          {rating > 0 ? labels[rating - 1] : "Tap to rate"}
        </Text>
        <InputField
          label="Your review"
          value={review}
          onChangeText={setReview}
          placeholder="Share your experience..."
          multiline
        />
        <OutlinedButton label="Add Photos" onPress={() => {}} />
        <View className="mt-6">
          <PrimaryButton
            label="Submit Review"
            fullWidth
            onPress={handleSubmit}
          />
        </View>
      </ScrollView>
      <GenericSuccessModal
        visible={successVisible}
        title="Review submitted!"
        onClose={() => {
          setSuccessVisible(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}
