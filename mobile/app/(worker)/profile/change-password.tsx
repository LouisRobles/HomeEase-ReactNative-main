import React, { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import InputField from "../../../components/ui/InputField";
import PrimaryButton from "../../../components/ui/PrimaryButton";

export default function WorkerChangePasswordScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleUpdate = () => {
    if (!current || !newPass || !confirm) {
      require("react-native").Alert.alert("Error", "Fill all fields");
      return;
    }
    if (newPass !== confirm) {
      require("react-native").Alert.alert("Error", "Passwords do not match");
      return;
    }
    require("react-native").Alert.alert("Success", "Password updated");
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Change Password" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <InputField
          label="Current Password"
          value={current}
          onChangeText={setCurrent}
          secureTextEntry
        />
        <InputField
          label="New Password"
          value={newPass}
          onChangeText={setNewPass}
          secureTextEntry
        />
        <InputField
          label="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        <PrimaryButton
          label="Update Password"
          fullWidth
          onPress={handleUpdate}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
