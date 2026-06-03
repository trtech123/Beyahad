import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingComplete() {
  const router = useRouter();

  const handleContinue = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={['#6366f1', '#8b5cf6']}
        style={{ flex: 1 }}
        className="flex-1 justify-center items-center px-6"
      >
        <View className="items-center space-y-8">
          {/* Success Animation/Icon */}
          <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-4xl">✨</Text>
          </View>

          {/* Success Message */}
          <View className="items-center space-y-4">
            <Text className="text-3xl font-bold text-white text-center">
              מושלם!
            </Text>
            <Text className="text-xl text-white/90 text-center">
              הפרופיל שלך מוכן
            </Text>
            <Text className="text-base text-white/80 text-center px-4 leading-6">
              עכשיו נוכל להתחיל למצוא לך{'\n'}
              חברים וקשרים מתאימים{'\n'}
              בקהילה שלך
            </Text>
          </View>

          {/* Continue Button */}
          <Pressable
            onPress={handleContinue}
            className="bg-white px-8 py-4 rounded-2xl mt-8 w-full"
          >
            <Text className="text-purple-600 text-lg font-semibold text-center">
              בואו נתחיל! ❯
            </Text>
          </Pressable>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}