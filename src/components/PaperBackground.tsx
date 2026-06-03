import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native';
import { colors, gradients } from '../design-system';

interface PaperBackgroundProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'default' | 'login' | 'voice';
}

export function PaperBackground({ style, children, variant = 'default' }: PaperBackgroundProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'login':
        return gradients.paperLogin;
      case 'voice':
        return gradients.paperVoice;
      case 'default':
      default:
        return [colors.paper, colors.paper] as const;
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      style={[{ flex: 1 }, style]}
      locations={variant === 'voice' ? ([0, 0.5, 1] as const) : undefined}
    >
      {children}
    </LinearGradient>
  );
}
