import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../../components/ui/OutlinedButton";
import { colors } from "../../../../constants";

const LABEL_OPTIONS = ["Home", "Work", "Other"];

const EXISTING_ADDRESSES: Record<string, { label: string; address: string }> = {
  addr1: { label: "Home", address: "123 Rizal St., Hagonoy, Bulacan" },
  addr2: { label: "Work", address: "456 Main Ave., Manila" },
};

export default function AddressEditScreen() {
  const router = useRouter();
  const { addressId } = useLocalSearchParams<{ addressId: string }>();
  const isNew = addressId === "new";
  const existing = !isNew && addressId ? EXISTING_ADDRESSES[addressId] : null;

  const [label, setLabel] = useState(existing?.label ?? "Home");
  const [address, setAddress] = useState(existing?.address ?? "");

  const handleSave = () => {
    if (!address.trim()) {
      Alert.alert("Error", "Please enter an address.");
      return;
    }
    Alert.alert(
      "Success",
      isNew ? "Address added successfully." : "Address updated successfully.",
      [{ text: "OK", onPress: () => router.back() }],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title={isNew ? "Add Address" : "Edit Address"} showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-primary text-sm mb-2">Label</Text>
        <View className="flex-row gap-2 mb-4">
          {LABEL_OPTIONS.map((l) => (
            <Pressable
              key={l}
              className={`px-4 py-2 rounded-xl ${label === l ? "bg-accent" : "bg-card"}`}
              onPress={() => setLabel(l)}
            >
              <Text
                className={
                  label === l
                    ? "text-white font-semibold"
                    : "text-text-secondary"
                }
              >
                {l}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="w-full h-48 bg-card-dark rounded-2xl items-center justify-center mb-4">
          <Ionicons
            name="map-outline"
            size={40}
            color={colors.accent.DEFAULT}
          />
          <Text className="text-text-muted text-xs mt-2">
            Map integration coming soon
          </Text>
        </View>

        <InputField
          label="Full Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Street, Barangay, City, Province"
          multiline
        />

        <View className="gap-3 mt-2">
          <PrimaryButton
            label={isNew ? "Add Address" : "Save Changes"}
            fullWidth
            onPress={handleSave}
          />
          <OutlinedButton label="Cancel" onPress={() => router.back()} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
