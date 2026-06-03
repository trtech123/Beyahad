import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface ChatPreview {
  id: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  userPhoto: string;
  isOnline: boolean;
}

const MOCK_CHATS: ChatPreview[] = [
  {
    id: '1',
    userName: 'רחל כהן',
    lastMessage: 'היי! איך אתה? נשמח להכיר',
    timestamp: '5 דק\'',
    unreadCount: 2,
    userPhoto: '👩',
    isOnline: true
  },
  {
    id: '2',
    userName: 'דוד לוי',
    lastMessage: 'תודה על ההתאמה! מתי נפגשים?',
    timestamp: '1 שעה',
    unreadCount: 0,
    userPhoto: '👨',
    isOnline: false
  },
  {
    id: '3',
    userName: 'מירי אברהם',
    lastMessage: 'שבת שלום! איך היה השבת?',
    timestamp: '3 שעות',
    unreadCount: 1,
    userPhoto: '👩‍🦱',
    isOnline: true
  }
];

export default function MessagesScreen() {
  const renderChatItem = ({ item }: { item: ChatPreview }) => (
    <Pressable className="flex-row items-center px-6 py-4 bg-white border-b border-gray-100">
      {/* Profile Photo */}
      <View className="relative">
        <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
          <Text className="text-2xl">{item.userPhoto}</Text>
        </View>
        {item.isOnline && (
          <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
        )}
      </View>

      {/* Message Info */}
      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-lg font-semibold text-gray-800">
            {item.userName}
          </Text>
          <Text className="text-sm text-gray-500">
            {item.timestamp}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text
            className={`text-sm flex-1 ml-2 ${
              item.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-600'
            }`}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>

          {item.unreadCount > 0 && (
            <View className="bg-purple-600 rounded-full min-w-[20px] h-5 items-center justify-center px-1">
              <Text className="text-white text-xs font-semibold">
                {item.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">
            הודעות
          </Text>
          <Pressable>
            <Ionicons name="create-outline" size={24} color="#6366f1" />
          </Pressable>
        </View>
      </View>

      {MOCK_CHATS.length === 0 ? (
        /* Empty State */
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="chatbubbles-outline" size={64} color="#9CA3AF" />
          <Text className="text-xl font-semibold text-gray-800 mt-4 mb-2">
            אין הודעות עדיין
          </Text>
          <Text className="text-gray-600 text-center">
            כשתתחיל לדבר עם אנשים מהקהילה,{'\n'}
            השיחות יופיעו כאן
          </Text>
        </View>
      ) : (
        /* Chat List */
        <FlatList
          data={MOCK_CHATS}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}