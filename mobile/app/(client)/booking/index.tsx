import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BookingCard from "../../../components/cards/BookingCard";
import EmptyState from "../../../components/feedback/EmptyState";
import LoadingSkeleton from "../../../components/feedback/LoadingSkeleton";
import { useBookingStore } from "../../../store/bookingStore";

const TABS = ["Pending", "Active", "Completed", "Cancelled"] as const;

export default function MyBookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Pending");
  const { bookings } = useBookingStore();
  const [loading] = useState(false);

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-primary text-2xl font-bold">My Bookings</Text>
        <View className="flex-row mt-3 gap-2">
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              className={`px-3 py-2 rounded-xl ${
                activeTab === tab ? "bg-accent" : "bg-card"
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                className={
                  activeTab === tab
                    ? "text-primary font-semibold text-sm"
                    : "text-text-secondary text-sm"
                }
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {loading ? (
        <LoadingSkeleton />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          subtitle={
            activeTab === "Pending"
              ? "Create a booking to get started"
              : `No ${activeTab.toLowerCase()} bookings`
          }
          actionLabel={activeTab === "Pending" ? "New Booking" : undefined}
          onAction={
            activeTab === "Pending"
              ? () => router.push("/(client)/booking/new/step-1")
              : undefined
          }
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <BookingCard
              booking={item}
              onPress={() => router.push(`/(client)/booking/${item.id}`)}
            />
          )}
        />
      )}

      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => router.push("/(client)/booking/new/step-1")}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}
