import React, { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import PaymentMethodCard from "../../../../components/cards/PaymentMethodCard";
import EmptyState from "../../../../components/feedback/EmptyState";
import { colors } from "../../../../constants";

type PaymentMethod = {
  id: string;
  type: "card" | "gcash" | "maya" | "bank";
  lastFour: string;
  label?: string;
  isDefault: boolean;
  expiryDate?: string;
};

const INITIAL_METHODS: PaymentMethod[] = [
  {
    id: "pm1",
    type: "card",
    lastFour: "4242",
    isDefault: true,
    expiryDate: "12/25",
  },
  {
    id: "pm2",
    type: "gcash",
    lastFour: "9171234567",
    label: "GCash Account",
    isDefault: false,
  },
  {
    id: "pm3",
    type: "maya",
    lastFour: "9175555555",
    label: "Maya Account",
    isDefault: false,
  },
];

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const [methods, setMethods] = useState<PaymentMethod[]>(INITIAL_METHODS);

  const handleDelete = (id: string) => {
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setMethods((prev) =>
      prev.map((m) => ({
        ...m,
        isDefault: m.id === id,
      })),
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Payment Methods" showBack />
      {methods.length === 0 ? (
        <EmptyState
          title="No payment methods"
          subtitle="Add a card, wallet, or bank account to pay for bookings."
          actionLabel="Add Payment Method"
          onAction={() => router.push("/(client)/profile/payment-methods/new")}
        />
      ) : (
        <FlatList
          data={methods}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          renderItem={({ item }) => (
            <PaymentMethodCard
              method={item}
              onEdit={() =>
                router.push(`/(client)/profile/payment-methods/${item.id}`)
              }
              onDelete={() => handleDelete(item.id)}
              onSetDefault={() => handleSetDefault(item.id)}
            />
          )}
          ListHeaderComponent={
            methods.length > 0 ? (
              <View className="mb-4">
                <Text className="text-text-secondary text-sm">
                  Default payment method is used for automatic bookings
                </Text>
              </View>
            ) : null
          }
        />
      )}
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => router.push("/(client)/profile/payment-methods/new")}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </Pressable>
    </SafeAreaView>
  );
}
