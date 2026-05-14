import React, { useState, useRef, useMemo } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../../../components/ui/ScreenHeader";
import StepperHorizontal from "../../../../components/steppers/StepperHorizontal";
import InputField from "../../../../components/ui/InputField";
import PrimaryButton from "../../../../components/ui/PrimaryButton";
import ServiceTypePickerBottomSheet from "../../../../components/bottom-sheets/ServiceTypePickerBottomSheet";
import { useBookingStore } from "../../../../store/bookingStore";
import { workers } from "../../../../constants/dummyData";
import {
  serviceConfigs,
  type ServiceTask,
  type ServiceConfig,
} from "../../../../constants/serviceData";
import type { BottomSheetHandle } from "../../../../components/bottom-sheets/BottomSheetWrapper";

export default function BookingStep1Screen() {
  const router = useRouter();
  const draft = useBookingStore((s) => s.draft);
  const setDraft = useBookingStore((s) => s.setDraft);
  const [category, setCategory] = useState<string | null>(draft.category);
  const [description, setDescription] = useState(draft.description);
  const [selectedTask, setSelectedTask] = useState<ServiceTask | null>(null);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const addressSet = !!draft.address;
  const serviceSheetRef = useRef<BottomSheetHandle | null>(null);

  // Find matching service config for the selected category
  const serviceConfig = useMemo(() => {
    if (!category) return null;
    return serviceConfigs.find(
      (config) => config.categoryName.toLowerCase() === category.toLowerCase(),
    );
  }, [category]);

  // Compute estimated price
  const computeEstimatedPrice = (
    task: ServiceTask,
    addOnIds: string[],
    config: ServiceConfig,
  ) => {
    const addOnTotal = config.addOns
      .filter((a) => addOnIds.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return task.basePrice + addOnTotal;
  };

  const estimatedPrice =
    selectedTask && serviceConfig
      ? computeEstimatedPrice(selectedTask, selectedAddOns, serviceConfig)
      : 0;

  const canNext =
    category && addressSet && (!serviceConfig || selectedTask !== null);

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Book a Service" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
      >
        <StepperHorizontal
          steps={["Service", "Schedule", "Payment"]}
          currentStep={0}
        />
        <Text className="text-primary font-bold text-lg mt-4">
          Service Details
        </Text>

        <Pressable
          className="bg-card rounded-xl p-4 mt-3 flex-row items-center justify-between"
          onPress={() => serviceSheetRef.current?.expand()}
        >
          <Text
            className={
              category ? "text-primary font-semibold" : "text-text-muted"
            }
          >
            {category ?? "Select service category"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#A0A8D0" />
        </Pressable>

        {/* Task Selection */}
        {serviceConfig && (
          <>
            <Text className="text-text-secondary text-sm mb-1 mt-3">
              Select Task
            </Text>
            <ScrollView horizontal={false} className="flex-1">
              {serviceConfig.tasks.map((task) => (
                <Pressable
                  key={task.id}
                  className={`bg-card rounded-xl p-3 mb-2 flex-row items-center ${
                    selectedTask?.id === task.id
                      ? "border-2 border-accent"
                      : "border-2 border-transparent"
                  }`}
                  onPress={() => {
                    setSelectedTask(task);
                    setDraft({
                      selectedTaskId: task.id,
                      estimatedPrice: computeEstimatedPrice(
                        task,
                        selectedAddOns,
                        serviceConfig,
                      ),
                    });
                  }}
                >
                  <View className="flex-1">
                    <Text className="text-primary font-semibold">
                      {task.name}
                    </Text>
                    <Text className="text-text-secondary text-xs mt-0.5">
                      {task.description}
                    </Text>
                  </View>
                  <View className="items-end ml-3">
                    <Text className="text-accent font-semibold">
                      ₱{task.basePrice}
                    </Text>
                    <Text className="text-text-muted text-xs">
                      {task.durationHours}hr{task.durationHours > 1 ? "s" : ""}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        {/* Add-ons Selection */}
        {serviceConfig && selectedTask && (
          <>
            <Text className="text-text-secondary text-sm mb-1 mt-3">
              Add-ons (Optional)
            </Text>
            <ScrollView horizontal={false} className="flex-1">
              {serviceConfig.addOns.map((addOn) => (
                <Pressable
                  key={addOn.id}
                  className={`bg-card rounded-xl p-3 mb-2 flex-row items-center ${
                    selectedAddOns.includes(addOn.id)
                      ? "border-2 border-accent"
                      : "border-2 border-transparent"
                  }`}
                  onPress={() => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    const updatedAddOns = isSelected
                      ? selectedAddOns.filter((id) => id !== addOn.id)
                      : [...selectedAddOns, addOn.id];
                    setSelectedAddOns(updatedAddOns);
                    setDraft({
                      selectedAddOnIds: updatedAddOns,
                      estimatedPrice: computeEstimatedPrice(
                        selectedTask,
                        updatedAddOns,
                        serviceConfig,
                      ),
                    });
                  }}
                >
                  <View className="flex-1">
                    <Text className="text-primary font-semibold">
                      {addOn.name}
                    </Text>
                    <Text className="text-text-secondary text-xs mt-0.5">
                      {addOn.description}
                    </Text>
                  </View>
                  <View className="items-center ml-3">
                    <Text className="text-accent font-semibold">
                      +₱{addOn.price}
                    </Text>
                    <View
                      className={`w-5 h-5 rounded border-2 border-accent items-center justify-center mt-1 ${
                        selectedAddOns.includes(addOn.id)
                          ? "bg-accent"
                          : "bg-transparent"
                      }`}
                    >
                      {selectedAddOns.includes(addOn.id) && (
                        <Text className="text-primary text-xs">✓</Text>
                      )}
                    </View>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}

        {/* Price Estimate Card */}
        {selectedTask && serviceConfig && (
          <View className="bg-card rounded-2xl p-4 mt-3">
            <Text className="text-primary font-bold mb-2">Price Estimate</Text>
            <View className="flex-row justify-between items-center mb-1">
              <Text className="text-text-secondary text-sm">
                {selectedTask.name}
              </Text>
              <Text className="text-primary text-sm">
                ₱{selectedTask.basePrice}
              </Text>
            </View>
            {selectedAddOns.map((addOnId) => {
              const addOn = serviceConfig.addOns.find((a) => a.id === addOnId);
              return addOn ? (
                <View
                  key={addOnId}
                  className="flex-row justify-between items-center mb-1"
                >
                  <Text className="text-text-secondary text-sm">
                    {addOn.name}
                  </Text>
                  <Text className="text-primary text-sm">+₱{addOn.price}</Text>
                </View>
              ) : null;
            })}
            <View className="border-b border-divider my-2" />
            <View className="flex-row justify-between items-center">
              <Text className="text-primary font-bold text-base">
                Estimated Total
              </Text>
              <Text className="text-accent font-bold text-base">
                ₱{estimatedPrice}
              </Text>
            </View>
            <Text className="text-text-muted text-xs mt-2">
              * Final price may vary based on actual scope of work
            </Text>
          </View>
        )}

        <InputField
          label="Description"
          value={description}
          onChangeText={(t) => {
            setDescription(t);
            setDraft({ description: t });
          }}
          placeholder="Describe what you need..."
          multiline
        />

        <Text className="text-text-secondary text-sm mb-1">Address</Text>
        <Pressable
          className="bg-card rounded-xl p-4 flex-row items-center"
          onPress={() => router.push("/(client)/booking/address-picker")}
        >
          <Ionicons name="location-outline" size={20} color="#4B5FD6" />
          <Text
            className={
              addressSet
                ? "text-primary ml-3 flex-1"
                : "text-text-muted ml-3 flex-1"
            }
          >
            {addressSet ? draft.address! : "Tap to set your location"}
          </Text>
        </Pressable>

        {draft.workerId && (
          <>
            <Text className="text-text-secondary text-sm mb-1 mt-4">
              Selected Worker
            </Text>
            {(() => {
              const selectedWorker = workers.find(
                (w) => w.id === draft.workerId,
              );
              return selectedWorker ? (
                <View className="bg-card rounded-xl p-4 flex-row items-center mt-2">
                  <Ionicons name="person-circle" size={32} color="#A0A8D0" />
                  <View className="ml-3 flex-1">
                    <Text className="text-primary font-semibold">
                      {selectedWorker.name}
                    </Text>
                    <Text className="text-text-secondary text-xs">
                      {selectedWorker.service}
                    </Text>
                  </View>
                  <Pressable onPress={() => setDraft({ workerId: null })}>
                    <Text className="text-accent text-sm">Change</Text>
                  </Pressable>
                </View>
              ) : null;
            })()}
          </>
        )}

        <View className="mt-8">
          <PrimaryButton
            label="Next"
            fullWidth
            disabled={!canNext}
            onPress={() => {
              if (!canNext) {
                Alert.alert(
                  "Error",
                  "Please select category and address" +
                    (serviceConfig ? " and task" : ""),
                );
                return;
              }
              setDraft({ category, description });
              router.push("/(client)/booking/new/step-2");
            }}
          />
        </View>
      </ScrollView>
      <ServiceTypePickerBottomSheet
        innerRef={serviceSheetRef}
        onSelect={(name) => {
          setCategory(name);
          setSelectedTask(null);
          setSelectedAddOns([]);
          setDraft({
            category: name,
            selectedTaskId: null,
            selectedAddOnIds: [],
            estimatedPrice: 0,
          });
          serviceSheetRef.current?.close();
        }}
      />
    </SafeAreaView>
  );
}
