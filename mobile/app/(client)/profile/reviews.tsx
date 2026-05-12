import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import ReviewCard from "../../../components/cards/ReviewCard";
import EmptyState from "../../../components/feedback/EmptyState";
import { useBookingStore } from "../../../store/bookingStore";

export default function ReviewsScreen() {
  const bookings = useBookingStore((s) => s.bookings);

  const reviews = bookings
    .filter((b) => typeof b.rating === "number")
    .map((b) => ({
      id: b.id,
      authorName: "You",
      rating: b.rating ?? 0,
      comment: b.reviewText ?? "",
      date: b.date,
    }));

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="My Reviews" showBack />
      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" />
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => <ReviewCard review={item} />}
        />
      )}
    </SafeAreaView>
  );
}
