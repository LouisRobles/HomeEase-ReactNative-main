import React from "react";
import { Stack } from "expo-router";

export default function EarningsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0A0F2C" },
      }}
    />
  );
}
