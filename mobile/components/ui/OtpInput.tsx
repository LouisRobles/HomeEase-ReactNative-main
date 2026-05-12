import React, { useRef } from "react";
import { View, TextInput, Pressable } from "react-native";

type Props = {
  value: string;
  onChangeText: (value: string) => void;
  length?: number;
};

export const OtpInput: React.FC<Props> = ({
  value,
  onChangeText,
  length = 6,
}) => {
  const inputs = value.split("").concat(Array(length - value.length).fill(""));
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = value.split("");
    next[index] = digit;
    const joined = next.join("").slice(0, length);
    onChangeText(joined);
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    e: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(r) => {
            refs.current[index] = r;
          }}
          className="w-12 h-14 bg-card border border-accent rounded-xl text-primary text-center text-xl"
          value={inputs[index] || ""}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          placeholderTextColor="#6B7299"
        />
      ))}
    </View>
  );
};

export default OtpInput;
