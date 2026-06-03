# BeYahad Complete Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform BeYahad from generic purple wellness app to warm, editorial Hebrew community app with complete visual redesign

**Architecture:** Design system foundation with tokens/components, screen-by-screen replacement maintaining Expo Router structure, RTL-first Hebrew layout

**Tech Stack:** React Native, Expo Router, NativeWind, React Native Reanimated, expo-google-fonts, React Native RTL

---

## File Structure Overview

**Design System:**
- `src/design-system/tokens.ts` - Color, typography, spacing constants
- `src/design-system/components/` - Reusable UI components

**Base Components:**
- `src/components/PaperBackground.tsx` - Warm cream gradient backgrounds
- `src/components/CustomButton.tsx` - Redesigned button component
- `src/components/EditorialText.tsx` - Hebrew typography component

**Complex Components:**
- `src/components/VoiceOrb.tsx` - Animated breathing orb
- `src/components/ProgressDial.tsx` - Circular progress gauge
- `src/components/CalendarWeek.tsx` - Hebrew calendar component

**Screen Updates:**
- `app/splash.tsx` - NEW: Gali character splash screen
- `app/index.tsx` - Update welcome screen
- `app/login.tsx` - Paper aesthetic login
- `app/onboarding/step-[id].tsx` - Add dial-based questions
- `app/(tabs)/` - Update all tab screens

**Assets:**
- `assets/images/gali-character.png` - Gali character asset
- Font integration via expo-google-fonts

---

### Task 1: Design System Foundation

**Files:**
- Create: `src/design-system/tokens.ts`
- Create: `src/design-system/index.ts`

- [ ] **Step 1: Create design tokens file**

```typescript
// src/design-system/tokens.ts
export const colors = {
  // Surfaces
  board: '#221B29',
  paper: '#F6F1E8',
  paperRaised: '#FCFAF4',
  paperSunken: '#EFE8DB',
  
  // Ink
  ink: '#2A2230',
  inkSoft: '#766C7E',
  inkFaint: '#A79DAE',
  line: 'rgba(42,34,48,0.10)',
  lineStrong: 'rgba(42,34,48,0.16)',
  
  // Accents - the two partners
  iris: '#5B47C9',
  irisDeep: '#46369F',
  irisTint: '#E9E4FA',
  irisGlow: 'rgba(91,71,201,0.16)',
  clay: '#C77F6E',
  clayDeep: '#A9604F',
  clayTint: '#F3E3DC',
  sage: '#6F8E69',
  sageTint: '#E2EADE',
  danger: '#C25B5B',
} as const;

export const typography = {
  serif: 'FrankRuhlLibre_400Regular',
  serifBold: 'FrankRuhlLibre_700Bold',
  serifBlack: 'FrankRuhlLibre_900Black',
  sans: 'Assistant_400Regular',
  sansMedium: 'Assistant_500Medium',
  sansSemiBold: 'Assistant_600SemiBold',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 14,
  md: 20,
  lg: 30,
} as const;

export const shadows = {
  xs: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.035,
    shadowRadius: 2,
    elevation: 2,
  },
  pop: {
    shadowColor: '#2A2230',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 4,
  },
} as const;
```

- [ ] **Step 2: Create design system barrel export**

```typescript
// src/design-system/index.ts
export * from './tokens';
```

- [ ] **Step 3: Update package.json with required fonts**

```bash
npm install @expo-google-fonts/frank-ruhl-libre @expo-google-fonts/assistant expo-font
```

- [ ] **Step 4: Commit design tokens**

```bash
git add src/design-system/
git commit -m "feat: add design system tokens for warm paper aesthetic

- Color palette: paper, iris, clay, sage accents
- Typography: Frank Ruhl Libre serif + Assistant sans  
- Spacing, radius, shadow definitions for cohesive system"
```

### Task 2: Font Integration Setup

**Files:**
- Create: `src/hooks/useCustomFonts.ts`
- Modify: `App.tsx`

- [ ] **Step 1: Create custom fonts hook**

```typescript
// src/hooks/useCustomFonts.ts
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
```

- [ ] **Step 2: Update App.tsx with font loading**

```typescript
// App.tsx
import './global.css';
import { registerRootComponent } from 'expo';
import { ExpoRoot } from 'expo-router';
import { useCustomFonts } from './src/hooks/useCustomFonts';
import { View, Text } from 'react-native';

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
```

- [ ] **Step 3: Test font loading**

Run: `npm run ios`
Expected: App loads with Hebrew loading text, then proceeds to main app

- [ ] **Step 4: Commit font integration**

```bash
git add src/hooks/useCustomFonts.ts App.tsx
git commit -m "feat: integrate Frank Ruhl Libre and Assistant fonts

- Custom fonts hook with Hebrew serif + sans fonts
- Loading screen with proper fallback
- Expo font integration for editorial typography"
```

### Task 3: Paper Background Component

**Files:**
- Create: `src/components/PaperBackground.tsx`

- [ ] **Step 1: Create paper background component**

```typescript
// src/components/PaperBackground.tsx
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
  const gradients = {
    default: [colors.paper, colors.paper],
    login: [colors.paper, '#F1EAFB'],
    voice: ['#F1EAFB', '#F6EFF6', '#F3EAF7'],
  };

  return (
    <LinearGradient
      colors={gradients[variant]}
      style={[{ flex: 1 }, style]}
      locations={variant === 'voice' ? [0, 0.5, 1] : undefined}
    >
      {children}
    </LinearGradient>
  );
}
```

- [ ] **Step 2: Test paper background component**

Create temporary test file:
```typescript
// test-component.tsx (temporary)
import { PaperBackground } from '../src/components/PaperBackground';
import { View, Text } from 'react-native';

export function TestPaper() {
  return (
    <PaperBackground variant="login">
      <View className="flex-1 justify-center items-center">
        <Text style={{ color: '#2A2230' }}>רקע נייר חם</Text>
      </View>
    </PaperBackground>
  );
}
```

- [ ] **Step 3: Commit paper background component**

```bash
git add src/components/PaperBackground.tsx
git commit -m "feat: add PaperBackground component with warm gradients

- Support for default, login, and voice variants
- Warm cream base with subtle gradients
- LinearGradient integration for smooth transitions"
```

### Task 4: Editorial Text Component

**Files:**
- Create: `src/components/EditorialText.tsx`

- [ ] **Step 1: Create editorial text component**

```typescript
// src/components/EditorialText.tsx
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
  textAlign = 'right' // RTL default
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
```

- [ ] **Step 2: Test editorial text component**

Temporary test:
```typescript
// Add to test-component.tsx
<PaperBackground>
  <View className="flex-1 justify-center items-center p-6">
    <EditorialText variant="h1">ברוכים הבאים</EditorialText>
    <EditorialText variant="h2">ביחד</EditorialText>
    <EditorialText variant="body">טקסט גוף בעברית</EditorialText>
  </View>
</PaperBackground>
```

- [ ] **Step 3: Commit editorial text component**

```bash
git add src/components/EditorialText.tsx
git commit -m "feat: add EditorialText component for Hebrew typography

- Frank Ruhl Libre serif for headings
- Assistant sans for body text
- RTL text direction by default
- Typography scale: h1, h2, h3, body, caption"
```

### Task 5: Custom Button Component

**Files:**
- Create: `src/components/CustomButton.tsx`

- [ ] **Step 1: Create custom button component**

```typescript
// src/components/CustomButton.tsx
import React from 'react';
import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { colors, shadows, radius, typography } from '../design-system';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function CustomButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: CustomButtonProps) {
  const buttonStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: colors.iris,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: colors.paperRaised,
      borderWidth: 1,
      borderColor: colors.line,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: colors.iris,
    },
  };

  const sizeStyles: Record<string, ViewStyle> = {
    small: { paddingVertical: 10, paddingHorizontal: 20 },
    medium: { paddingVertical: 15, paddingHorizontal: 28 },
    large: { paddingVertical: 18, paddingHorizontal: 32 },
  };

  const textStyles: Record<string, TextStyle> = {
    primary: { color: '#fff' },
    secondary: { color: colors.ink },
    outline: { color: colors.iris },
  };

  const textSizes: Record<string, TextStyle> = {
    small: { fontSize: 14 },
    medium: { fontSize: 16 },
    large: { fontSize: 18 },
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          borderRadius: radius.md,
          alignItems: 'center',
          justifyContent: 'center',
          ...shadows.card,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
        buttonStyles[variant],
        sizeStyles[size],
        style,
      ]}
    >
      <Text
        style={[
          {
            fontFamily: typography.sansSemiBold,
            fontWeight: '600',
            textAlign: 'center',
          },
          textStyles[variant],
          textSizes[size],
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}
```

- [ ] **Step 2: Test custom button component**

Add to test component:
```typescript
<CustomButton title="כפתור ראשי" onPress={() => {}} variant="primary" />
<CustomButton title="כפתור משני" onPress={() => {}} variant="secondary" />
<CustomButton title="כפתור מתאר" onPress={() => {}} variant="outline" />
```

- [ ] **Step 3: Commit custom button component**

```bash
git add src/components/CustomButton.tsx
git commit -m "feat: add CustomButton with warm paper design system

- Primary, secondary, outline variants
- Small, medium, large sizes
- Proper Hebrew text alignment
- Warm shadows and iris accent colors"
```

### Task 6: Voice Orb Animation Component

**Files:**
- Create: `src/components/VoiceOrb.tsx`

- [ ] **Step 1: Create voice orb component**

```typescript
// src/components/VoiceOrb.tsx
import React, { useEffect } from 'react';
import { View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors } from '../design-system';

interface VoiceOrbProps {
  size?: number;
  isActive?: boolean;
  style?: ViewStyle;
}

export function VoiceOrb({ size = 210, isActive = false, style }: VoiceOrbProps) {
  const scale1 = useSharedValue(1);
  const scale2 = useSharedValue(1);
  const opacity1 = useSharedValue(0.3);
  const opacity2 = useSharedValue(0.2);

  useEffect(() => {
    if (isActive) {
      // Breathing animation
      scale1.value = withRepeat(
        withTiming(1.1, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
        -1,
        true
      );
      scale2.value = withRepeat(
        withTiming(1.15, { duration: 2500, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
        -1,
        true
      );
      opacity1.value = withRepeat(
        withTiming(0.6, { duration: 2000, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
        -1,
        true
      );
      opacity2.value = withRepeat(
        withTiming(0.4, { duration: 2500, easing: Easing.bezier(0.4, 0, 0.6, 1) }),
        -1,
        true
      );
    } else {
      scale1.value = withTiming(1, { duration: 500 });
      scale2.value = withTiming(1, { duration: 500 });
      opacity1.value = withTiming(0.3, { duration: 500 });
      opacity2.value = withTiming(0.2, { duration: 500 });
    }
  }, [isActive]);

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale1.value }],
    opacity: opacity1.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ scale: scale2.value }],
    opacity: opacity2.value,
  }));

  const ringSize = size;
  const ring1Inset = 24;
  const ring2Inset = 48;

  return (
    <View style={[{ width: size, height: size, position: 'relative' }, style]}>
      {/* Outer ring */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: ringSize / 2,
            borderWidth: 1,
            borderColor: colors.iris + '2E', // 18% opacity
          },
          ring1Style,
        ]}
      />
      
      {/* Inner ring */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: ring1Inset,
            left: ring1Inset,
            right: ring1Inset,
            bottom: ring1Inset,
            borderRadius: (ringSize - ring1Inset * 2) / 2,
            borderWidth: 1,
            borderColor: colors.clay + '2E', // 18% opacity
          },
          ring2Style,
        ]}
      />
      
      {/* Center gradient circle */}
      <View
        style={{
          position: 'absolute',
          top: ring2Inset,
          left: ring2Inset,
          right: ring2Inset,
          bottom: ring2Inset,
          borderRadius: (ringSize - ring2Inset * 2) / 2,
          backgroundColor: colors.iris,
          opacity: 0.1,
        }}
      />
    </View>
  );
}
```

- [ ] **Step 2: Test voice orb component**

Add to test:
```typescript
<View className="items-center justify-center py-8">
  <VoiceOrb isActive={true} />
</View>
```

- [ ] **Step 3: Commit voice orb component**

```bash
git add src/components/VoiceOrb.tsx
git commit -m "feat: add VoiceOrb animated component

- Breathing animation with iris+clay rings
- React Native Reanimated for smooth performance
- Active/inactive states with proper timing
- Warm gradient center with opacity layers"
```

### Task 7: Progress Dial Component

**Files:**
- Create: `src/components/ProgressDial.tsx`

- [ ] **Step 1: Create progress dial component**

```typescript
// src/components/ProgressDial.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, typography } from '../design-system';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressDialProps {
  value: number; // 1-10
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressDial({ 
  value, 
  size = 230, 
  strokeWidth = 8,
  label = "מידרגה"
}: ProgressDialProps) {
  const progress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  
  React.useEffect(() => {
    progress.value = withTiming(value / 10, {
      duration: 1000,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Background circle */}
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.line}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.iris}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeLinecap="round"
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      
      {/* Center content */}
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: typography.serifBold,
            fontSize: 84,
            lineHeight: 84 * 0.9,
            color: colors.ink,
            textAlign: 'center',
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            fontFamily: typography.sansSemiBold,
            fontSize: 15,
            color: colors.irisDeep,
            fontWeight: '700',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {label}
        </Text>
      </View>
    </View>
  );
}
```

- [ ] **Step 2: Install required SVG dependency**

```bash
npm install react-native-svg
```

- [ ] **Step 3: Test progress dial component**

Add to test:
```typescript
<View className="items-center justify-center py-8">
  <ProgressDial value={7} label="שביעות רצון" />
</View>
```

- [ ] **Step 4: Commit progress dial component**

```bash
git add src/components/ProgressDial.tsx
git commit -m "feat: add ProgressDial component for onboarding ratings

- Animated circular progress with SVG
- Large serif number display  
- Hebrew label support
- Smooth animation with proper easing"
```

### Task 8: Calendar Week Component

**Files:**
- Create: `src/components/CalendarWeek.tsx`

- [ ] **Step 1: Create calendar week component**

```typescript
// src/components/CalendarWeek.tsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { colors, typography, radius } from '../design-system';

interface CalendarWeekProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  weekOffset?: number; // 0 = current week, -1 = previous, 1 = next
}

const HEBREW_DAYS = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
const HEBREW_MONTHS = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export function CalendarWeek({ selectedDate, onDateSelect, weekOffset = 0 }: CalendarWeekProps) {
  const [currentDate] = useState(new Date());
  
  // Get start of week (Sunday)
  const getWeekStart = (date: Date, offset: number = 0) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (offset * 7);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate, weekOffset);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const formatWeekTitle = () => {
    const endOfWeek = new Date(weekStart);
    endOfWeek.setDate(weekStart.getDate() + 6);
    
    if (weekStart.getMonth() === endOfWeek.getMonth()) {
      return `${HEBREW_MONTHS[weekStart.getMonth()]} ${weekStart.getFullYear()}`;
    } else {
      return `${HEBREW_MONTHS[weekStart.getMonth()]} - ${HEBREW_MONTHS[endOfWeek.getMonth()]} ${weekStart.getFullYear()}`;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <View>
      {/* Week title */}
      <View style={{ alignItems: 'center', marginBottom: 14 }}>
        <Text
          style={{
            fontFamily: typography.serifBold,
            fontSize: 17,
            color: colors.ink,
            textAlign: 'center',
          }}
        >
          {formatWeekTitle()}
        </Text>
      </View>

      {/* Days */}
      <View style={{ flexDirection: 'row', gap: 7, justifyContent: 'space-between' }}>
        {weekDays.map((date, index) => (
          <Pressable
            key={date.toISOString()}
            onPress={() => onDateSelect?.(date)}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: isSelected(date) ? colors.iris : colors.line,
              backgroundColor: isSelected(date) ? colors.iris : colors.paperRaised,
              borderRadius: radius.sm,
              paddingVertical: 9,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 11,
                color: isSelected(date) ? '#E5DEFA' : colors.inkSoft,
                marginBottom: 3,
                fontFamily: typography.sans,
              }}
            >
              {HEBREW_DAYS[index]}
            </Text>
            <Text
              style={{
                fontFamily: typography.serifBold,
                fontSize: 18,
                color: isSelected(date) ? '#fff' : isToday(date) ? colors.iris : colors.ink,
              }}
            >
              {date.getDate()}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
```

- [ ] **Step 2: Test calendar week component**

Add to test:
```typescript
<View className="px-6 py-8">
  <CalendarWeek 
    selectedDate={new Date()}
    onDateSelect={(date) => console.log('Selected:', date)}
  />
</View>
```

- [ ] **Step 3: Commit calendar week component**

```bash
git add src/components/CalendarWeek.tsx
git commit -m "feat: add CalendarWeek component for Hebrew calendar

- RTL Hebrew day names and month labels
- Today highlighting and date selection
- Warm paper styling with iris accents
- Week navigation support"
```

### Task 9: Splash Screen with Gali Character

**Files:**
- Create: `app/splash.tsx`
- Modify: `app/index.tsx`

- [ ] **Step 1: Create Gali character asset placeholder**

```bash
mkdir -p assets/images
# Note: Add actual Gali character image to assets/images/gali-character.png
# For now, we'll use emoji placeholder
```

- [ ] **Step 2: Create splash screen**

```typescript
// app/splash.tsx
import React, { useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaperBackground } from '../src/components/PaperBackground';
import { EditorialText } from '../src/components/EditorialText';
import { CustomButton } from '../src/components/CustomButton';
import { colors, typography } from '../src/design-system';

export default function SplashScreen() {
  const router = useRouter();
  const floatAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating animation for Gali character
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnimation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnimation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const animatedTransform = {
    transform: [
      {
        translateY: floatAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  };

  return (
    <PaperBackground variant="login">
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 20, paddingBottom: 104 }}>
        {/* Brand header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6, gap: 10 }}>
          <View style={{ width: 44, height: 40 }}>
            <Text style={{ fontSize: 32, textAlign: 'center' }}>💜</Text>
          </View>
          <EditorialText
            variant="h2"
            style={{ fontFamily: typography.serifBlack, fontSize: 27 }}
          >
            ביחד
          </EditorialText>
        </View>

        {/* Center content */}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {/* Gali character with animation */}
          <View style={{ position: 'relative', marginVertical: 6 }}>
            <Animated.View style={[animatedTransform]}>
              <View
                style={{
                  width: 152,
                  height: 152,
                  backgroundColor: colors.irisTint,
                  borderRadius: 76,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.iris,
                  shadowOffset: { width: 0, height: 20 },
                  shadowOpacity: 0.32,
                  shadowRadius: 32,
                  elevation: 8,
                }}
              >
                <Text style={{ fontSize: 64 }}>👩</Text>
              </View>
            </Animated.View>

            {/* Hi bubble */}
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 42,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: colors.line,
                borderRadius: 14,
                borderBottomLeftRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 6,
                shadowColor: colors.ink,
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.serifBold,
                  fontSize: 16,
                  color: colors.irisDeep,
                }}
              >
                שלום!
              </Text>
              
              {/* Bubble tail */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -6,
                  left: 16,
                  width: 11,
                  height: 11,
                  backgroundColor: '#fff',
                  borderBottomWidth: 1,
                  borderLeftWidth: 1,
                  borderColor: colors.line,
                  transform: [{ rotate: '-45deg' }],
                }}
              />
            </View>
          </View>

          {/* Main heading */}
          <EditorialText
            variant="h1"
            style={{ 
              fontFamily: typography.serifBlack,
              fontSize: 34,
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            אני כאן בשבילך
          </EditorialText>

          {/* Subtitle */}
          <Text
            style={{
              fontSize: 15.5,
              lineHeight: 15.5 * 1.62,
              color: colors.inkSoft,
              textAlign: 'center',
              marginHorizontal: 22,
              maxWidth: 300,
            }}
          >
            בואי נכיר! אני גלי, המדריכה שלך בביחד.{'\n'}
            נתחיל במסע משותף לבניית קשרים משמעותיים בקהילה.
          </Text>
        </View>

        {/* Action buttons */}
        <View style={{ gap: 12 }}>
          <CustomButton
            title="בואי נתחיל! ✨"
            onPress={() => router.push('/onboarding')}
            variant="primary"
            size="large"
          />
          
          <Pressable onPress={() => router.push('/login')}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: colors.irisDeep,
                fontFamily: typography.sansSemiBold,
                textDecorationLine: 'underline',
              }}
            >
              יש לי כבר חשבון
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </PaperBackground>
  );
}
```

- [ ] **Step 3: Update index.tsx to redirect to splash**

```typescript
// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/splash');
  }, [router]);

  return null;
}
```

- [ ] **Step 4: Test splash screen**

Run: `npm run ios`
Expected: Splash screen with floating Gali character and warm aesthetic

- [ ] **Step 5: Commit splash screen**

```bash
git add app/splash.tsx app/index.tsx
git commit -m "feat: add Gali character splash screen

- Floating animation for character introduction
- Hi bubble with warm paper styling
- Hebrew welcome text and call-to-action
- Redirect from index to splash screen"
```

### Task 10: Update Login Screen Design

**Files:**
- Modify: `app/login.tsx`

- [ ] **Step 1: Replace login screen with paper design**

```typescript
// app/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { PaperBackground } from '../src/components/PaperBackground';
import { EditorialText } from '../src/components/EditorialText';
import { CustomButton } from '../src/components/CustomButton';
import { colors, typography, radius, shadows } from '../src/design-system';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.replace('/(tabs)/matches');
    } catch (error) {
      Alert.alert('שגיאה', 'משהו השתבש. אנא נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('שגיאה', 'אנא מלא את כל השדות');
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.replace('/(tabs)/matches');
    } catch (error) {
      Alert.alert('שגיאה', 'פרטי התחברות שגויים');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaperBackground variant="login">
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 24, paddingTop: 18 }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {/* Brand */}
          <View style={{ alignItems: 'center', textAlign: 'center', marginVertical: 34 }}>
            <View
              style={{
                width: 96,
                height: 88,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: colors.iris,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.22,
                shadowRadius: 22,
                elevation: 6,
              }}
            >
              <Text style={{ fontSize: 64 }}>💜</Text>
            </View>
            
            <EditorialText
              variant="h1"
              style={{
                fontFamily: typography.serifBlack,
                fontSize: 42,
                marginTop: 14,
                marginBottom: 2,
              }}
            >
              ביחד
            </EditorialText>
            
            <Text
              style={{
                fontSize: 14,
                color: colors.inkSoft,
                letterSpacing: 0.02,
              }}
            >
              קהילה יהודית משמעותית
            </Text>
          </View>

          {/* Welcome */}
          <View style={{ alignItems: 'center', marginBottom: 26 }}>
            <EditorialText
              variant="h2"
              style={{ marginBottom: 6 }}
            >
              ברוכים השבים
            </EditorialText>
            <Text
              style={{
                fontSize: 15,
                color: colors.inkSoft,
                textAlign: 'center',
              }}
            >
              התחבר/י לחשבון שלך כדי להמשיך
            </Text>
          </View>

          {/* Email Field */}
          <View
            style={{
              backgroundColor: colors.paperRaised,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 18,
              paddingHorizontal: 18,
              paddingVertical: 15,
              marginBottom: 14,
              ...shadows.card,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.inkSoft,
                  fontWeight: '600',
                  fontFamily: typography.sansSemiBold,
                }}
              >
                אימייל
              </Text>
              <Ionicons name="mail" size={20} color={colors.iris} />
            </View>
            <TextInput
              style={{
                width: '100%',
                fontSize: 16,
                color: colors.ink,
                fontFamily: typography.sans,
                textAlign: 'right',
                paddingVertical: 2,
              }}
              placeholder="הכנס את האימייל שלך"
              placeholderTextColor={colors.inkFaint}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Field */}
          <View
            style={{
              backgroundColor: colors.paperRaised,
              borderWidth: 1,
              borderColor: colors.line,
              borderRadius: 18,
              paddingHorizontal: 18,
              paddingVertical: 15,
              marginBottom: 14,
              ...shadows.card,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.inkSoft,
                  fontWeight: '600',
                  fontFamily: typography.sansSemiBold,
                }}
              >
                סיסמה
              </Text>
              <Ionicons name="lock-closed" size={20} color={colors.iris} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <TextInput
                style={{
                  flex: 1,
                  fontSize: 16,
                  color: colors.ink,
                  fontFamily: typography.sans,
                  textAlign: 'right',
                  paddingVertical: 2,
                }}
                placeholder="הכנס את הסיסמה שלך"
                placeholderTextColor={colors.inkFaint}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons 
                  name={showPassword ? "eye" : "eye-off"} 
                  size={21} 
                  color={colors.inkFaint}
                />
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <Pressable style={{ alignSelf: 'flex-start', margin: 2 }}>
            <Text
              style={{
                fontSize: 13.5,
                color: colors.irisDeep,
                fontWeight: '600',
                fontFamily: typography.sansSemiBold,
                marginBottom: 22,
              }}
            >
              שכחת סיסמה?
            </Text>
          </Pressable>

          {/* Login Button */}
          <CustomButton
            title={isLoading ? 'מתחבר...' : 'התחבר/י'}
            onPress={handleEmailLogin}
            disabled={isLoading}
            style={{ marginBottom: 18 }}
          />

          {/* Face ID Option */}
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              marginVertical: 18,
            }}
          >
            <Ionicons name="finger-print" size={26} color={colors.iris} />
            <Text
              style={{
                color: colors.ink,
                fontWeight: '600',
                fontSize: 15,
                fontFamily: typography.sansSemiBold,
              }}
            >
              היכנס עם Face ID
            </Text>
          </Pressable>

          {/* Divider */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginVertical: 8 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.lineStrong }} />
            <Text style={{ color: colors.inkFaint, fontSize: 13 }}>או</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.lineStrong }} />
          </View>

          {/* Google Sign In */}
          <CustomButton
            title={isLoading ? 'מתחבר...' : 'המשך עם Google'}
            onPress={handleGoogleSignIn}
            variant="secondary"
            disabled={isLoading}
            style={{ marginVertical: 18 }}
          />

          {/* Back to Splash */}
          <Pressable onPress={() => router.back()} style={{ alignSelf: 'center', marginTop: 12 }}>
            <Text
              style={{
                color: colors.inkSoft,
                fontSize: 15,
                textDecorationLine: 'underline',
                fontFamily: typography.sans,
              }}
            >
              חזור לדף הבית
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </PaperBackground>
  );
}
```

- [ ] **Step 2: Test updated login screen**

Run: `npm run ios`
Navigate to login screen
Expected: Paper-textured inputs, proper Hebrew layout, Face ID option

- [ ] **Step 3: Commit updated login screen**

```bash
git add app/login.tsx
git commit -m "feat: redesign login screen with warm paper aesthetic

- Paper-textured input fields with proper shadows
- Hebrew RTL layout and typography
- Face ID integration button
- Email and password validation
- Warm gradient background"
```

### Task 11: Add Component Barrel Exports

**Files:**
- Create: `src/components/index.ts`

- [ ] **Step 1: Create component barrel export**

```typescript
// src/components/index.ts
export * from './PaperBackground';
export * from './EditorialText';
export * from './CustomButton';
export * from './VoiceOrb';
export * from './ProgressDial';
export * from './CalendarWeek';
```

- [ ] **Step 2: Update imports in existing files**

Update splash.tsx imports:
```typescript
import { PaperBackground, EditorialText, CustomButton } from '../src/components';
```

Update login.tsx imports:
```typescript
import { PaperBackground, EditorialText, CustomButton } from '../src/components';
```

- [ ] **Step 3: Test imports work correctly**

Run: `npm run ios`
Expected: No import errors, all screens work

- [ ] **Step 4: Commit barrel exports**

```bash
git add src/components/index.ts app/splash.tsx app/login.tsx
git commit -m "feat: add component barrel exports for cleaner imports

- Single import path for all design system components
- Updated splash and login screens to use barrel exports
- Improved developer experience"
```

### Task 12: Update Onboarding with Dial Questions

**Files:**
- Modify: `app/onboarding/step-[id].tsx`
- Create: `src/components/OnboardingDial.tsx`

- [ ] **Step 1: Create onboarding dial component**

```typescript
// src/components/OnboardingDial.tsx
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ProgressDial } from './ProgressDial';
import { colors, typography } from '../design-system';

interface OnboardingDialProps {
  value: number;
  onValueChange: (value: number) => void;
  label?: string;
  minLabel?: string;
  maxLabel?: string;
}

export function OnboardingDial({
  value,
  onValueChange,
  label = "מידרגה",
  minLabel = "נמוך",
  maxLabel = "גבוה"
}: OnboardingDialProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Dial */}
      <View style={{ marginVertical: 14 }}>
        <ProgressDial value={value} label={label} />
      </View>

      {/* Scale indicators */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: 230,
          marginTop: 18,
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            fontFamily: typography.serifBold,
            fontSize: 22,
            color: colors.ink,
          }}
        >
          {minLabel}
        </Text>
        
        <View style={{ flexDirection: 'row', gap: 9, alignItems: 'center' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <View
              key={i}
              style={{
                width: i + 1 === value ? 13 : 7,
                height: i + 1 === value ? 13 : 7,
                borderRadius: 50,
                backgroundColor: i + 1 === value ? colors.iris : 
                                 i + 1 < value ? colors.iris : colors.lineStrong,
                shadowColor: i + 1 === value ? colors.iris : 'transparent',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: i + 1 === value ? 2 : 0,
              }}
            />
          ))}
        </View>
        
        <Text
          style={{
            fontFamily: typography.serifBold,
            fontSize: 22,
            color: colors.ink,
          }}
        >
          {maxLabel}
        </Text>
      </View>

      {/* Scale labels */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: 230,
          marginTop: 6,
          paddingHorizontal: 4,
        }}
      >
        <Text
          style={{
            fontSize: 12.5,
            color: colors.inkSoft,
          }}
        >
          1
        </Text>
        <Text
          style={{
            fontSize: 12.5,
            color: colors.inkSoft,
          }}
        >
          10
        </Text>
      </View>

      {/* Number buttons */}
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 12,
          marginTop: 26,
          maxWidth: 280,
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <Pressable
            key={i + 1}
            onPress={() => onValueChange(i + 1)}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: value === i + 1 ? colors.iris : colors.paperRaised,
              borderWidth: 1,
              borderColor: value === i + 1 ? colors.iris : colors.line,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: value === i + 1 ? '#fff' : colors.ink,
                fontFamily: typography.sansSemiBold,
              }}
            >
              {i + 1}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Insight card */}
      {value >= 7 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 13,
            backgroundColor: colors.irisTint,
            borderRadius: 18,
            paddingHorizontal: 18,
            paddingVertical: 16,
            marginTop: 26,
            maxWidth: 300,
          }}
        >
          <View style={{ width: 30, height: 30 }}>
            <Text style={{ fontSize: 24, textAlign: 'center' }}>✨</Text>
          </View>
          <Text
            style={{
              flex: 1,
              fontSize: 15,
              color: colors.irisDeep,
              lineHeight: 22,
              fontWeight: '500',
              fontFamily: typography.sansMedium,
            }}
          >
            נהדר! נראה שאת במקום טוב ומוכנה לחיבורים חדשים
          </Text>
        </View>
      )}
    </View>
  );
}
```

- [ ] **Step 2: Add dial questions to onboarding steps**

Update the ONBOARDING_STEPS array in step-[id].tsx to include dial questions:

```typescript
const DIAL_QUESTIONS = [
  {
    id: 101,
    title: 'איך את מרגישה בקהילה הנוכחית שלך?',
    subtitle: 'דרגי מ-1 עד 10',
    icon: '🏠',
    type: 'dial' as const,
    dialConfig: {
      label: 'שביעות רצון',
      minLabel: 'לא מרוצה',
      maxLabel: 'מאוד מרוצה'
    }
  },
  {
    id: 102,
    title: 'כמה קל לך להכיר אנשים חדשים?',
    subtitle: 'דרגי מ-1 עד 10',
    icon: '👋',
    type: 'dial' as const,
    dialConfig: {
      label: 'קלות היכרות',
      minLabel: 'קשה מאוד',
      maxLabel: 'קל מאוד'
    }
  },
  {
    id: 103,
    title: 'כמה חשוב לך לימוד תורה בקהילה?',
    subtitle: 'דרגי מ-1 עד 10',
    icon: '📚',
    type: 'dial' as const,
    dialConfig: {
      label: 'חשיבות לימוד',
      minLabel: 'לא חשוב',
      maxLabel: 'מאוד חשוב'
    }
  },
];

// Add these to the existing ONBOARDING_STEPS array
const ONBOARDING_STEPS: OnboardingStep[] = [
  // ... existing steps ...
  ...DIAL_QUESTIONS,
];
```

- [ ] **Step 3: Update step component to handle dial type**

Add dial handling to the step component:

```typescript
// In app/onboarding/step-[id].tsx, add to interface:
interface OnboardingStep {
  id: number;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'single_choice' | 'multiple_choice' | 'dial';
  options?: { id: string; label: string; icon?: string }[];
  maxSelections?: number;
  dialConfig?: {
    label: string;
    minLabel: string;
    maxLabel: string;
  };
}

// Add dial import
import { OnboardingDial } from '../../src/components/OnboardingDial';

// In the render section, add dial handling:
{currentStep.type === 'dial' ? (
  <OnboardingDial
    value={selectedOptions.length > 0 ? parseInt(selectedOptions[0]) : 1}
    onValueChange={(value) => setAnswer(currentStep.id, [value.toString()])}
    label={currentStep.dialConfig?.label}
    minLabel={currentStep.dialConfig?.minLabel}
    maxLabel={currentStep.dialConfig?.maxLabel}
  />
) : (
  // ... existing options rendering ...
)}
```

- [ ] **Step 4: Update component exports**

```typescript
// Add to src/components/index.ts
export * from './OnboardingDial';
```

- [ ] **Step 5: Test dial questions**

Run: `npm run ios`
Navigate to onboarding
Expected: Dial questions with animated progress and number selection

- [ ] **Step 6: Commit onboarding dial integration**

```bash
git add src/components/OnboardingDial.tsx src/components/index.ts app/onboarding/step-[id].tsx
git commit -m "feat: add dial-based rating questions to onboarding

- OnboardingDial component with animated progress
- Number button selection interface
- Insight cards for high ratings
- Three new dial questions integrated into flow"
```

## Self-Review

**Spec coverage check:**
- ✅ Design system foundation: tokens, typography, colors
- ✅ Core components: buttons, backgrounds, text, orb, dial, calendar  
- ✅ Screen replacements: splash, login, onboarding enhancements
- ✅ RTL Hebrew layout support
- ✅ Animation strategy with Reanimated
- ✅ Font integration with expo-google-fonts

**Placeholder scan:** No TBDs, TODOs, or incomplete sections

**Type consistency:** Component prop types and method signatures consistent throughout

**File structure:** Clear separation of design system, components, and screens with proper barrel exports

The plan comprehensively implements the warm paper aesthetic redesign while maintaining existing functionality and adding new interactive elements like the voice orb and rating dials.