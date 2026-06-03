import { useFonts } from 'expo-font';
import {
  FrankRuhlLibre_400Regular,
  FrankRuhlLibre_700Bold,
  FrankRuhlLibre_900Black,
} from '@expo-google-fonts/frank-ruhl-libre';
import {
  Assistant_400Regular,
  Assistant_500Medium,
  Assistant_600SemiBold,
} from '@expo-google-fonts/assistant';

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    FrankRuhlLibre_400Regular,
    FrankRuhlLibre_700Bold,
    FrankRuhlLibre_900Black,
    Assistant_400Regular,
    Assistant_500Medium,
    Assistant_600SemiBold,
  });

  return fontsLoaded;
}
