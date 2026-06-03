import { Stack } from 'expo-router';
import { View } from 'react-native';
import { OnboardingProvider } from '../../lib/onboarding-context';

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <View className="flex-1 bg-white">
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="step-[id]" />
          <Stack.Screen name="complete" />
        </Stack>
      </View>
    </OnboardingProvider>
  );
}
