import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6']}
      style={{ flex: 1 }}
      className="flex-1 justify-center items-center px-6"
    >
      <View className="items-center space-y-8">
        {/* Heart Icon */}
        <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center">
          <Text className="text-4xl">💜</Text>
        </View>

        {/* Welcome Text */}
        <View className="items-center space-y-4">
          <Text className="text-4xl font-bold text-white text-center">
            ברוכים הבאים
          </Text>
          <Text className="text-xl font-medium text-white/90 text-center">
            ביחד
          </Text>
          <Text className="text-base text-white/80 text-center px-4 leading-6">
            כדי להתחיל את יוני ושיתקן,{'\n'}
            נשאל כמה שאלות קצרות על הקהילה שלך{'\n'}
            ביחד רק חיוני.
          </Text>
        </View>

        {/* Get Started Button */}
        <Pressable
          onPress={() => router.push('/onboarding')}
          className="bg-white px-8 py-4 rounded-2xl mt-8 w-full"
        >
          <Text className="text-purple-600 text-lg font-semibold text-center">
            התחל/י ❯
          </Text>
        </Pressable>

        {/* Sign In Link */}
        <Pressable onPress={() => router.push('/login')}>
          <Text className="text-white/80 text-base underline">
            יש לך כבר חשבון? התחבר/י
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}