import React, { useState, useRef } from "react";
import { View, ScrollView, TextInput } from "react-native";
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

  const nameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);
  const yearsRef = useRef<TextInput>(null);
  const areaRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    require("react-native").Alert.alert("Saved");
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
