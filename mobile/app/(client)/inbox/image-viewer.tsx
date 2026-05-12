import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ImageViewerScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10 flex-row justify-between px-4 py-2">
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable
          onPress={() =>
            require('react-native').Alert.alert('Saved', 'Image saved to gallery')
          }
        >
          <Ionicons name="download-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </SafeAreaView>
      <View className="flex-1 items-center justify-center">
        <Ionicons name="image" size={80} color="#A0A8D0" />
        <Text className="text-text-secondary mt-2">Image</Text>
      </View>
    </View>
  );
}
