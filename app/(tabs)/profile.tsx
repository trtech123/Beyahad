import { Alert, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">
            הפרופיל שלי
          </Text>
          <Pressable onPress={() => Alert.alert('הגדרות', 'מסך ההגדרות יתווסף בהמשך.')}>
            <Ionicons name="settings-outline" size={24} color="#6B7280" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View className="bg-white px-6 py-8 items-center border-b border-gray-100">
          <View className="w-24 h-24 bg-purple-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-1">
            משה כהן
          </Text>

          <Text className="text-gray-600 mb-2">
            28 • תל אביב
          </Text>

          <View className="bg-purple-100 px-3 py-1 rounded-full">
            <Text className="text-purple-600 font-medium">
              מסורתי
            </Text>
          </View>

          <Pressable
            onPress={() => Alert.alert('עריכת פרופיל', 'עריכת פרופיל מלאה תתווסף בהמשך.')}
            className="mt-4 bg-purple-600 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-semibold">
              ערוך פרופיל
            </Text>
          </Pressable>
        </View>

        {/* Stats */}
        <View className="bg-white mx-6 my-4 rounded-2xl p-4 shadow-sm">
          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-xl font-bold text-purple-600">12</Text>
              <Text className="text-sm text-gray-600">התאמות</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-purple-600">8</Text>
              <Text className="text-sm text-gray-600">חיבורים</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-purple-600">3</Text>
              <Text className="text-sm text-gray-600">אירועים</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="bg-white mx-6 rounded-2xl shadow-sm overflow-hidden">
          <Pressable
            onPress={() => router.push('/(tabs)/matches')}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="heart-outline" size={20} color="#6366f1" />
              <Text className="text-gray-800 font-medium ml-3">
                ההתאמות שלי
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/community')}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="people-outline" size={20} color="#6366f1" />
              <Text className="text-gray-800 font-medium ml-3">
                האירועים שלי
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/messages')}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={20} color="#6366f1" />
              <Text className="text-gray-800 font-medium ml-3">
                הודעות והתראות
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('פרטיות ובטיחות', 'העדפות פרטיות ובטיחות יתווספו בהמשך.')}
            className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <Ionicons name="shield-outline" size={20} color="#6366f1" />
              <Text className="text-gray-800 font-medium ml-3">
                פרטיות ובטיחות
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
          </Pressable>

          <Pressable
            onPress={() => Alert.alert('עזרה ותמיכה', 'אפשר לפנות לצוות הקהילה דרך ההודעות.')}
            className="flex-row items-center justify-between px-4 py-4"
          >
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={20} color="#6366f1" />
              <Text className="text-gray-800 font-medium ml-3">
                עזרה ותמיכה
              </Text>
            </View>
            <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
          </Pressable>
        </View>

        {/* About Section */}
        <View className="bg-white mx-6 mt-4 rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            עליי
          </Text>
          <Text className="text-gray-700 leading-6">
            אוהב ללמוד תורה ולהתנדב בקהילה. מחפש חברים טובים לפעילויות יהדות ולבילויים משפחתיים.
            עובד בהייטק ומאמין בחשיבות הקהילה וההדדיות.
          </Text>
        </View>

        {/* Interests */}
        <View className="bg-white mx-6 mt-4 mb-6 rounded-2xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">
            תחומי עניין
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {['לימוד תורה', 'התנדבות', 'טיולים', 'טכנולוגיה', 'משפחה', 'קהילה'].map((interest, index) => (
              <View key={index} className="bg-purple-100 px-3 py-1 rounded-full">
                <Text className="text-purple-600 font-medium">
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
