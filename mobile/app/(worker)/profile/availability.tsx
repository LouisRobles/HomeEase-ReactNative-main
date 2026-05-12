import React, { useState } from "react";
import { View, Text, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../components/ui/PrimaryButton";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AvailabilityScreen() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<
    Record<string, { on: boolean; start: string; end: string }>
  >(
    Object.fromEntries(
      DAYS.map((d, i) => [
        d,
        { on: i < 6, start: "08:00 AM", end: "05:00 PM" },
      ]),
    ),
  );

  const setDay = (
    day: string,
    upd: Partial<{ on: boolean; start: string; end: string }>,
  ) => {
    setSchedule((s) => ({ ...s, [day]: { ...s[day], ...upd } }));
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Set Availability" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {DAYS.map((day) => (
          <View key={day} className="bg-card rounded-xl p-3 mb-2">
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold">{day}</Text>
              <Switch
                value={schedule[day]?.on ?? false}
                onValueChange={(v) => setDay(day, { on: v })}
                trackColor={{ false: "#2A3080", true: "#4B5FD6" }}
                thumbColor="#FFFFFF"
              />
            </View>
            {schedule[day]?.on ? (
              <View className="flex-row items-center mt-2">
                <Text
                  className="text-text-secondary text-sm"
                  onPress={() => {}}
                >
                  {schedule[day].start}
                </Text>
                <Text className="text-text-muted mx-2">–</Text>
                <Text
                  className="text-text-secondary text-sm"
                  onPress={() => {}}
                >
                  {schedule[day].end}
                </Text>
              </View>
            ) : (
              <Text className="text-text-muted text-sm mt-2">Unavailable</Text>
            )}
          </View>
        ))}
        <PrimaryButton
          label="Save Schedule"
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
