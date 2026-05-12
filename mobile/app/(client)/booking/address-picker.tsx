import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import SearchBar from "../../../components/ui/SearchBar";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { useBookingStore } from "../../../store/bookingStore";

export default function AddressPickerScreen() {
  const router = useRouter();
  const setDraft = useBookingStore((s) => s.setDraft);

  const handleConfirm = () => {
    setDraft({ address: "123 Rizal St., Hagonoy, Bulacan" });
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top"]}>
      <ScreenHeader title="Set Location" showBack />
      <View className="px-4 mt-2">
        <SearchBar placeholder="Search address..." />
      </View>
      <View className="flex-1 mx-4 mt-4">
        <View className="w-full h-64 bg-card-dark rounded-2xl items-center justify-center">
          <Ionicons name="map-outline" size={60} color="#4B5FD6" />
          <Text className="text-text-secondary mt-2">Map Preview</Text>
          <Text className="text-text-muted text-xs mt-1">
            (Install react-native-maps for live map)
          </Text>
        </View>
        <View className="absolute self-center top-1/2 -mt-6">
          <Ionicons name="location" size={48} color="#EF4444" />
        </View>
      </View>
      <View className="bg-card p-4 mx-4 mt-4 rounded-2xl mb-4">
        <Text className="text-text-secondary text-xs">Selected Location</Text>
        <Text className="text-primary font-bold mt-1">
          123 Rizal St., Hagonoy, Bulacan
        </Text>
        <PrimaryButton
          label="Confirm This Location"
          fullWidth
          onPress={handleConfirm}
        />
      </View>
    </SafeAreaView>
  );
}
