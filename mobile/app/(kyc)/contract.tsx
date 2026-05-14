import React, { useRef, useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import ScreenHeader from "../../components/ui/ScreenHeader";
import PrimaryButton from "../../components/ui/PrimaryButton";

export default function ContractScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 40;
    if (isNearBottom) setHasScrolled(true);
  };

  const toggleAcceptance = () => {
    if (!hasScrolled) {
      Alert.alert(
        "Please Read",
        "Please read the entire contract before accepting.",
      );
      return;
    }
    setAccepted(!accepted);
  };

  const contractSections = [
    {
      heading: "SERVICE AGREEMENT — HomeEase Platform",
      body: 'This Service Agreement ("Agreement") is entered into between the Service Worker ("Worker") and HomeEase ("Platform"). By completing registration and using the platform, the Worker agrees to the following terms and conditions.',
    },
    {
      heading: "1. Worker Responsibilities",
      body: "The Worker agrees to: provide services professionally and punctually, maintain all required licenses and certifications, treat clients with respect and courtesy, complete agreed services to a satisfactory standard, and communicate promptly regarding any scheduling changes.",
    },
    {
      heading: "2. Platform Commission",
      body: "The Platform retains a service fee of 10% from each completed transaction. The Worker receives 90% of the agreed service price. Payments are processed within 24-48 hours of job completion.",
    },
    {
      heading: "3. Prohibited Conduct",
      body: "Workers must not: solicit clients outside the platform, misrepresent qualifications or experience, engage in discriminatory behavior, share client personal information, or provide services under the influence of substances.",
    },
    {
      heading: "4. Document Transparency",
      body: "Workers consent to having their submitted documents, certifications, and resume visible on their public profile. Clients use this information to make informed booking decisions. HomeEase does not independently verify the authenticity of submitted documents.",
    },
    {
      heading: "5. Termination",
      body: "Either party may terminate this agreement with 7 days written notice. HomeEase reserves the right to immediately suspend accounts involved in fraudulent, harmful, or policy-violating activity.",
    },
    {
      heading: "6. Dispute Resolution",
      body: "In the event of a dispute between Worker and Client, HomeEase will mediate based on available evidence including chat history, booking records, and submitted documentation. HomeEase's decision is final for platform-related matters.",
    },
    {
      heading: "7. Governing Law",
      body: "This Agreement is governed by the laws of the Republic of the Philippines. Any legal disputes shall be resolved in the appropriate courts of Bulacan province.",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Service Contract" showBack />
      <View className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 mx-4 mt-4 bg-card rounded-2xl"
          contentContainerStyle={{ padding: 24 }}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {contractSections.map((section, index) => (
            <View key={index}>
              <Text className="text-primary font-bold text-base mb-2">
                {section.heading}
              </Text>
              <Text className="text-text-secondary text-sm mb-4">
                {section.body}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View className="mx-4 mt-4 mb-2">
          <Pressable
            className="flex-row items-center mb-4"
            onPress={toggleAcceptance}
          >
            <View
              className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
                accepted
                  ? "bg-accent border-accent"
                  : hasScrolled
                    ? "border-accent"
                    : "border-divider"
              }`}
            >
              {accepted && (
                <Text className="text-primary text-xs font-bold">✓</Text>
              )}
            </View>
            <Text className="text-text-secondary text-sm flex-1">
              I have read and agree to the Service Agreement
            </Text>
          </Pressable>

          <PrimaryButton
            label="Complete Registration"
            fullWidth
            disabled={!accepted}
            onPress={() => router.push("/(kyc)/pending")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
