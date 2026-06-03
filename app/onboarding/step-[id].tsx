import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'single_choice' | 'multiple_choice' | 'age_selector' | 'text_input';
  options?: { id: string; label: string; icon?: string }[];
  minAge?: number;
  maxAge?: number;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'איזה היית מחר/ת את הקשר עליכם בקרוב?',
    subtitle: 'אפשר לבחור יותר מאשמר אחת',
    icon: '❤️',
    type: 'multiple_choice',
    options: [
      { id: 'deep', label: 'משהו הרחקה למגיד', icon: '💕' },
      { id: 'married', label: 'אני מחפש/ת בת זוג', icon: '💍' },
      { id: 'friends', label: 'אני רוצה לימצא חברים/ות', icon: '🤝' },
      { id: 'activity_partners', label: 'אני מחפש/ת שותפים פעילויות', icon: '🎯' },
    ]
  },
  {
    id: 2,
    title: 'עד כמה הכית מצופה בקרוב נרגל?',
    subtitle: 'מה עד 2 אפשרויות',
    icon: '🎯',
    type: 'single_choice',
    options: [
      { id: 'very_observant', label: 'אני נסגד מאד', icon: '📿' },
      { id: 'moderately_observant', label: 'אני נסגד בדרגות שונות', icon: '⚖️' },
      { id: 'traditional', label: 'אני מסורתי/ת', icon: '🕯️' },
      { id: 'secular', label: 'אני חילוני/ת', icon: '🌍' },
    ]
  }
];

export default function OnboardingStep() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const stepNumber = parseInt(id || '1');
  const currentStep = ONBOARDING_STEPS.find(step => step.id === stepNumber);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [ageValue, setAgeValue] = useState(25);

  if (!currentStep) {
    router.replace('/onboarding/complete');
    return null;
  }

  const handleOptionSelect = (optionId: string) => {
    if (currentStep.type === 'single_choice') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev =>
        prev.includes(optionId)
          ? prev.filter(id => id !== optionId)
          : [...prev, optionId]
      );
    }
  };

  const handleNext = () => {
    if (stepNumber >= 15) {
      router.replace('/onboarding/complete');
    } else {
      router.push(`/onboarding/step-${stepNumber + 1}`);
    }
  };

  const handleBack = () => {
    if (stepNumber <= 1) {
      router.back();
    } else {
      router.push(`/onboarding/step-${stepNumber - 1}`);
    }
  };

  const canContinue = selectedOptions.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between">
          <Pressable onPress={handleBack}>
            <Text className="text-2xl">←</Text>
          </Pressable>

          <View className="flex-row items-center space-x-2">
            <Text className="text-gray-500 text-sm">{stepNumber}/15</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mt-4 bg-gray-200 h-2 rounded-full">
          <View
            className="bg-purple-600 h-2 rounded-full"
            style={{ width: `${(stepNumber / 15) * 100}%` }}
          />
        </View>
      </View>

      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Icon */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center">
              <Text className="text-2xl">{currentStep.icon}</Text>
            </View>
          </View>

          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
            {currentStep.title}
          </Text>

          {currentStep.subtitle && (
            <Text className="text-base text-gray-600 text-center mb-8">
              {currentStep.subtitle}
            </Text>
          )}

          {/* Options */}
          {currentStep.type === 'single_choice' || currentStep.type === 'multiple_choice' ? (
            <View className="space-y-4">
              {currentStep.options?.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => handleOptionSelect(option.id)}
                  className={`p-4 rounded-2xl border-2 flex-row items-center ${
                    selectedOptions.includes(option.id)
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                    selectedOptions.includes(option.id)
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(option.id) && (
                      <Text className="text-white text-xs">✓</Text>
                    )}
                  </View>

                  <View className="flex-1 flex-row items-center">
                    <Text className="text-lg mr-3">{option.icon}</Text>
                    <Text className={`text-base font-medium ${
                      selectedOptions.includes(option.id)
                        ? 'text-purple-600'
                        : 'text-gray-700'
                    }`}>
                      {option.label}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="px-6 pb-6">
        <Pressable
          onPress={handleNext}
          disabled={!canContinue}
          className={`py-4 rounded-2xl ${
            canContinue
              ? 'bg-purple-600'
              : 'bg-gray-200'
          }`}
        >
          <Text className={`text-lg font-semibold text-center ${
            canContinue
              ? 'text-white'
              : 'text-gray-400'
          }`}>
            המשך
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}