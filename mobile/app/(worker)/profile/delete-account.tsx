import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import DangerButton from "../../../components/ui/DangerButton";
import OutlinedButton from "../../../components/ui/OutlinedButton";

export default function WorkerDeleteAccountScreen() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Delete Account" showBack />
      <View className="p-4">
        <Text className="text-error font-bold text-lg mb-4">
          Delete Your Account?
        </Text>
        <DangerButton
          label="Delete My Account"
          fullWidth
          onPress={() => {
            require("react-native").Alert.alert("Deleted");
            router.replace("/landing");
          }}
        />
        <View className="mt-3">
          <OutlinedButton label="Cancel" onPress={() => router.back()} />
        </View>
      </View>
    </SafeAreaView>
  );
}
