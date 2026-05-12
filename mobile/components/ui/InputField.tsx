import React, { useState } from "react";
import { Text, TextInput, Pressable, TextInputProps, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  editable?: boolean;
} & Pick<TextInputProps, "keyboardType" | "autoCapitalize">;

export const InputField: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  editable = true,
  keyboardType,
  autoCapitalize,
}) => {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);

  return (
    <View className="mb-4">
      <Text className="text-primary text-sm mb-1">{label}</Text>
      <View
        className={`flex-row items-center bg-white border border-card rounded-xl px-4 ${
          multiline ? "py-3" : "py-1.5"
        } ${!editable ? "opacity-60 bg-card-dark" : ""}`}
      >
        <TextInput
          className={`flex-1 text-primary ${
            multiline ? "min-h-[80px] text-top" : "h-10"
          }`}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#6B7299"
          secureTextEntry={isSecure}
          multiline={multiline}
          editable={editable}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <Pressable onPress={() => setIsSecure((prev) => !prev)}>
            <Ionicons
              name={isSecure ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#A0A8D0"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default InputField;
