import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import StarRating from "../ui/StarRating";
import { workerActiveJobs } from "../../constants/dummyData";
import { colors } from "../../constants";

type Worker = {
  id: string;
  name: string;
  service: string;
  rate: number;
  rating: number;
  reviews: number;
  status: "available" | "unavailable";
};

type Props = {
  worker: Worker;
  onPress: () => void;
};

export const WorkerCard: React.FC<Props> = ({ worker, onPress }) => {
  return (
    <Pressable
      className="bg-card rounded-2xl p-4 mb-3 flex-row items-center"
      onPress={onPress}
    >
      {/* TODO: Replace with actual worker photo */}
      <View className="w-12 h-12 bg-card-dark rounded-full items-center justify-center mr-3">
        <Ionicons name="person-circle" size={40} color={colors.white} />
      </View>
      <View className="flex-1">
        <Text className="text-primary font-bold" numberOfLines={1}>
          {worker.name}
        </Text>
        <Text className="text-primary text-xs" numberOfLines={1}>
          {worker.service}
        </Text>
        <View className="flex-row items-center mt-1">
          <StarRating rating={worker.rating} size={12} />
          <Text className="text-white text-xs ml-1">
            ({worker.reviews} reviews)
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-primary font-bold">₱{worker.rate}/hr</Text>
        <View
          className={`px-2 py-0.5 rounded-full ${
            worker.status === "available" ? "bg-success/20" : "bg-error/20"
          }`}
        >
          <Text
            className={`text-xs font-semibold ${
              worker.status === "available" ? "text-success" : "text-error"
            }`}
          >
            {worker.status === "available" ? "Available" : "Busy"}
          </Text>
        </View>
        {worker.status !== "unavailable" &&
          workerActiveJobs[worker.id] &&
          workerActiveJobs[worker.id] > 0 && (
            <Text
              className={`${
                workerActiveJobs[worker.id] === 1
                  ? "text-warning text-xs mt-0.5"
                  : "text-error text-xs mt-0.5"
              }`}
            >
              {workerActiveJobs[worker.id] === 1
                ? "1 active job"
                : `${workerActiveJobs[worker.id]} active jobs`}
            </Text>
          )}
      </View>
    </Pressable>
  );
};

export default WorkerCard;
