import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../../../components/ui/SearchBar";
import CategoryCard from "../../../components/cards/CategoryCard";
import { categories } from "../../../constants/dummyData";

export default function CategoryIndexScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-primary text-2xl font-bold">Services</Text>
        <Pressable
          className="mt-3"
          onPress={() => router.push("/(client)/home/search")}
        >
          <SearchBar placeholder="Search services..." />
        </Pressable>
      </View>
      <FlatList
        data={categories}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        columnWrapperStyle={{ gap: 12, marginBottom: 12 }}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => router.push(`/(client)/category/${item.id}`)}
          />
        )}
      />
    </SafeAreaView>
  );
}
