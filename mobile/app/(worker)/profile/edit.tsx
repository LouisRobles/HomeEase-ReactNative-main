import React, { useState, useRef } from "react";
import { View, ScrollView, Alert, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import InputField from "../../../components/ui/InputField";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { useAuthStore } from "../../../store/authStore";

export default function WorkerEditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email] = useState(user?.email ?? "");
  const [bio, setBio] = useState(
    "Licensed professional with years of experience.",
  );
  const [years, setYears] = useState("");
  const [area, setArea] = useState("Central Luzon");

  const nameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);
  const yearsRef = useRef<TextInput>(null);
  const areaRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name cannot be empty.");
      return;
    }
    if (!phone.trim()) {
      Alert.alert("Error", "Phone number cannot be empty.");
      return;
    }

    if (user) {
      setUser({ ...user, name: name.trim(), phone: phone.trim() });
    }

    Alert.alert("Success", "Profile updated successfully.");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Edit Profile" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <InputField
          ref={nameRef}
          label="Full Name"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
          onSubmitEditing={() => phoneRef.current?.focus()}
        />
        <InputField
          ref={phoneRef}
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          returnKeyType="next"
          onSubmitEditing={() => bioRef.current?.focus()}
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={() => {}}
          editable={false}
        />
        <InputField
          ref={bioRef}
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          returnKeyType="next"
          onSubmitEditing={() => yearsRef.current?.focus()}
        />
        <InputField
          ref={yearsRef}
          label="Years of Experience"
          value={years}
          onChangeText={setYears}
          keyboardType="number-pad"
          returnKeyType="next"
          onSubmitEditing={() => areaRef.current?.focus()}
        />
        <InputField
          ref={areaRef}
          label="Service Area"
          value={area}
          onChangeText={setArea}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
        <PrimaryButton label="Save Changes" fullWidth onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}
