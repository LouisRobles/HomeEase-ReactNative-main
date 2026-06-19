import React, { useState, useRef } from "react";
import { TextInput, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";

export default function AddPaymentMethodScreen() {
  const router = useRouter();
  const [type, setType] = useState<"card" | "gcash" | "maya">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const cardRef = useRef<TextInput>(null);
  const expiryRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (type === "card" && (!cardNumber || !expiry || !cvv)) {
      Alert.alert("Error", "Please fill in all card details");
      return;
    }
    Alert.alert("Success", "Payment method added successfully");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Add Payment Method" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {type === "card" && (
          <>
            <InputField
              ref={cardRef}
              label="Card Number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => expiryRef.current?.focus()}
            />
            <InputField
              ref={expiryRef}
              label="Expiry Date (MM/YY)"
              placeholder="12/25"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="number-pad"
              returnKeyType="next"
              onSubmitEditing={() => cvvRef.current?.focus()}
            />
            <InputField
              ref={cvvRef}
              label="CVV"
              placeholder="123"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </>
        )}
        <PrimaryButton
          label="Add Payment Method"
          fullWidth
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
