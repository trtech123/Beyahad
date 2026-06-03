# Beyahad - Jewish Community Connection App Design Specification

**Date:** 2026-06-03  
**Status:** Approved for Implementation

## Overview

Beyahad (Hebrew: "Together") is a Jewish community connection app designed to help Jewish individuals find meaningful connections based on shared religious practices, age compatibility, location proximity, and common interests. The app bridges the gap between traditional Jewish community building and modern social technology.

## Core Purpose

Enable authentic Jewish community connections through:
- Religious observance compatibility matching
- Age-appropriate community building  
- Location-based community discovery
- Shared interest and service opportunities
- Safe, moderated Jewish social environment

## Target Audience

**Primary:** Jewish adults (18-80) seeking community connections
**Secondary:** Jewish families looking for community involvement
**Geographic:** Initially Hebrew-speaking communities, expandable globally

## Technical Architecture

### Frontend Stack
- **Framework:** Expo React Native 54+ with TypeScript
- **Routing:** Expo Router 6+ (file-based routing)
- **Styling:** NativeWind 4+ (TailwindCSS for React Native)
- **State:** React Context + Supabase real-time
- **Fonts:** @expo-google-fonts/heebo for Hebrew support
- **Localization:** expo-localization with Hebrew RTL

### Backend Stack  
- **Database:** Supabase PostgreSQL with RLS
- **Authentication:** Supabase Auth with Google Sign-in
- **Real-time:** Supabase Realtime for chat/notifications
- **Storage:** Supabase Storage for profile photos
- **Push Notifications:** Expo Notifications + Supabase Edge Functions

### Core Dependencies
```json
{
  "expo": "~54.0.33",
  "react-native": "0.81.5", 
  "@supabase/supabase-js": "^2.105.4",
  "expo-router": "~6.0.24",
  "nativewind": "^4.2.3",
  "@expo-google-fonts/heebo": "^0.4.2",
  "@react-native-google-signin/google-signin": "^16.1.2"
}
```

## Feature Specifications

### 1. Onboarding Flow (15 Steps)

**Purpose:** Comprehensive preference collection for accurate matching

**Steps:**
1. **Welcome** - App introduction, community values
2. **Religious Observance** - Orthodox/Conservative/Reform/Traditional
3. **Age Preferences** - Circular selector (18-80, age groups)
4. **Location** - Current city, willing travel distance  
5. **Community Services** - Gabai, Torah reading, leading prayers
6. **Interests** - Torah study, volunteering, social events
7. **Family Status** - Single/married/divorced/widowed
8. **Children** - Ages, involvement preferences
9. **Synagogue Affiliation** - Current synagogue, preferences
10. **Kosher Observance** - Level of kashrut observance
11. **Shabbat Practices** - Friday night, Saturday practices
12. **Holiday Observance** - Major and minor holidays
13. **Study Interests** - Talmud, Tanakh, philosophy, mysticism
14. **Community Roles** - Leadership, volunteer preferences  
15. **Profile Photo** - Upload and verification

**Technical Implementation:**
- Multi-step form with progress indicator
- Data validation at each step
- Local storage backup for incomplete sessions
- Skip/return later functionality
- Accessibility compliance for Hebrew RTL

### 2. Matching Algorithm

**Core Factors:**
- **Religious Compatibility:** 40% weight
- **Age Appropriateness:** 25% weight  
- **Geographic Proximity:** 20% weight
- **Shared Interests:** 15% weight

**Algorithm Logic:**
```typescript
interface MatchScore {
  religiousCompatibility: number; // 0-100
  ageCompatibility: number;      // 0-100  
  locationProximity: number;     // 0-100
  sharedInterests: number;       // 0-100
  overallScore: number;          // Weighted average
}
```

**Match Types:**
- **Study Partners** - Learning preferences, knowledge level
- **Community Friends** - Social events, family activities
- **Service Partners** - Volunteer opportunities, synagogue roles
- **Mentorship** - Experience sharing, guidance relationships

### 3. Profile System

**Profile Data:**
- Basic info (name, age, location, photo)
- Religious observance summary  
- Current synagogue/community
- Interests and hobbies
- Availability for activities
- Contact preferences
- Privacy settings

**Privacy Levels:**
- **Public:** Visible to all users
- **Community:** Visible to matched users  
- **Private:** Visible only after connection approval

### 4. Messaging System

**Features:**
- Real-time chat with matched users
- Message encryption for privacy
- Photo/document sharing
- Voice message support (Hebrew/English)
- Group chat for community events
- Message moderation/reporting

**Safety Features:**
- Automatic content filtering
- Report/block functionality  
- Admin moderation tools
- Community guidelines enforcement

### 5. Community Events

**Event Types:**
- Shabbat dinners and gatherings
- Torah study sessions  
- Volunteer opportunities
- Holiday celebrations
- Educational lectures
- Social mixers

**Event Management:**
- Create/manage events
- RSVP system
- Location sharing
- Participant messaging
- Photo/memory sharing post-event

## User Experience Design

### Visual Design System

**Color Palette:**
- **Primary:** #6366f1 (Purple) - spiritual, community
- **Secondary:** #8b5cf6 (Light purple) - warmth, connection  
- **Accent:** #f59e0b (Gold) - tradition, celebration
- **Neutral:** #6b7280 (Gray) - text, backgrounds
- **Success:** #10b981 (Green) - matches, confirmations
- **Warning:** #f59e0b (Amber) - notifications, alerts

**Typography:**
- **Hebrew:** Heebo font family (Regular, Medium, Bold)
- **English:** System fonts (San Francisco iOS, Roboto Android)
- **Size Scale:** 12px, 14px, 16px, 18px, 24px, 32px, 48px

**Components:**
- Rounded corners (8px, 12px, 16px)
- Soft shadows for depth
- Purple gradient buttons
- Card-based layouts
- Circular profile images
- Progress indicators

### Navigation Structure

**File-based Routing (Expo Router):**
```
app/
├── index.tsx                    # Landing/splash
├── login.tsx                   # Authentication  
├── onboarding/
│   ├── _layout.tsx            # Onboarding wrapper
│   ├── step-[id].tsx          # Dynamic step routing
│   └── complete.tsx           # Onboarding completion
├── (auth)/
│   ├── _layout.tsx            # Authenticated layout
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Tab navigation
│   │   ├── matches.tsx        # Match browsing
│   │   ├── messages.tsx       # Chat list  
│   │   ├── community.tsx      # Events & community
│   │   ├── profile.tsx        # User profile
│   │   └── settings.tsx       # App settings
│   ├── chat/[id].tsx          # Individual chat
│   ├── event/[id].tsx         # Event details
│   └── user/[id].tsx          # User profile view
└── +not-found.tsx             # 404 page
```

**Bottom Tab Navigation:**
1. **Matches** (🤝) - Browse potential connections
2. **Messages** (💬) - Chat conversations  
3. **Community** (🏘️) - Events and activities
4. **Profile** (👤) - Personal profile management

### Accessibility & Localization

**Hebrew RTL Support:**
- Text direction automatic detection
- Mirrored navigation elements
- Right-aligned text inputs
- RTL-aware animations
- Proper date/number formatting

**Accessibility:**
- Screen reader compatibility
- High contrast mode support  
- Scalable font sizes
- Voice-over navigation
- Haptic feedback for interactions

## Database Schema

### Core Tables

**users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  profile_photo_url TEXT,
  location_city TEXT,
  synagogue_affiliation TEXT,
  religious_observance religious_level NOT NULL,
  is_onboarding_complete BOOLEAN DEFAULT FALSE,
  privacy_level privacy_type DEFAULT 'community',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**onboarding_responses**
```sql  
CREATE TABLE onboarding_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  question_key TEXT NOT NULL, 
  response_data JSONB NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

**user_matches**
```sql
CREATE TABLE user_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE, 
  compatibility_score INTEGER NOT NULL, -- 0-100
  match_type match_type_enum NOT NULL,
  status match_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**messages**
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id UUID REFERENCES user_matches(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type message_type DEFAULT 'text',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**community_events**
```sql
CREATE TABLE community_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organizer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_type event_type_enum NOT NULL,
  location_address TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  max_participants INTEGER,
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Enums and Types

```sql
CREATE TYPE religious_level AS ENUM ('orthodox', 'conservative', 'reform', 'traditional', 'secular');
CREATE TYPE privacy_type AS ENUM ('public', 'community', 'private');
CREATE TYPE match_type_enum AS ENUM ('study_partner', 'community_friend', 'service_partner', 'mentorship');
CREATE TYPE match_status AS ENUM ('pending', 'connected', 'declined', 'blocked');
CREATE TYPE message_type AS ENUM ('text', 'image', 'voice', 'document');
CREATE TYPE event_type_enum AS ENUM ('shabbat_dinner', 'torah_study', 'volunteer', 'holiday', 'social', 'educational');
```

## Implementation Phases

### Phase 1: Core MVP (4-6 weeks)
- [x] Project setup and authentication
- [x] Basic onboarding flow (5 key steps)
- [x] Simple matching algorithm  
- [x] Basic messaging
- [x] Profile management

### Phase 2: Enhanced Features (4-6 weeks)  
- [x] Complete 15-step onboarding
- [x] Advanced matching algorithm
- [x] Community events system
- [x] Enhanced messaging (photos, voice)
- [x] Admin moderation tools

### Phase 3: Community & Growth (4-6 weeks)
- [x] Event management system
- [x] Community guidelines & moderation
- [x] Push notifications
- [x] Analytics and insights
- [x] Performance optimization

## Security & Privacy

**Data Protection:**
- End-to-end encryption for messages
- Secure photo storage with signed URLs
- Row-level security (RLS) for all tables
- Regular security audits
- GDPR compliance for international users

**Community Safety:**
- Profile verification system
- Content moderation (automated + human)
- Report/block functionality
- Community guidelines enforcement
- Background check integration (optional)

**Privacy Controls:**
- Granular profile visibility settings
- Location sharing preferences  
- Match notification controls
- Data deletion/account termination
- Activity status management

## Success Metrics

**User Engagement:**
- Onboarding completion rate >80%
- Daily active users growth
- Messages sent per user per week
- Event attendance rates

**Community Health:**
- Successful match connections >60%
- User retention at 30/90 days
- Event creation and participation
- Community feedback scores

**Technical Performance:**
- App load time <2 seconds
- Message delivery time <1 second  
- Uptime >99.9%
- Error rate <1%

## Conclusion

Beyahad represents a thoughtful approach to Jewish community building through technology. By respecting traditional values while embracing modern connectivity, the app creates meaningful opportunities for Jewish individuals to find their community, build relationships, and strengthen their spiritual journey together.

The technical foundation leverages proven technologies (Expo, Supabase) with careful attention to Hebrew localization, privacy, and community safety. The phased implementation approach ensures sustainable development while gathering user feedback for continuous improvement.