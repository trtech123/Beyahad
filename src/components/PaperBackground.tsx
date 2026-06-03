import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ViewStyle } from 'react-native';
import { colors } from '../design-system';

interface PaperBackgroundProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  variant?: 'default' | 'login' | 'voice';
}

export function PaperBackground({ style, children, variant = 'default' }: PaperBackgroundProps) {
  const getGradientColors = () => {
    switch (variant) {
      case 'login':
        return [colors.paper, '#F1EAFB'] as const;
      case 'voice':
        return ['#F1EAFB', '#F6EFF6', '#F3EAF7'] as const;
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
