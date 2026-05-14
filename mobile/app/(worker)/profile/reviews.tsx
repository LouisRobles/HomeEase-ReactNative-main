import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import ReviewCard from "../../../components/cards/ReviewCard";
import EmptyState from "../../../components/feedback/EmptyState";
import StarRating from "../../../components/ui/StarRating";

const WORKER_REVIEWS = [
  {
    id: "wr1",
    authorName: "Carlo Mendoza",
    rating: 5,
    comment: "Very professional and on time. Will book again!",
    date: "Mar 1, 2026",
  },
  {
    id: "wr2",
    authorName: "Liza Torres",
    rating: 4,
    comment: "Good work overall. Minor cleanup needed after.",
    date: "Feb 28, 2026",
  },
  {
    id: "wr3",
    authorName: "Sarah Johnson",
    rating: 5,
    comment: "Excellent service. Highly recommended.",
    date: "Feb 25, 2026",
  },
];

export default function WorkerReviewsScreen() {
  const calculateAverageRating = () => {
    if (WORKER_REVIEWS.length === 0) return 0;
    const sum = WORKER_REVIEWS.reduce((acc, review) => acc + review.rating, 0);
    return (sum / WORKER_REVIEWS.length).toFixed(1);
  };

  if (WORKER_REVIEWS.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="My Reviews" showBack />
        <EmptyState
          title="No reviews yet"
          subtitle="Completed jobs will show client reviews here."
        />
      </SafeAreaView>
    );
  }

  const averageRating = calculateAverageRating();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="My Reviews" showBack />
      <FlatList
        data={WORKER_REVIEWS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        ListHeaderComponent={
          <View className="bg-card rounded-2xl p-4 mx-0 mb-4 items-center">
            <Text className="text-primary font-bold text-3xl">
              {averageRating}
            </Text>
            <View className="mt-2">
              <StarRating rating={parseFloat(averageRating)} size={16} />
            </View>
            <Text className="text-text-muted text-xs mt-2">
              {WORKER_REVIEWS.length} review
              {WORKER_REVIEWS.length !== 1 ? "s" : ""}
            </Text>
          </View>
        }
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </SafeAreaView>
  );
}
