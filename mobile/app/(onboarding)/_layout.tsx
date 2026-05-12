import React from "react";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 250,
        contentStyle: { backgroundColor: "#0A0F2C" },
        headerStyle: { backgroundColor: "#0A0F2C" },
        headerTintColor: "#111827",
        headerShadowVisible: false,
      }}
    />
  );
}
