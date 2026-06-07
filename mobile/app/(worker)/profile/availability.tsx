import React, { useState } from "react";
import { View, Text, ScrollView, Switch, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import { colors } from "../../../constants/colors";

const DAYS = [
  { key: "Mon", label: "Monday" },
  { key: "Tue", label: "Tuesday" },
  { key: "Wed", label: "Wednesday" },
  { key: "Thu", label: "Thursday" },
  { key: "Fri", label: "Friday" },
  { key: "Sat", label: "Saturday" },
  { key: "Sun", label: "Sunday" },
];

const TODAY_KEY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
  new Date().getDay()
];

export default function AvailabilityScreen() {
  const router = useRouter();
  const [schedule, setSchedule] = useState<Record<string, boolean>>(
    Object.fromEntries(DAYS.map(({ key }, i) => [key, i < 5])),
  );

  const toggleDay = (key: string) => {
    setSchedule((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScreenHeader title="Set Availability" showBack />
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {/* Section label */}
        <Text
          style={{
            color: colors.primary.DEFAULT,
            fontWeight: "700",
            fontSize: 16,
            marginBottom: 4,
          }}
        >
          Working days
        </Text>
        <Text
          style={{ color: colors.text.muted, fontSize: 13, marginBottom: 16 }}
        >
          Toggle the days you&apos;re available for bookings
        </Text>

        {/* Day rows */}
        <View
          style={{
            backgroundColor: colors.card.DEFAULT,
            borderRadius: 16,
            marginBottom: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: colors.divider,
          }}
        >
          {DAYS.map(({ key, label }, index) => {
            const isOn = schedule[key] ?? false;
            const isToday = key === TODAY_KEY;
            const isLast = index === DAYS.length - 1;

            return (
              <View
                key={key}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderBottomWidth: isLast ? 0 : 1,
                  borderBottomColor: colors.divider,
                  backgroundColor: isOn
                    ? colors.card.DEFAULT
                    : colors.card.light,
                }}
              >
                {/* Left: day name + badges */}
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {label}
                  </Text>
                  {isToday && (
                    <View
                      style={{
                        backgroundColor: colors.accent.muted + "22",
                        borderRadius: 99,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: colors.accent.DEFAULT,
                          fontSize: 11,
                          fontWeight: "600",
                        }}
                      >
                        Today
                      </Text>
                    </View>
                  )}
                  {!isOn && (
                    <View
                      style={{
                        backgroundColor: colors.card.dark,
                        borderRadius: 99,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                      }}
                    >
                      <Text style={{ color: colors.text.muted, fontSize: 11 }}>
                        Day off
                      </Text>
                    </View>
                  )}
                </View>

                {/* Right: toggle */}
                <Switch
                  value={isOn}
                  onValueChange={() => toggleDay(key)}
                  trackColor={{
                    false: colors.divider,
                    true: colors.primary.DEFAULT,
                  }}
                  thumbColor={colors.white}
                />
              </View>
            );
          })}
        </View>

        {/* Footer note */}
        <Text
          style={{
            color: colors.text.muted,
            fontSize: 12,
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Changes apply to all future bookings
        </Text>

        <PrimaryButton
          label="Save Schedule"
          fullWidth
          onPress={() => {
            Alert.alert("Saved");
            router.back();
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
