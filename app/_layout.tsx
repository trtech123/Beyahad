import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router/react-navigation';
import {
  Heebo_400Regular,
  Heebo_500Medium,
  Heebo_700Bold,
} from '@expo-google-fonts/heebo';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Heebo_400Regular,
    Heebo_500Medium,
    Heebo_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboarding"
            options={{
              headerShown: false,
              gestureEnabled: false
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
