import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../../../components/ui/ScreenHeader";
import StarRating from "../../../components/ui/StarRating";
import PrimaryButton from "../../../components/ui/PrimaryButton";
import OutlinedButton from "../../../components/ui/OutlinedButton";

const PARSED_RESUME = {
  name: "Dominic Paulo R. Dela Cruz",
  trade: "Plumbing",
  yearsOfExperience: 10,
  masteryLevel: "Expert",
  masteryScore: 5,
  summary:
    "Licensed plumber with over 10 years of hands-on experience in residential and commercial plumbing systems. Specializes in pipe installation, leak detection, and full system diagnostics.",
  skills: [
    { name: "Pipe Installation & Repair", level: "Expert" },
    { name: "Drain Cleaning", level: "Expert" },
    { name: "Fixture Installation", level: "Advanced" },
    { name: "Leak Detection", level: "Expert" },
    { name: "Water Heater Service", level: "Intermediate" },
    { name: "Emergency Repairs", level: "Advanced" },
  ],
  experience: [
    {
      company: "Bulacan Home Services",
      role: "Senior Plumber",
      years: "2018 - Present",
    },
    {
      company: "Metro Plumbing Co.",
      role: "Journeyman Plumber",
      years: "2014 - 2018",
    },
    {
      company: "TESDA Apprenticeship Program",
      role: "Apprentice",
      years: "2013 - 2014",
    },
  ],
  education: [
    {
      institution: "Bulacan State University",
      degree: "BSIT - Construction Technology",
      year: "2013",
    },
    {
      institution: "TESDA",
      degree: "National Certificate II - Plumbing",
      year: "2014",
    },
  ],
  certifications: [
    "PRC Licensed Plumber",
    "TESDA NC II",
    "Safety Training Certificate",
  ],
};

export default function ResumePreviewScreen() {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return { bg: "bg-success/20", text: "text-success" };
      case "Advanced":
        return { bg: "bg-accent/20", text: "text-accent" };
      case "Intermediate":
        return { bg: "bg-warning/20", text: "text-warning" };
      default:
        return { bg: "bg-text-muted/20", text: "text-text-muted" };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-white">
      <ScreenHeader title="Resume Analysis" showBack />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      >
        {/* SECTION 1 - AI Analysis Header Card */}
        <View className="bg-accent rounded-2xl p-4 mx-0 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="sparkles" size={24} color="#FFFFFF" />
            <Text className="text-primary font-bold text-base ml-2">
              AI-Powered Resume Analysis
            </Text>
          </View>
          <Text className="text-primary/70 text-xs mt-1">
            Powered by Claude AI · Analyzed just now
          </Text>
          <View className="bg-primary/20 rounded-xl p-3 mt-3 flex-row items-center justify-between">
            <Text className="text-primary text-sm">Overall Match Score</Text>
            <Text className="text-primary font-bold text-2xl">92%</Text>
          </View>
        </View>

        {/* SECTION 2 - Profile Overview Card */}
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold text-base mb-3">
            Profile Overview
          </Text>
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-accent/20 rounded-full items-center justify-center mr-4">
              <Ionicons name="person-circle" size={48} color="#4B5FD6" />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold text-lg">
                {PARSED_RESUME.name}
              </Text>
              <Text className="text-accent text-sm">{PARSED_RESUME.trade}</Text>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="time-outline" size={14} color="#A0A8D0" />
                <Text className="text-text-secondary text-xs ml-1">
                  {PARSED_RESUME.yearsOfExperience} years experience
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-3 flex-row items-center justify-between bg-card-dark rounded-xl p-3">
            <View>
              <Text className="text-text-secondary text-xs">Mastery Level</Text>
              <Text className="text-primary font-bold text-base mt-0.5">
                {PARSED_RESUME.masteryLevel}
              </Text>
            </View>
            <StarRating rating={PARSED_RESUME.masteryScore} size={20} />
          </View>
          <Text className="text-text-secondary text-sm mt-3 leading-5">
            {PARSED_RESUME.summary}
          </Text>
        </View>

        {/* SECTION 3 - Skills Card */}
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold text-base mb-3">
            Extracted Skills
          </Text>
          {PARSED_RESUME.skills.map((skill, index) => {
            const colors = getLevelColor(skill.level);
            return (
              <View
                key={index}
                className={`flex-row items-center justify-between py-2 border-b border-divider ${
                  index === PARSED_RESUME.skills.length - 1 ? "border-0" : ""
                }`}
              >
                <Text className="text-primary text-sm flex-1">
                  {skill.name}
                </Text>
                <View className={`${colors.bg} rounded-full px-2 py-0.5`}>
                  <Text className={`${colors.text} text-xs font-semibold`}>
                    {skill.level}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* SECTION 4 - Experience Card */}
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold text-base mb-3">
            Work Experience
          </Text>
          {PARSED_RESUME.experience.map((entry, index) => (
            <View
              key={index}
              className={`flex-row mb-3 ${
                index === PARSED_RESUME.experience.length - 1 ? "mb-0" : ""
              }`}
            >
              <View className="w-2 h-2 rounded-full bg-accent mt-1.5 mr-3 flex-shrink-0" />
              <View className="flex-1">
                <Text className="text-primary font-semibold text-sm">
                  {entry.role}
                </Text>
                <Text className="text-text-secondary text-xs">
                  {entry.company}
                </Text>
                <Text className="text-text-muted text-xs mt-0.5">
                  {entry.years}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* SECTION 5 - Education Card */}
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold text-base mb-3">
            Education & Training
          </Text>
          {PARSED_RESUME.education.map((entry, index) => (
            <View
              key={index}
              className={`flex-row items-start mb-3 ${
                index === PARSED_RESUME.education.length - 1 ? "mb-0" : ""
              }`}
            >
              <Ionicons name="school-outline" size={16} color="#4B5FD6" />
              <View className="flex-1 ml-3">
                <Text className="text-primary font-semibold text-sm">
                  {entry.degree}
                </Text>
                <Text className="text-text-secondary text-xs">
                  {entry.institution}
                </Text>
                <Text className="text-text-muted text-xs mt-0.5">
                  {entry.year}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* SECTION 6 - Certifications Card */}
        <View className="bg-card rounded-2xl p-4 mb-4">
          <Text className="text-primary font-bold text-base mb-3">
            Certifications
          </Text>
          {PARSED_RESUME.certifications.map((cert, index) => (
            <View
              key={index}
              className={`flex-row items-center mb-2 ${
                index === PARSED_RESUME.certifications.length - 1 ? "mb-0" : ""
              }`}
            >
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text className="text-primary text-sm ml-2">{cert}</Text>
            </View>
          ))}
        </View>

        {/* SECTION 7 - Action Buttons */}
        <View className="gap-3 mt-2">
          <PrimaryButton
            label="Use This Profile Data"
            fullWidth
            onPress={() => {
              Alert.alert(
                "Success",
                "Profile data applied! Your profile has been updated with the parsed resume information.",
              );
            }}
          />
          <OutlinedButton
            label="Edit Before Saving"
            onPress={() => {
              Alert.alert("Coming Soon", "Edit mode coming soon.");
            }}
          />
          <Text className="text-text-muted text-xs text-center mt-2">
            AI analysis may not be 100% accurate. Please review before saving.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
