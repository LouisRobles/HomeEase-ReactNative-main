import React, { useRef } from "react";
import { View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchBar from "../../../components/ui/SearchBar";
import SectionHeader from "../../../components/ui/SectionHeader";
import PromoBanner from "../../../components/ui/PromoBanner";
import CategoryCard from "../../../components/cards/CategoryCard";
import WorkerCard from "../../../components/cards/WorkerCard";
import NotificationBadge from "../../../components/ui/NotificationBadge";
import { workers, categories } from "../../../constants/dummyData";
import { useNotificationStore } from "../../../store/notificationStore";
import FilterSortBottomSheet from "../../../components/bottom-sheets/FilterSortBottomSheet";
import type { BottomSheetHandle } from "../../../components/bottom-sheets/BottomSheetWrapper";

const PROMO_BANNERS = [
  { title: "20% Off Cleaning!", color: "#F59E0B" },
  { title: "New Workers Near You!", color: "#10B981" },
  { title: "Book Now, Pay Later!", color: "#E5E7EB" },
];

export default function ClientHomeScreen() {
  const router = useRouter();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const filterRef = useRef<BottomSheetHandle | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-primary-white" edges={["top"]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <Text className="text-primary text-xl font-bold">HomeEase</Text>
          <Pressable
            className="p-2"
            onPress={() => router.push("/(client)/inbox")}
          >
            <Ionicons name="notifications-outline" size={24} color="#1E40AF" />
            <NotificationBadge count={unreadCount} />
          </Pressable>
        </View>

        <View className="bg-card rounded-2xl p-5 mx-4 mt-4">
          <Text className="text-primary font-bold text-xl">
            Good morning, Carlo! 👋
          </Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="location-outline" size={16} color="#A0A8D0" />
            <Text className="text-text-secondary text-sm ml-1">
              Hagonoy, Bulacan
            </Text>
          </View>
        </View>

        <View className="mx-4 mt-3">
          <Pressable onPress={() => router.push("/(client)/home/search")}>
            <SearchBar
              placeholder="Search services or workers..."
              onFilterPress={() => filterRef.current?.expand()}
            />
          </Pressable>
        </View>

        <View className="mx-4">
          <PromoBanner banners={PROMO_BANNERS} />
        </View>

        <View className="mx-4 mt-4">
          <SectionHeader
            title="Our Services"
            actionLabel="See All"
            onActionPress={() => router.push("/(client)/category")}
          />
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryCard
                category={item}
                onPress={() => router.push(`/(client)/category/${item.id}`)}
              />
            )}
          />
        </View>

        <View className="mx-4 mt-6">
          <SectionHeader
            title="Available Workers"
            actionLabel="See All"
            onActionPress={() => router.push("/(client)/category")}
          />
          {workers.slice(0, 3).map((worker) => (
            <WorkerCard
              key={worker.id}
              worker={worker}
              onPress={() =>
                router.push(`/(client)/category/worker/${worker.id}`)
              }
            />
          ))}
        </View>
      </ScrollView>
      <FilterSortBottomSheet
        innerRef={filterRef}
        onApply={() => filterRef.current?.close()}
      />
    </SafeAreaView>
  );
}
