import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

type Address = {
  id: string;
  label: string;
  address: string;
  isDefault?: boolean;
};

type Props = {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  isDefault?: boolean;
};

export const AddressCard: React.FC<Props> = ({
  address,
  onEdit,
  onDelete,
  isDefault = address.isDefault,
}) => {
  return (
    <View className="bg-card rounded-2xl p-4 mb-3 flex-row items-start">
      <Ionicons name="location-outline" size={24} color={colors.white} />
      <View className="flex-1 ml-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-primary font-bold">{address.label}</Text>
          {isDefault && (
            <View className="bg-accent rounded-full px-2 py-0.5">
              <Text className="text-primary text-xs">Default</Text>
            </View>
          )}
        </View>
        <Text className="text-primary text-sm mt-1">{address.address}</Text>
      </View>
      <Pressable onPress={onEdit} className="p-2">
        <Ionicons name="pencil-outline" size={20} color={colors.white} />
      </Pressable>
      <Pressable onPress={onDelete} className="p-2">
        <Ionicons name="trash-outline" size={20} color={colors.error} />
      </Pressable>
    </View>
  );
};

export default AddressCard;
