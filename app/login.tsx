import { View, Text, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.replace('/onboarding');
    } catch (error) {
      Alert.alert('שגיאה', 'משהו השתבש. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6']}
      style={{ flex: 1 }}
      className="flex-1 justify-center items-center px-6"
    >
      <View className="items-center space-y-8 w-full">
        {/* Logo */}
        <View className="items-center space-y-4">
          <View className="w-24 h-24 bg-white/20 rounded-full items-center justify-center">
            <Text className="text-4xl">💜</Text>
          </View>
          <Text className="text-3xl font-bold text-white">
            ביחד
          </Text>
        </View>

        {/* Welcome Text */}
        <View className="items-center space-y-2">
          <Text className="text-xl font-semibold text-white text-center">
            ברוכים השבים!
          </Text>
          <Text className="text-base text-white/80 text-center">
            התחבר/י לחשבון שלך כדי להמשיך
          </Text>
        </View>

        {/* Sign In Options */}
        <View className="w-full space-y-4">
          <Pressable
            onPress={handleGoogleSignIn}
            disabled={isLoading}
            className="bg-white px-6 py-4 rounded-2xl flex-row items-center justify-center space-x-3"
          >
            <Text className="text-lg">🔍</Text>
            <Text className="text-gray-800 text-lg font-semibold">
              {isLoading ? 'מתחבר...' : 'המשך עם Google'}
            </Text>
          </Pressable>

          <View className="items-center">
            <Text className="text-white/60 text-sm">
              או
            </Text>
          </View>

          <Pressable
            onPress={() => router.replace('/onboarding')}
            className="border-2 border-white/30 px-6 py-4 rounded-2xl"
          >
            <Text className="text-white text-lg font-semibold text-center">
              המשך כאורח/ת
            </Text>
          </Pressable>
        </View>

        {/* Back to Welcome */}
        <Pressable onPress={() => router.back()}>
          <Text className="text-white/80 text-base underline">
            חזור לדף הבית
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
