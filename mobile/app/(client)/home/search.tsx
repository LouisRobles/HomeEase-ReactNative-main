import React, { useState, useRef } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import SearchBar from "../../../components/ui/SearchBar";
import WorkerCard from "../../../components/cards/WorkerCard";
import EmptyState from "../../../components/feedback/EmptyState";
import { workers } from "../../../constants/dummyData";
import FilterSortBottomSheet from "../../../components/bottom-sheets/FilterSortBottomSheet";
import type { BottomSheetHandle } from "../../../components/bottom-sheets/BottomSheetWrapper";
import LoadingSkeleton from "../../../components/feedback/LoadingSkeleton";

const RECENT = ["Plumbing", "Cleaning", "Electrical"];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState(RECENT);
  const [searching, setSearching] = useState(false);
  const filterRef = useRef<BottomSheetHandle | null>(null);

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = normalizedQuery
    ? workers.filter(
        (w) =>
          w.name.toLowerCase().includes(normalizedQuery) ||
          w.service.toLowerCase().includes(normalizedQuery),
      )
    : [];

  const handleChangeQuery = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setSearching(false);
      return;
    }
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
    }, 400);
  };

  const handleClearRecent = () => {
    Alert.alert("Clear recent searches?", undefined, [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", onPress: () => setRecentSearches([]) },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <View className="flex-row items-center px-4 py-2">
        <Pressable onPress={() => router.back()} className="p-2 mr-2">
          <Text className="text-accent font-semibold">Back</Text>
        </Pressable>
        <View className="flex-1">
          <SearchBar
            placeholder="Search services or workers..."
            value={query}
            onChangeText={handleChangeQuery}
            onFilterPress={() => filterRef.current?.expand()}
          />
        </View>
      </View>

      {!query.trim() && recentSearches.length > 0 && (
        <View className="px-4 mt-2">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-text-secondary text-sm">Recent</Text>
            <Pressable onPress={handleClearRecent}>
              <Text className="text-accent text-sm">Clear</Text>
            </Pressable>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {recentSearches.map((term) => (
              <Pressable
                key={term}
                className="bg-card-light rounded-full px-4 py-2"
                onPress={() => handleChangeQuery(term)}
              >
                <Text className="text-primary text-sm">{term}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {searching ? (
        <LoadingSkeleton />
      ) : query.trim() ? (
        filtered.length === 0 ? (
          <EmptyState
            title="No workers found"
            subtitle={`No results for "${query}"`}
          />
        ) : (
          <FlatList
            data={filtered}
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
        )
      ) : null}

      <FilterSortBottomSheet
        innerRef={filterRef}
        onApply={() => filterRef.current?.close()}
      />
    </SafeAreaView>
  );
}
