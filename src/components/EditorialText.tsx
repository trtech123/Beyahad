import React from 'react';
import { Text, TextStyle } from 'react-native';
import { typography, colors } from '../design-system';

interface EditorialTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  style?: TextStyle;
  textAlign?: 'left' | 'center' | 'right';
}

export function EditorialText({
  children,
  variant = 'body',
  color = colors.ink,
  style,
  textAlign = 'right', // RTL default
}: EditorialTextProps) {
  const variantStyles: Record<string, TextStyle> = {
    h1: {
      fontFamily: typography.serifBlack,
      fontSize: 42,
      lineHeight: 42,
      letterSpacing: -0.01,
    },
    h2: {
      fontFamily: typography.serifBold,
      fontSize: 30,
      lineHeight: 36,
      letterSpacing: -0.01,
    },
    h3: {
      fontFamily: typography.serifBold,
      fontSize: 20,
      lineHeight: 24,
    },
    body: {
      fontFamily: typography.sans,
      fontSize: 15,
      lineHeight: 22,
    },
    caption: {
      fontFamily: typography.sans,
      fontSize: 13,
      lineHeight: 18,
    },
  };

  return (
    <Text
      style={[
        variantStyles[variant],
        { color, textAlign, writingDirection: 'rtl' },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
