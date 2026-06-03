import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

interface UserMatch {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  observanceLevel: string;
  photo: string;
  matchPercentage: number;
}

const MOCK_MATCHES: UserMatch[] = [
  {
    id: '1',
    name: 'דוד לוי',
    age: 28,
    location: 'תל אביב',
    bio: 'אוהב ללמוד תורה ולהתנדב בקהילה. מחפש חברים לפעילויות יהדות וחברה.',
    interests: ['לימוד תורה', 'התנדבות', 'טיולים'],
    observanceLevel: 'מסורתי',
    photo: '👨',
    matchPercentage: 87
  },
  {
    id: '2',
    name: 'רחל כהן',
    age: 25,
    location: 'ירושלים',
    bio: 'חוקרת היסטוריה יהודית. מחפשת חברות לפעילויות תרבות ולימוד.',
    interests: ['היסטוריה', 'תרבות', 'ספרים'],
    observanceLevel: 'שומרת מסורת',
    photo: '👩',
    matchPercentage: 92
  }
];

export default function MatchesScreen() {
  const router = useRouter();
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const currentMatch = MOCK_MATCHES[currentMatchIndex];

  const handleNextMatch = () => {
    setCurrentMatchIndex((prev) => prev + 1);
  };

  if (!currentMatch) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-2xl font-bold text-gray-800 mb-4">
            אין עוד התאמות
          </Text>
          <Text className="text-gray-600 text-center">
            נחפש עוד אנשים מתאימים בשבילך!
          </Text>
          <Pressable
            onPress={() => setCurrentMatchIndex(0)}
            className="mt-6 bg-purple-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">
              הצג התאמות מחדש
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">
            ביחד
          </Text>
          <Pressable onPress={() => router.push('/(tabs)/profile')}>
            <Ionicons name="settings-outline" size={24} color="#6B7280" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 py-4">
        {/* Match Card */}
        <View className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Photo Section */}
          <View className="h-96 bg-purple-100 items-center justify-center relative">
            <Text className="text-8xl">{currentMatch.photo}</Text>

            {/* Match Percentage */}
            <View className="absolute top-4 right-4 bg-purple-600 px-3 py-1 rounded-full">
              <Text className="text-white font-semibold">
                {currentMatch.matchPercentage}% התאמה
              </Text>
            </View>
          </View>

          {/* Info Section */}
          <View className="p-6">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-2xl font-bold text-gray-800">
                {currentMatch.name}
              </Text>
              <Text className="text-lg text-gray-600">
                {currentMatch.age}
              </Text>
            </View>

            <Text className="text-gray-600 mb-3">
              📍 {currentMatch.location}
            </Text>

            <Text className="text-purple-600 font-medium mb-3">
              {currentMatch.observanceLevel}
            </Text>

            <Text className="text-gray-700 mb-4 leading-6">
              {currentMatch.bio}
            </Text>

            {/* Interests */}
            <Text className="text-gray-800 font-semibold mb-2">
              תחומי עניין:
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {currentMatch.interests.map((interest, index) => (
                <View key={index} className="bg-purple-100 px-3 py-1 rounded-full">
                  <Text className="text-purple-600 font-medium">
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View className="px-6 py-6 bg-white border-t border-gray-200">
        <View className="flex-row space-x-4 justify-center">
          <Pressable
            onPress={handleNextMatch}
            className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center"
          >
            <Ionicons name="close" size={24} color="#EF4444" />
          </Pressable>

          <Pressable
            onPress={handleNextMatch}
            className="w-16 h-16 bg-purple-600 rounded-full items-center justify-center"
          >
            <Ionicons name="heart" size={24} color="white" />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/messages')}
            className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center"
          >
            <Ionicons name="chatbubble" size={20} color="#3B82F6" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
