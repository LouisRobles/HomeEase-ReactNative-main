import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { colors } from "../constants";
import { icons } from "@/constants/icons";

type Role = "client" | "worker";
type Intent = "signin" | "signup";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ intent?: string }>();
  const intent = (params.intent as Intent) || "signup";

  const handleRoleSelect = (role: Role) => {
    if (intent === "signin") {
      router.push({ pathname: "/(auth)/sign-in", params: { role } });
    } else {
      router.push({ pathname: "/(auth)/sign-up", params: { role } });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top", "bottom"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 40,
        }}
      >
        <Text className="text-primary text-3xl font-bold text-center mb-10">
          Select Your Role
        </Text>

        {/* Client Option */}
        <Pressable
          className="bg-card-light border-2 border-primary rounded-2xl p-6 mb-6 items-center"
          onPress={() => handleRoleSelect("client")}
        >
          {/* TODO: Replace with client illustration */}
          <View className="items-center mb-4">
            <View className="w-40 h-40 bg-card rounded-full items-center justify-center">
              <Image source={icons.client} style={{ width: 80, height: 80 }} />
            </View>
          </View>
          <Text className="text-primary font-bold text-xl text-center">
            Client
          </Text>
          <Text className="text-text-secondary text-center mt-1">
            I need home services
          </Text>
        </Pressable>

        {/* Worker Option */}
        <Pressable
          className="bg-card-light border-2 border-accent rounded-2xl p-6 items-center"
          onPress={() => handleRoleSelect("worker")}
        >
          {/* TODO: Replace with worker illustration */}
          <View className="items-center mb-4">
            <View className="w-40 h-40 bg-card rounded-full items-center justify-center">
              <Image source={icons.worker} style={{ width: 80, height: 80 }} />
            </View>
          </View>
          <Text className="text-accent font-bold text-xl text-center">
            Service Worker
          </Text>
          <Text className="text-text-secondary text-center mt-1">
            I offer home services
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
