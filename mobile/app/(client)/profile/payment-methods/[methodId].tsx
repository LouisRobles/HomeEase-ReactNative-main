import React, { useState, useRef } from "react";
import { View, TextInput, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function EditPaymentMethodScreen() {
  const router = useRouter();
  const { methodId } = useLocalSearchParams<{ methodId: string }>();
  const [label, setLabel] = useState("My Card");

  const labelRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (!label.trim()) {
      Alert.alert("Error", "Please enter a label");
      return;
    }
    Alert.alert("Success", "Payment method updated");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Edit Payment Method" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <InputField
          ref={labelRef}
          label="Label (e.g., My Card, Work Card)"
          value={label}
          onChangeText={setLabel}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        <PrimaryButton label="Save Changes" fullWidth onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
