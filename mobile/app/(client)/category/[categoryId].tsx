import React, { useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import WorkerCard from "../../../components/cards/WorkerCard";
import EmptyState from "../../../components/feedback/EmptyState";
import { workers, categories } from "../../../constants/dummyData";
import FilterSortBottomSheet from "../../../components/bottom-sheets/FilterSortBottomSheet";
import type { BottomSheetHandle } from "../../../components/bottom-sheets/BottomSheetWrapper";

export default function CategoryDetailScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const filterRef = useRef<BottomSheetHandle | null>(null);

  const category = categories.find((c) => c.id === categoryId);
  const categoryWorkers = workers.filter((w) =>
    w.service.toLowerCase().includes((category?.name ?? "").toLowerCase()),
  );

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader
        title={category?.name ?? "Category"}
        showBack
        rightIcon="options-outline"
        onRightPress={() => filterRef.current?.expand()}
      />
      <View className="px-4 pb-2">
        <Text className="text-text-secondary text-sm">
          {categoryWorkers.length} workers available
        </Text>
      </View>
      {categoryWorkers.length === 0 ? (
        <EmptyState
          title="No workers in this category"
          subtitle="Try another category"
        />
      ) : (
        <FlatList
          data={categoryWorkers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
          renderItem={({ item }) => (
            <WorkerCard
              worker={item}
              onPress={() =>
                router.push(`/(client)/category/worker/${item.id}`)
              }
            />
          )}
        />
      )}
      <FilterSortBottomSheet
        innerRef={filterRef}
        onApply={() => filterRef.current?.close()}
      />
    </SafeAreaView>
  );
}
