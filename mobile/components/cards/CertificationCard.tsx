import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StatusBadge from "../ui/StatusBadge";
import type { StatusType } from "../ui/StatusBadge";

type Cert = {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: string;
};

type Props = {
  cert: Cert;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const CertificationCard: React.FC<Props> = ({
  cert,
  onPress,
  onEdit,
  onDelete,
}) => {
  return (
    <Pressable className="bg-card rounded-2xl p-4 mb-3" onPress={onPress}>
      <View className="flex-row justify-between items-start">
        <Text className="text-primary font-bold flex-1">{cert.name}</Text>
        <StatusBadge status={cert.status as StatusType} />
      </View>
      <Text className="text-primary text-sm mt-1">{cert.issuer}</Text>
      <Text className="text-text-muted text-xs mt-1">
        {cert.issueDate} – {cert.expiryDate}
      </Text>
      <View className="flex-row mt-2">
        <Pressable onPress={onEdit} className="p-2">
          <Ionicons name="pencil-outline" size={18} color="#A0A8D0" />
        </Pressable>
        <Pressable onPress={onDelete} className="p-2">
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CertificationCard;
