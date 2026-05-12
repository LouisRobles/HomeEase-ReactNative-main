import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import InputField from "../../../components/ui/InputField";
import PrimaryButton from "../../../components/ui/PrimaryButton";

export default function WorkerEditProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("Dominic Paulo R. Dela Cruz");
  const [phone, setPhone] = useState("09192129330");
  const [email] = useState("paulodelacruz28@gmail.com");
  const [bio, setBio] = useState("Licensed plumber with 10+ years experience.");
  const [years, setYears] = useState("10");
  const [area, setArea] = useState("Bulacan");

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Edit Profile" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <InputField label="Full Name" value={name} onChangeText={setName} />
        <InputField
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={() => {}}
          editable={false}
        />
        <InputField label="Bio" value={bio} onChangeText={setBio} multiline />
        <InputField
          label="Years of Experience"
          value={years}
          onChangeText={setYears}
          keyboardType="number-pad"
        />
        <InputField label="Service Area" value={area} onChangeText={setArea} />
        <PrimaryButton
          label="Save Changes"
          fullWidth
          onPress={() => {
            require("react-native").Alert.alert("Saved");
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
