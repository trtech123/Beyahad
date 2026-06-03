import './global.css';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import { View, Text } from 'react-native';

// Must be exported or Fast Refresh won't update the context
export function App() {
  const ctx = require.context('./app');
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F1E8' }}>
        <Text>טוען גופנים...</Text>
      </View>
    );
  }

  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
