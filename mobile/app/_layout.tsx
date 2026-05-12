import "react-native-reanimated";
import "../global.css";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1 bg-primary-white">
      <SafeAreaProvider>
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
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
