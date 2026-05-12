import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import UploadCard from "../../../../components/ui/UploadCard";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function UploadCertificationScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Certification" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <InputField
          label="Certificate Name"
          value={name}
          onChangeText={setName}
          placeholder="e.g. Plumbing License"
        />
        <InputField
          label="Issuing Organization"
          value={issuer}
          onChangeText={setIssuer}
          placeholder="e.g. PRC"
        />
        <InputField
          label="Issue Date"
          value={issueDate}
          onChangeText={setIssueDate}
          placeholder="YYYY-MM-DD"
        />
        <InputField
          label="Expiry Date"
          value={expiryDate}
          onChangeText={setExpiryDate}
          placeholder="YYYY-MM-DD"
        />
        <UploadCard label="Tap to upload document" onPress={() => {}} />
        <PrimaryButton
          label="Save Certification"
          fullWidth
          onPress={() => {
            require("react-native").Alert.alert("Uploaded");
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
