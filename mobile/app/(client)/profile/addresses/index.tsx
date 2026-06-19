import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import AddressCard from "../../../../components/cards/AddressCard";
import EmptyState from "../../../../components/feedback/EmptyState";
import { colors } from "../../../../constants";

type Address = {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
};

const INITIAL_ADDRESSES: Address[] = [
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
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="My Addresses" showBack />
      {addresses.length === 0 ? (
        <EmptyState
          title="No saved addresses"
          subtitle="Add an address to make booking faster."
          actionLabel="Add Address"
          onAction={() => router.push("/(client)/profile/addresses/new")}
        />
      ) : (
        <FlatList
          data={addresses}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <AddressCard
              address={item}
              onEdit={() =>
                router.push(`/(client)/profile/addresses/${item.id}`)
              }
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />
      )}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => router.push("/(client)/profile/addresses/new")}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
}
