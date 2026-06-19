import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { colors } from "../../../constants";

export default function NotificationPreferencesScreen() {
  const router = useRouter();
  const [booking, setBooking] = useState(true);
  const [messages, setMessages] = useState(true);
  const [promos, setPromos] = useState(false);
  const [system, setSystem] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Notifications" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View className="bg-card rounded-2xl overflow-hidden">
          {[
            { label: "Booking Updates", value: booking, set: setBooking },
            { label: "New Messages", value: messages, set: setMessages },
            { label: "Promotions & Offers", value: promos, set: setPromos },
            { label: "System Announcements", value: system, set: setSystem },
          ].map((item) => (
            <View
              key={item.label}
              className="flex-row justify-between items-center py-4 px-4 border-b border-divider last:border-0"
            >
              <Text className="text-primary">{item.label}</Text>
              <Switch
                value={item.value}
                onValueChange={item.set}
                trackColor={{ false: "#2A3080", true: colors.primary.DEFAULT }}
                thumbColor={colors.white}
              />
            </View>
          ))}
        </View>
        <View className="mt-6">
          <PrimaryButton
            label="Save Preferences"
            fullWidth
            onPress={() => {
              require("react-native").Alert.alert(
                "Saved",
                "Preferences updated",
              );
              router.back();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
