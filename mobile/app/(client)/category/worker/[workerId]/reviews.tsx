import React from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../../components/ui/ScreenHeader";
import StarRating from "../../../../../components/ui/StarRating";
import ReviewCard from "../../../../../components/cards/ReviewCard";
import { workers } from "../../../../../constants/dummyData";

const MOCK_REVIEWS = [
  {
    id: "r1",
    authorName: "Client A",
    rating: 5,
    comment: "Very professional and fast.",
    date: "Mar 1, 2026",
  },
  {
    id: "r2",
    authorName: "Client B",
    rating: 4,
    comment: "Good job, would book again.",
    date: "Feb 28, 2026",
  },
  {
    id: "r3",
    authorName: "Client C",
    rating: 5,
    comment: "On time and did a great job.",
    date: "Feb 25, 2026",
  },
];

export default function WorkerReviewsScreen() {
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const worker = workers.find((w) => w.id === workerId);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Reviews" showBack />
      <View className="px-4">
        <View className="bg-card rounded-2xl p-4 mb-4">
          <View className="flex-row items-center">
            <Text className="text-primary text-4xl font-bold mr-3">
              {worker?.rating ?? 4.8}
            </Text>
            <View>
              <StarRating rating={worker?.rating ?? 4.8} size={20} />
              <Text className="text-text-muted text-sm mt-1">
                {worker?.reviews ?? 120} ratings
              </Text>
            </View>
          </View>
          <View className="mt-3">
            {[5, 4, 3, 2, 1].map((star) => (
              <View key={star} className="flex-row items-center mb-1">
                <Text className="text-text-secondary text-xs w-6">{star}</Text>
                <View className="flex-1 h-2 bg-card-dark rounded-full overflow-hidden">
                  <View
                    className="h-full bg-gold rounded-full"
                    style={{
                      width: `${star === 5 ? 70 : star === 4 ? 20 : 10}%`,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        <FlatList
          data={MOCK_REVIEWS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard review={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </SafeAreaView>
  );
}
