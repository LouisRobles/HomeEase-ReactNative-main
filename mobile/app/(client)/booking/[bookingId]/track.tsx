import React from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";

export default function TrackBookingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Track Service" showBack />
      <View className="px-4 mt-2">
        <View className="flex-row justify-between mb-4">
          {["Booked", "Accepted", "On the Way", "In Progress", "Done"].map(
            (label, i) => (
              <View key={label} className="items-center">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    i <= 2 ? "bg-accent" : "bg-card-light"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      i <= 2 ? "text-primary" : "text-text-secondary"
                    }`}
                  >
                    {i + 1}
                  </Text>
                </View>
                <Text
                  className={`text-xs mt-1 ${
                    i === 2 ? "text-accent font-semibold" : "text-text-muted"
                  }`}
                >
                  {label}
                </Text>
              </View>
            ),
          )}
        </View>
        <View className="flex-1 bg-card-dark rounded-2xl items-center justify-center min-h-[200]">
          <Ionicons name="map" size={60} color="#4B5FD6" />
          <Text className="text-text-secondary mt-2">Live Tracking</Text>
          <Text className="text-text-muted text-xs mt-1">
            {/* (Install react-native-maps for live tracking) */}
          </Text>
        </View>
        <View className="bg-warning/20 rounded-full py-2 px-4 self-center mt-4">
          <Text className="text-warning font-semibold text-sm">
            Worker is on the way
          </Text>
        </View>
        <View className="bg-card rounded-2xl p-4 mt-6 flex-row items-center">
          <View className="w-12 h-12 bg-card-dark rounded-full items-center justify-center mr-3">
            <Ionicons name="person-circle" size={40} color="#FFFFFF" />
          </View>
          <View className="flex-1">
            <Text className="text-primary font-bold">Juan Dela Cruz</Text>
            <Text className="text-warning text-sm">On the way</Text>
          </View>
          <Pressable
            onPress={() => router.push("/(client)/inbox/chat/c1")}
            className="bg-accent rounded-full p-2 mr-2"
          >
            <Ionicons name="chatbubble" size={20} color="#FFFFFF" />
          </Pressable>
          <Pressable
            onPress={() =>
              require("react-native").Alert.alert(
                "Calling...",
                "Feature coming soon",
              )
            }
            className="bg-accent rounded-full p-2"
          >
            <Ionicons name="call" size={20} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
