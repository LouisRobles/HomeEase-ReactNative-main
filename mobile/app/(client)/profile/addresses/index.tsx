import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import AddressCard from "../../../../components/cards/AddressCard";

const ADDRESSES = [
  {
    id: "addr1",
    label: "Home",
    address: "123 Rizal St., Hagonoy, Bulacan",
    isDefault: true,
  },
  {
    id: "addr2",
    label: "Work",
    address: "456 Main Ave., Manila",
    isDefault: false,
  },
];

export default function AddressesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="My Addresses" showBack />
      <FlatList
        data={ADDRESSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <AddressCard
            address={item}
            onEdit={() => router.push(`/(client)/profile/addresses/${item.id}`)}
            onDelete={() => {}}
          />
        )}
      />
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => router.push("/(client)/profile/addresses/new")}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}
