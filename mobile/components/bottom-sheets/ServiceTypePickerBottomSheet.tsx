import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import BottomSheetWrapper, { BottomSheetHandle } from "./BottomSheetWrapper";
import { categories } from "../../constants/dummyData";

type Props = {
  innerRef: React.RefObject<BottomSheetHandle | null>;
  onSelect: (name: string) => void;
};

export const ServiceTypePickerBottomSheet: React.FC<Props> = ({
  innerRef,
  onSelect,
}) => {
  return (
    <BottomSheetWrapper
      innerRef={innerRef}
      snapPoints={["50%"]}
      title="Select service"
    >
      <ScrollView className="max-h-64">
        {categories.map((c) => (
          <Pressable
            key={c.id}
            className="bg-card-light rounded-xl py-4 px-4 mb-2"
            onPress={() => onSelect(c.name)}
          >
            <Text className="text-primary font-semibold">{c.name}</Text>
            <Text className="text-primary text-xs">
              {c.count} workers available
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </BottomSheetWrapper>
  );
};

export default ServiceTypePickerBottomSheet;
