import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StatusBadge from "../../../../components/ui/StatusBadge";
import DangerButton from "../../../../components/ui/DangerButton";

const CERTS: Record<
  string,
  {
    name: string;
    issuer: string;
    issueDate: string;
    expiryDate: string;
    status: string;
  }
> = {
  cert1: {
    name: "Plumbing License",
    issuer: "PRC",
    issueDate: "2020-01-01",
    expiryDate: "2025-01-01",
    status: "Verified",
  },
  cert2: {
    name: "Safety Training",
    issuer: "TESDA",
    issueDate: "2021-06-01",
    expiryDate: "2024-06-01",
    status: "Verified",
  },
};

export default function CertificationDetailScreen() {
  const router = useRouter();
  const { certId } = useLocalSearchParams<{ certId: string }>();
  const cert = certId ? CERTS[certId] : null;

  if (!cert) {
    return (
      <SafeAreaView className="flex-1 bg-primary-white">
        <ScreenHeader title="Certification Details" showBack />
        <View className="flex-1 items-center justify-center">
          <Text className="text-text-secondary">Not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Certification Details" showBack />
      <View className="px-4 py-6">
        <View className="w-full h-48 bg-card-dark rounded-2xl items-center justify-center mb-4">
          <Ionicons name="document-text" size={60} color="#4B5FD6" />
          <Text className="text-text-secondary mt-2">Document Preview</Text>
        </View>
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold">{cert.name}</Text>
          <Text className="text-text-secondary text-sm">{cert.issuer}</Text>
          <Text className="text-text-muted text-xs mt-2">
            {cert.issueDate} – {cert.expiryDate}
          </Text>
          <StatusBadge status={cert.status as "Verified"} />
        </View>
        <DangerButton
          label="Delete Certification"
          fullWidth
          onPress={() => router.back()}
        />
      </View>
    </SafeAreaView>
  );
}
