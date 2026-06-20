import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheetWrapper, { BottomSheetHandle } from "./BottomSheetWrapper";
import PrimaryButton from "../ui/PrimaryButton";
import { categories } from "../../constants/dummyData";

type Props = {
  innerRef: React.RefObject<BottomSheetHandle | null>;
  onApply: () => void;
};

export const FilterSortBottomSheet: React.FC<Props> = ({
  innerRef,
  onApply,
}) => {
  const [sort, setSort] = useState<"rating" | "priceLow" | "priceHigh">(
    "rating",
  );
  const [availableOnly, setAvailableOnly] = useState(false);

  const handleApply = () => {
    onApply();
    innerRef.current?.close();
  };

  return (
    <BottomSheetWrapper
      innerRef={innerRef}
      snapPoints={["60%"]}
      title="Filter & Sort"
    >
      <Text className="text-primary text-sm mb-2">Sort by</Text>
      <View className="flex-row gap-2 mb-4">
        {[
          { value: "rating" as const, label: "Rating" },
          { value: "priceLow" as const, label: "Price Low-High" },
          { value: "priceHigh" as const, label: "Price High-Low" },
        ].map((opt) => (
          <Pressable
            key={opt.value}
            className={`px-3 py-2 rounded-xl ${
              sort === opt.value ? "bg-accent" : "bg-card-light"
            }`}
            onPress={() => setSort(opt.value)}
          >
            <Text
              className={
                sort === opt.value ? "text-white font-semibold" : "text-primary"
              }
            >
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-primary">Available only</Text>
        <Pressable
          className={`w-12 h-7 rounded-full ${
            availableOnly ? "bg-accent" : "bg-card-light"
          }`}
          onPress={() => setAvailableOnly((v) => !v)}
        >
          <View
            className={`w-5 h-5 rounded-full bg-card mt-1 ${
              availableOnly ? "ml-6" : "ml-1"
            }`}
          />
        </Pressable>
      </View>
      <PrimaryButton label="Apply" fullWidth onPress={handleApply} />
      <Pressable className="mt-3" onPress={() => innerRef.current?.close()}>
        <Text className="text-primary text-center">Reset</Text>
      </Pressable>
    </BottomSheetWrapper>
  );
};

export default FilterSortBottomSheet;
