import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export const LoadingSkeleton: React.FC = () => {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.7, { duration: 800 }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="p-4">
      {[1, 2, 3].map((i) => (
        <Animated.View
          key={i}
          className="bg-card rounded-2xl h-20 mb-3"
          style={animatedStyle}
        />
      ))}
    </View>
  );
};

export default LoadingSkeleton;
