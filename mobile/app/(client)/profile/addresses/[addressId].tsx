import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function AddressEditScreen() {
  const router = useRouter();
  const { addressId } = useLocalSearchParams<{ addressId: string }>();
  const isNew = addressId === "new";
  const [label, setLabel] = useState(isNew ? "" : "Home");
  const [address, setAddress] = useState(
    isNew ? "" : "123 Rizal St., Hagonoy, Bulacan",
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title={isNew ? "Add Address" : "Edit Address"} showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="flex-row gap-2 mb-4">
          {["Home", "Work", "Other"].map((l) => (
            <View
              key={l}
              className={`px-3 py-2 rounded-xl ${label === l ? "bg-accent" : "bg-card"}`}
            >
              <Text
                className={
                  label === l
                    ? "text-primary font-semibold"
                    : "text-text-secondary"
                }
                onPress={() => setLabel(l)}
              >
                {l}
              </Text>
            </View>
          ))}
        </View>
        <View className="w-full h-48 bg-card-dark rounded-2xl items-center justify-center mb-4">
          <Ionicons name="map-outline" size={40} color="#4B5FD6" />
          <Text className="text-text-muted text-xs mt-2">
            Map Preview (install react-native-maps)
          </Text>
        </View>
        <InputField
          label="Address"
          value={address}
          onChangeText={setAddress}
          placeholder="Full address"
        />
        <PrimaryButton
          label="Save Address"
          fullWidth
          onPress={() => {
            require("react-native").Alert.alert("Saved", "Address saved");
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
