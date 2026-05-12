import React from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (value: number) => void;
};

export const StarRating: React.FC<Props> = ({
  rating,
  size = 16,
  interactive,
  onRate
}) => {
  return (
    <View className="flex-row items-center">
      {Array.from({ length: 5 }).map((_, index) => {
        const value = index + 1;
        const filled = value <= rating;
        const Icon = (
          <Ionicons
            key={value}
            name={filled ? 'star' : 'star-outline'}
            size={size}
            color={filled ? '#F5C542' : '#6B7299'}
          />
        );
        if (!interactive) {
          return Icon;
        }
        return (
          <Pressable
            key={value}
            onPress={() => onRate && onRate(value)}
            className="mr-1"
          >
            {Icon}
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarRating;

