import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import StepperHorizontal from "../../components/steppers/StepperHorizontal";
import PrimaryButton from "../../components/ui/PrimaryButton";
import OutlinedButton from "../../components/ui/OutlinedButton";
import EmptyState from "../../components/feedback/EmptyState";
import { colors } from "../../constants";

type Cert = { id: string; name: string; issuer: string };

export default function CertificationsScreen() {
  const router = useRouter();
  const [certs, setCerts] = useState<Cert[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [certName, setCertName] = useState("");
  const [certIssuer, setCertIssuer] = useState("");

  const handleAddCert = () => {
    if (!certName.trim() || !certIssuer.trim()) {
      Alert.alert(
        "Incomplete",
        "Please fill in both certification name and issuer",
      );
      return;
    }

    const newCert: Cert = {
      id: String(Date.now()),
      name: certName.trim(),
      issuer: certIssuer.trim(),
    };

    setCerts((prev) => [...prev, newCert]);
    setCertName("");
    setCertIssuer("");
    setShowModal(false);
  };

  const handleDeleteCert = (id: string) => {
    setCerts((prev) => prev.filter((cert) => cert.id !== id));
  };

  const handleSubmit = () => {
    if (certs.length === 0) {
      Alert.alert(
        "Add Certifications",
        "Please add at least one certification or skip for now",
      );
      return;
    }
    router.push("/(kyc)/resume");
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Certifications?",
      "You can add certifications to your profile later.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Skip",
          onPress: () => router.push("/(kyc)/resume"),
          style: "default",
        },
      ],
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Upload Certifications" showBack />
      <View className="flex-1 px-4">
        <StepperHorizontal
          steps={["ID", "Selfie", "Certs", "Resume"]}
          currentStep={2}
        />
        <Text className="text-text-secondary text-sm mb-4">Step 3 of 4</Text>

        {certs.length === 0 ? (
          <EmptyState
            title="No certifications yet"
            subtitle="Add your professional certifications"
            actionLabel="Add Certification"
            onAction={() => setShowModal(true)}
          />
        ) : (
          <FlatList
            data={certs}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View className="bg-card rounded-2xl p-4 mb-3 flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-primary font-bold">{item.name}</Text>
                  <Text className="text-text-secondary text-sm">
                    {item.issuer}
                  </Text>
                </View>
                <Pressable
                  onPress={() => handleDeleteCert(item.id)}
                  className="ml-3"
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color={colors.error}
                  />
                </Pressable>
              </View>
            )}
          />
        )}

        {certs.length > 0 && (
          <View className="py-4 gap-3">
            <OutlinedButton
              label="Add Another Certification"
              onPress={() => setShowModal(true)}
            />
          </View>
        )}

        <View className="py-4 gap-3">
          {certs.length > 0 && (
            <PrimaryButton label="Continue" fullWidth onPress={handleSubmit} />
          )}
          <OutlinedButton
            label={certs.length > 0 ? "Skip" : "Skip for Now"}
            // fullWidth
            onPress={handleSkip}
          />
        </View>
      </View>

      {/* Add Certification Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View className="flex-1 bg-black/40">
          <View className="flex-1 justify-end">
            <View className="bg-primary-white rounded-t-3xl p-6 pb-8">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-primary text-xl font-bold">
                  Add Certification
                </Text>
                <Pressable onPress={() => setShowModal(false)}>
                  <Ionicons
                    name="close"
                    size={24}
                    color={colors.text.primary}
                  />
                </Pressable>
              </View>

              <View className="mb-4">
                <Text className="text-text-primary text-sm font-semibold mb-2">
                  Certification Name
                </Text>
                <TextInput
                  placeholder="e.g., HVAC Technician License"
                  value={certName}
                  onChangeText={setCertName}
                  className="bg-card rounded-lg px-4 py-3 text-base"
                  placeholderTextColor={colors.text.muted}
                />
              </View>

              <View className="mb-6">
                <Text className="text-text-primary text-sm font-semibold mb-2">
                  Issuing Organization
                </Text>
                <TextInput
                  placeholder="e.g., Department of Mechanical Engineering"
                  value={certIssuer}
                  onChangeText={setCertIssuer}
                  className="bg-card rounded-lg px-4 py-3 text-base"
                  placeholderTextColor={colors.text.muted}
                />
              </View>

              <View className="gap-3">
                <PrimaryButton
                  label="Add Certification"
                  fullWidth
                  onPress={handleAddCert}
                />
                <OutlinedButton
                  label="Cancel"
                  // fullWidth
                  onPress={() => setShowModal(false)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
