import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import CertificationCard from "../../../../components/cards/CertificationCard";

const CERTS = [
  {
    id: "cert1",
    name: "Plumbing License",
    issuer: "PRC",
    issueDate: "2020-01-01",
    expiryDate: "2025-01-01",
    status: "Verified",
  },
  {
    id: "cert2",
    name: "Safety Training",
    issuer: "TESDA",
    issueDate: "2021-06-01",
    expiryDate: "2024-06-01",
    status: "Verified",
  },
];

export default function CertificationsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="My Certifications" showBack />
      <FlatList
        data={CERTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <CertificationCard
            cert={item}
            onPress={() =>
              router.push(`/(worker)/profile/certifications/${item.id}`)
            }
            onEdit={() =>
              router.push("/(worker)/profile/certifications/upload")
            }
            onDelete={() => {}}
          />
        )}
      />
      <Pressable
        className="absolute bottom-6 right-6 w-14 h-14 bg-accent rounded-full items-center justify-center"
        onPress={() => router.push("/(worker)/profile/certifications/upload")}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </Pressable>
    </SafeAreaView>
  );
}
