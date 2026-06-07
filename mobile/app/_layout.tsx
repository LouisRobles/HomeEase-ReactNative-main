import "react-native-reanimated";
import "../global.css";
import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ToastProvider } from "../contexts/ToastContext";
import { useAuthStore } from "../store/authStore";
import { useBookingStore } from "../store/bookingStore";
import { colors } from "../constants";

export default function RootLayout() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);
  const restoreDraft = useBookingStore((state) => state.restoreDraft);

  useEffect(() => {
    // Initialize auth and booking draft on app startup
    const initialize = async () => {
      await initializeAuth();
      await restoreDraft();
    };
    initialize();
  }, [initializeAuth, restoreDraft]);

  return (
    <GestureHandlerRootView className="flex-1 bg-primary-white">
      <SafeAreaProvider>
        <ToastProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              animationDuration: 250,
              contentStyle: { backgroundColor: colors.surface },
              headerStyle: { backgroundColor: colors.surface },
              headerTintColor: colors.text.primary,
              headerShadowVisible: false,
            }}
          />
        </ToastProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
