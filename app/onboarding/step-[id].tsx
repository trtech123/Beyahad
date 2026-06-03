import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useOnboardingAnswers } from '../../lib/onboarding-context';

interface OnboardingStep {
  id: number;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'single_choice' | 'multiple_choice';
  options?: { id: string; label: string; icon?: string }[];
  maxSelections?: number;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'איזה סוג קשר תרצה/י למצוא?',
    subtitle: 'אפשר לבחור יותר מאפשרות אחת',
    icon: '❤️',
    type: 'multiple_choice',
    options: [
      { id: 'study_partner', label: 'חברותא או שותף/ה ללימוד', icon: '📚' },
      { id: 'community_friend', label: 'חברים מהקהילה', icon: '🤝' },
      { id: 'service_partner', label: 'שותפים להתנדבות', icon: '🎯' },
      { id: 'mentorship', label: 'ליווי או מנטורינג', icon: '🌱' },
    ]
  },
  {
    id: 2,
    title: 'איך היית מתאר/ת את אורח החיים היהודי שלך?',
    subtitle: 'בחר/י את האפשרות הקרובה ביותר',
    icon: '🎯',
    type: 'single_choice',
    options: [
      { id: 'orthodox', label: 'דתי/ת', icon: '📿' },
      { id: 'conservative', label: 'מסורתי/ת שומר/ת מצוות', icon: '⚖️' },
      { id: 'traditional', label: 'אני מסורתי/ת', icon: '🕯️' },
      { id: 'secular', label: 'אני חילוני/ת', icon: '🌍' },
    ]
  },
  {
    id: 3,
    title: 'איזה טווח גילאים מתאים לך?',
    subtitle: 'למי תרצה/י שנציע אותך?',
    icon: '🎂',
    type: 'single_choice',
    options: [
      { id: '18_25', label: '18-25', icon: '🌿' },
      { id: '26_35', label: '26-35', icon: '✨' },
      { id: '36_50', label: '36-50', icon: '🌻' },
      { id: '51_plus', label: '51+', icon: '🌳' },
    ]
  },
  {
    id: 4,
    title: 'איפה נוח לך להכיר?',
    subtitle: 'בחר/י את אזור הקהילה המרכזי',
    icon: '📍',
    type: 'single_choice',
    options: [
      { id: 'tel_aviv', label: 'תל אביב והמרכז', icon: '🏙️' },
      { id: 'jerusalem', label: 'ירושלים והסביבה', icon: '🏛️' },
      { id: 'north', label: 'הצפון', icon: '🌄' },
      { id: 'south', label: 'הדרום', icon: '🏜️' },
    ]
  },
  {
    id: 5,
    title: 'באילו שירותים קהילתיים תרצה/י להשתלב?',
    subtitle: 'אפשר לבחור כמה שמתאים',
    icon: '🕍',
    type: 'multiple_choice',
    options: [
      { id: 'gabai', label: 'עזרה בגבאות', icon: '🤲' },
      { id: 'torah_reading', label: 'קריאת תורה', icon: '📖' },
      { id: 'prayer_leading', label: 'הובלת תפילה', icon: '🎶' },
      { id: 'hosting', label: 'אירוח וסעודות', icon: '🍽️' },
    ]
  },
  {
    id: 6,
    title: 'מה מעניין אותך בקהילה?',
    subtitle: 'בחר/י תחומי עניין משותפים',
    icon: '💬',
    type: 'multiple_choice',
    options: [
      { id: 'torah', label: 'לימוד תורה', icon: '📚' },
      { id: 'volunteering', label: 'התנדבות', icon: '🤝' },
      { id: 'culture', label: 'תרבות יהודית', icon: '🎭' },
      { id: 'outdoors', label: 'טיולים ופעילויות', icon: '🥾' },
    ]
  },
  {
    id: 7,
    title: 'מה הסטטוס המשפחתי שלך?',
    subtitle: 'המידע עוזר להתאים קהילות וקשרים רלוונטיים',
    icon: '🏠',
    type: 'single_choice',
    options: [
      { id: 'single', label: 'רווק/ה', icon: '🌱' },
      { id: 'married', label: 'נשוי/אה', icon: '💍' },
      { id: 'divorced', label: 'גרוש/ה', icon: '🌤️' },
      { id: 'widowed', label: 'אלמן/ה', icon: '🕯️' },
    ]
  },
  {
    id: 8,
    title: 'האם תרצה/י פעילויות שמתאימות לילדים?',
    subtitle: 'אפשר לבחור את מה שרלוונטי',
    icon: '👨‍👩‍👧',
    type: 'multiple_choice',
    options: [
      { id: 'no_children', label: 'לא רלוונטי כרגע', icon: '—' },
      { id: 'young_children', label: 'ילדים קטנים', icon: '🧸' },
      { id: 'teens', label: 'נוער', icon: '🎒' },
      { id: 'family_events', label: 'אירועים משפחתיים', icon: '🎈' },
    ]
  },
  {
    id: 9,
    title: 'איזו מסגרת קהילתית מתאימה לך?',
    subtitle: 'בחר/י את ההעדפה המרכזית',
    icon: '🕍',
    type: 'single_choice',
    options: [
      { id: 'synagogue', label: 'בית כנסת קבוע', icon: '🕍' },
      { id: 'beit_midrash', label: 'בית מדרש', icon: '📖' },
      { id: 'community_center', label: 'מרכז קהילתי', icon: '🏢' },
      { id: 'flexible', label: 'פתוח/ה להצעות', icon: '✨' },
    ]
  },
  {
    id: 10,
    title: 'איזו רמת כשרות מתאימה לך?',
    subtitle: 'כדי להציע אירוחים ואירועים מתאימים',
    icon: '🥗',
    type: 'single_choice',
    options: [
      { id: 'strict', label: 'כשרות מהודרת', icon: '✅' },
      { id: 'standard', label: 'כשרות רגילה', icon: '🍽️' },
      { id: 'home_only', label: 'בעיקר בבית', icon: '🏠' },
      { id: 'not_important', label: 'לא שיקול מרכזי', icon: '🌿' },
    ]
  },
  {
    id: 11,
    title: 'איך נראית השבת שלך?',
    subtitle: 'בחר/י את האפשרות הקרובה ביותר',
    icon: '🕯️',
    type: 'single_choice',
    options: [
      { id: 'fully_observant', label: 'שומר/ת שבת', icon: '🕯️' },
      { id: 'traditional_meals', label: 'קידוש וסעודות', icon: '🍷' },
      { id: 'community_only', label: 'בעיקר מפגשים קהילתיים', icon: '🤝' },
      { id: 'flexible', label: 'גמיש/ה', icon: '🌙' },
    ]
  },
  {
    id: 12,
    title: 'אילו חגים חשובים לך במיוחד?',
    subtitle: 'אפשר לבחור כמה',
    icon: '🕎',
    type: 'multiple_choice',
    options: [
      { id: 'high_holidays', label: 'ראש השנה ויום כיפור', icon: '🍯' },
      { id: 'sukkot', label: 'סוכות', icon: '🌿' },
      { id: 'chanukah', label: 'חנוכה', icon: '🕎' },
      { id: 'pesach', label: 'פסח', icon: '🍷' },
    ]
  },
  {
    id: 13,
    title: 'מה תרצה/י ללמוד?',
    subtitle: 'בחר/י תחומי לימוד שמעניינים אותך',
    icon: '📚',
    type: 'multiple_choice',
    options: [
      { id: 'talmud', label: 'תלמוד', icon: '📖' },
      { id: 'tanakh', label: 'תנ״ך', icon: '📜' },
      { id: 'philosophy', label: 'מחשבת ישראל', icon: '💭' },
      { id: 'halacha', label: 'הלכה מעשית', icon: '⚖️' },
    ]
  },
  {
    id: 14,
    title: 'איזה תפקיד קהילתי מתאים לך?',
    subtitle: 'אפשר לבחור יותר מאחד',
    icon: '🌟',
    type: 'multiple_choice',
    options: [
      { id: 'participant', label: 'להשתתף ולהכיר', icon: '🙂' },
      { id: 'volunteer', label: 'להתנדב', icon: '🤝' },
      { id: 'organizer', label: 'לארגן אירועים', icon: '📋' },
      { id: 'mentor', label: 'ללוות אחרים', icon: '🌱' },
    ]
  },
  {
    id: 15,
    title: 'איך תרצה/י להשלים את הפרופיל?',
    subtitle: 'אפשר לעדכן תמונה ופרטים גם אחר כך',
    icon: '📸',
    type: 'single_choice',
    options: [
      { id: 'upload_now', label: 'להעלות תמונה עכשיו', icon: '📷' },
      { id: 'later', label: 'להשלים מאוחר יותר', icon: '⏳' },
      { id: 'community_only', label: 'להציג רק לקהילה', icon: '🛡️' },
    ]
  },
];

export default function OnboardingStep() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const stepNumber = parseInt(id || '1');
  const currentStep = ONBOARDING_STEPS.find(step => step.id === stepNumber);
  const totalSteps = ONBOARDING_STEPS.length;
  const { answers, setAnswer } = useOnboardingAnswers();
  const selectedOptions = currentStep ? answers[currentStep.id] ?? [] : [];

  if (!currentStep) {
    router.replace('/onboarding/complete');
    return null;
  }

  const handleOptionSelect = (optionId: string) => {
    if (currentStep.type === 'single_choice') {
      setAnswer(currentStep.id, [optionId]);
    } else {
      setAnswer(
        currentStep.id,
        selectedOptions.includes(optionId)
          ? selectedOptions.filter(id => id !== optionId)
          : [...selectedOptions, optionId]
      );
    }
  };

  const handleNext = () => {
    if (stepNumber >= totalSteps) {
      router.replace('/onboarding/complete');
    } else {
      router.push({
        pathname: '/onboarding/step-[id]',
        params: { id: String(stepNumber + 1) },
      });
    }
  };

  const handleBack = () => {
    if (stepNumber <= 1) {
      router.replace('/');
    } else {
      router.push({
        pathname: '/onboarding/step-[id]',
        params: { id: String(stepNumber - 1) },
      });
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
            <Text className="text-gray-500 text-sm">{stepNumber}/{totalSteps}</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View className="mt-4 bg-gray-200 h-2 rounded-full">
          <View
            className="bg-purple-600 h-2 rounded-full"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
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
                  <Text className={`text-base font-medium flex-1 ${
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
            {stepNumber === totalSteps ? 'סיום' : 'המשך'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
