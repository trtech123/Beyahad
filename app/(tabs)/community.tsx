import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  attendeeCount: number;
  type: 'shabbat_dinner' | 'torah_study' | 'volunteer' | 'social' | 'holiday';
  icon: string;
}

const MOCK_EVENTS: CommunityEvent[] = [
  {
    id: '1',
    title: 'סעודה שלישית בקהילה',
    description: 'סעודה שלישית חמה ומשפחתית עם זמירות ושיחה טובה',
    date: 'שבת הקרובה',
    time: '17:00',
    location: 'בית הכנסת רמבם, תל אביב',
    organizer: 'יוסי לוי',
    attendeeCount: 12,
    type: 'shabbat_dinner',
    icon: '🕯️'
  },
  {
    id: '2',
    title: 'שיעור תלמוד לחברה',
    description: 'שיעור שבועי בתלמוד בבלי, מסכת ברכות',
    date: 'ימי שני',
    time: '20:00',
    location: 'בית מדרש הקהילה',
    organizer: 'רב דוד כהן',
    attendeeCount: 8,
    type: 'torah_study',
    icon: '📚'
  },
  {
    id: '3',
    title: 'התנדבות בחלוקת מזון',
    description: 'עזרה לנזקקים בחלוקת חבילות מזון לקראת שבת',
    date: 'חמישי',
    time: '16:00',
    location: 'מרכז הקהילה',
    organizer: 'עמותת לתת',
    attendeeCount: 15,
    type: 'volunteer',
    icon: '🤝'
  },
  {
    id: '4',
    title: 'מסיבת חנוכה צעירים',
    description: 'חגיגת חנוכה עם משחקים, מוזיקה וסופגניות',
    date: '15 לדצמבר',
    time: '19:30',
    location: 'אולם הקהילה',
    organizer: 'ועד הצעירים',
    attendeeCount: 25,
    type: 'holiday',
    icon: '🕎'
  }
];

const getEventTypeColor = (type: CommunityEvent['type']) => {
  switch (type) {
    case 'shabbat_dinner': return 'bg-purple-100 text-purple-600';
    case 'torah_study': return 'bg-blue-100 text-blue-600';
    case 'volunteer': return 'bg-green-100 text-green-600';
    case 'social': return 'bg-orange-100 text-orange-600';
    case 'holiday': return 'bg-yellow-100 text-yellow-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const getEventTypeName = (type: CommunityEvent['type']) => {
  switch (type) {
    case 'shabbat_dinner': return 'שבת';
    case 'torah_study': return 'לימוד';
    case 'volunteer': return 'התנדבות';
    case 'social': return 'חברה';
    case 'holiday': return 'חג';
    default: return 'אירוע';
  }
};

export default function CommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-800">
            קהילה
          </Text>
          <Pressable>
            <Ionicons name="add" size={24} color="#6366f1" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View className="px-6 py-4">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">12</Text>
                <Text className="text-sm text-gray-600">אירועים השבוע</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">150</Text>
                <Text className="text-sm text-gray-600">חברי קהילה</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold text-purple-600">8</Text>
                <Text className="text-sm text-gray-600">משתתפים חדשים</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Events List */}
        <View className="px-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            אירועים קרובים
          </Text>

          {MOCK_EVENTS.map((event) => (
            <Pressable
              key={event.id}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
            >
              <View className="flex-row items-start">
                <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center ml-3">
                  <Text className="text-xl">{event.icon}</Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-lg font-semibold text-gray-800 flex-1">
                      {event.title}
                    </Text>
                    <View className={`px-2 py-1 rounded-full ${getEventTypeColor(event.type)}`}>
                      <Text className="text-xs font-medium">
                        {getEventTypeName(event.type)}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-600 mb-3 leading-5">
                    {event.description}
                  </Text>

                  <View className="space-y-1">
                    <View className="flex-row items-center">
                      <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-2">
                        {event.date} בשעה {event.time}
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={16} color="#6B7280" />
                      <Text className="text-sm text-gray-600 ml-2">
                        {event.location}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between mt-3">
                      <View className="flex-row items-center">
                        <Ionicons name="person-outline" size={16} color="#6B7280" />
                        <Text className="text-sm text-gray-600 ml-2">
                          {event.attendeeCount} משתתפים • {event.organizer}
                        </Text>
                      </View>

                      <Pressable className="bg-purple-600 px-4 py-2 rounded-full">
                        <Text className="text-white font-medium text-sm">
                          הרשמה
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}