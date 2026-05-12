import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StarRating from "../../../../components/ui/StarRating";
import ReviewCard from "../../../../components/cards/ReviewCard";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import { workers } from "../../../../constants/dummyData";

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
];

export default function WorkerProfileScreen() {
  const router = useRouter();
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const worker = workers.find((w) => w.id === workerId);

  if (!worker) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Worker" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Worker not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="absolute top-0 left-0 right-0 z-10 pt-2">
        <ScreenHeader title="" showBack />
      </View>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full h-64 bg-card-dark items-center justify-center">
          {/* TODO: Replace with worker profile photo */}
          <Ionicons name="person-circle" size={100} color="#A0A8D0" />
        </View>

        <View className="bg-card rounded-2xl p-4 mx-4 -mt-8">
          <Text className="text-primary font-bold text-xl">{worker.name}</Text>
          <View className="flex-row items-center mt-1">
            <StarRating rating={worker.rating} size={16} />
            <Text className="text-text-muted text-sm ml-2">
              ({worker.reviews} reviews)
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2 mt-2">
            <View className="bg-accent/20 rounded-full px-3 py-1">
              <Text className="text-accent text-xs">{worker.service}</Text>
            </View>
            <View
              className={`rounded-full px-3 py-1 ${
                worker.status === "available" ? "bg-success/20" : "bg-error/20"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  worker.status === "available" ? "text-success" : "text-error"
                }`}
              >
                {worker.status === "available" ? "Available" : "Busy"}
              </Text>
            </View>
          </View>
          <Text className="text-accent font-bold text-lg mt-2">
            ₱{worker.rate}/hr
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-4 mx-4 mt-3">
          <Text className="text-primary font-bold mb-2">About</Text>
          <Text className="text-text-secondary text-sm">
            Experienced {worker.service.toLowerCase()} professional with great
            reviews. Book now for quality service.
          </Text>
        </View>

        <View className="bg-card rounded-2xl p-4 mx-4 mt-3">
          <Text className="text-primary font-bold mb-2">Skills</Text>
          <View className="flex-row flex-wrap gap-2">
            {[worker.service, "Installation", "Repair"].map((skill) => (
              <View
                key={skill}
                className="bg-card-light rounded-full px-3 py-1"
              >
                <Text className="text-text-secondary text-xs">{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-card rounded-2xl p-4 mx-4 mt-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-primary font-bold">Reviews</Text>
            <Pressable
              onPress={() =>
                router.push(`/(client)/category/worker/${workerId}/reviews`)
              }
            >
              <Text className="text-accent text-sm">See All</Text>
            </Pressable>
          </View>
          {MOCK_REVIEWS.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-primary-white p-4 border-t border-divider">
        <PrimaryButton
          label="Book Now"
          fullWidth
          onPress={() =>
            router.push({
              pathname: "/(client)/booking/new/step-1",
              params: { workerId },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}
