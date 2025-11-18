
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";

const TABS = {
  HOME: "HOME",
  REVIEW: "REVIEW",
  COMMUNITY: "COMMUNITY",
  INVITE: "INVITE",
  NOTICE: "NOTICE",
};

export default function App() {
  const [tab, setTab] = useState(TABS.HOME);
  const [onboardingDone, setOnboardingDone] = useState(false);

  if (!onboardingDone) {
    return <Onboarding onFinish={() => setOnboardingDone(true)} />;
  }

  let content = null;
  switch (tab) {
    case TABS.HOME:
      content = <HomeScreen />;
      break;
    case TABS.REVIEW:
      content = <ReviewListScreen />;
      break;
    case TABS.COMMUNITY:
      content = <CommunityScreen />;
      break;
    case TABS.INVITE:
      content = <InviteScreen />;
      break;
    case TABS.NOTICE:
      content = <NoticeScreen />;
      break;
    default:
      content = <HomeScreen />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {content}
        <View style={styles.tabBar}>
          <TabButton
            label="홈"
            active={tab === TABS.HOME}
            onPress={() => setTab(TABS.HOME)}
          />
          <TabButton
            label="후기"
            active={tab === TABS.REVIEW}
            onPress={() => setTab(TABS.REVIEW)}
          />
          <TabButton
            label="인증"
            active={tab === TABS.COMMUNITY}
            onPress={() => setTab(TABS.COMMUNITY)}
          />
          <TabButton
            label="추천하기"
            active={tab === TABS.INVITE}
            onPress={() => setTab(TABS.INVITE)}
          />
          <TabButton
            label="알림"
            active={tab === TABS.NOTICE}
            onPress={() => setTab(TABS.NOTICE)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabButton({ label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
        {label}
      </Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

// Onboarding (스플래시 + 동의 화면)

function Onboarding({ onFinish }) {
  const [step, setStep] = useState(0);

  if (step === 0) {
    return (
      <View style={styles.onboardContainer}>
        <Text style={styles.onboardLogo}>딱만원</Text>
        <Text style={styles.onboardTitle}>서로 도전하고, 함께 성장하는 세상</Text>
        <Text style={styles.onboardText}>
          1만원으로 시작하는 작은 챌린지들.{"\n"}
          도전하고, 응원하고, 리워드를 나누는{"\n"}
          딱만원 챌린지 앱입니다.
        </Text>
        <TouchableOpacity
          style={[styles.primaryButton, { marginTop: 40, width: "70%" }]}
          onPress={() => setStep(1)}
        >
          <Text style={styles.primaryButtonText}>시작하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.onboardContainer}>
      <Text style={styles.onboardLogo}>딱만원</Text>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { marginBottom: 12 }]}>개인정보 처리 안내</Text>
        <Text style={styles.cardDescription}>
          1. 이메일(ID) 정보만 수집하며, 챌린지 관리 목적에만 사용합니다.{"\n\n"}
          2. 이메일은 비공개 처리되며, 광고/마케팅 목적으로 사용하지 않습니다.{"\n\n"}
          3. 결제 및 포인트 관리는 네이버 서비스에서만 처리되며,{"\n"}
          딱만원 앱은 결제 정보를 직접 저장하지 않습니다.
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.primaryButton, { marginTop: 20, width: "70%" }]}
        onPress={onFinish}
      >
        <Text style={styles.primaryButtonText}>모두 동의하고 시작하기</Text>
      </TouchableOpacity>
    </View>
  );
}

// HOME

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Header title="딱만원 챌린지" />
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>받은 총 리워드</Text>
          <Text style={styles.cardBigText}>0 P</Text>
          <Text style={styles.cardDescription}>
            지금까지 챌린지에 참여해서 받은 리워드입니다.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>진행 중인 챌린지</Text>
          <Text style={styles.cardDescription}>
            아직 참여 중인 챌린지가 없어요.{"\n"}
            첫 1만원 챌린지를 만들어 보세요!
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>챌린지 만들기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

// HEADER

function Header({ title, right }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {right}
    </View>
  );
}

// REVIEW 리스트 & 상세

const DUMMY_REVIEWS = [
  {
    id: "1",
    nickname: "audv******",
    title: "첫 1만원 챌린지 성공 후기",
    preview:
      "정말 처음에는 반신반의했는데, 꾸준히 참여하니까 정말로 포인트가 쌓이더라고요! 이제 목표의 50%까지 왔어요.",
    date: "2025.10.03",
  },
  {
    id: "2",
    nickname: "audv******",
    title: "추천하기 꿀팁 공유",
    preview:
      "친구들에게 추천할 때 이렇게 말해보세요. '1만원으로 시작해서 습관을 만들 수 있다'고 하면 관심을 많이 가져요!",
    date: "2025.10.02",
  },
];

function ReviewListScreen() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const item = DUMMY_REVIEWS.find((r) => r.id === selected);
    return <ReviewDetail item={item} onBack={() => setSelected(null)} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="후기" />
      <FlatList
        data={DUMMY_REVIEWS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => setSelected(item.id)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.preview}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
              <Text style={styles.cardMeta}>{item.nickname}</Text>
              <Text style={styles.cardMeta}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function ReviewDetail({ item, onBack }) {
  return (
    <View style={styles.screen}>
      <View style={styles.headerWithBack}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backText}>〈</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>성공 후기</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.screenContent}>
        <View style={styles.card}>
          <Text style={styles.cardMeta}>{item.nickname}</Text>
          <Text style={[styles.cardTitle, { marginTop: 4 }]}>{item.title}</Text>
          <Text style={[styles.cardDescription, { marginTop: 12 }]}>{item.preview}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>당신도 할 수 있습니다!</Text>
          <Text style={[styles.cardDescription, { marginTop: 8 }]}>
            작은 1만원 도전이 모여 큰 목표를 이룹니다.{"\n"}
            지금 바로 나만의 챌린지를 만들어 보세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

// COMMUNITY (챌린지 인증)

const DUMMY_POSTS = [
  {
    id: "1",
    nickname: "audv******",
    title: "11월 독서 챌린지 2주차 인증",
    preview: "이번 주에는 책 한 권 완독했어요. 남은 2주도 파이팅!",
    date: "2025.10.03",
  },
  {
    id: "2",
    nickname: "audv******",
    title: "목표 달성까지 얼마나 걸릴까요?",
    preview: "제주도 여행이 목표인데, 지금 속도로는 언제쯤 갈 수 있는지 궁금해요.",
    date: "2025.10.02",
  },
];

function CommunityScreen() {
  return (
    <View style={styles.screen}>
      <Header title="챌린지 인증" right={<WriteButton />} />
      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              {item.preview}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 8, justifyContent: "space-between" }}>
              <Text style={styles.cardMeta}>{item.nickname}</Text>
              <Text style={styles.cardMeta}>{item.date}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

function WriteButton() {
  return (
    <TouchableOpacity style={styles.writeButton}>
      <Text style={styles.writeButtonText}>글쓰기</Text>
    </TouchableOpacity>
  );
}

// INVITE

function InviteScreen() {
  const channels = [
    { id: "sms", label: "SMS" },
    { id: "kakao", label: "카카오톡" },
    { id: "insta", label: "인스타그램" },
    { id: "tele", label: "텔레그램" },
    { id: "fb", label: "페이스북" },
    { id: "link", label: "주소복사" },
  ];

  return (
    <View style={styles.screen}>
      <Header title="추천하기" />
      <Text style={[styles.cardDescription, { marginHorizontal: 16, marginTop: 8 }]}>
        1만원 챌린지에 친구를 초대해서 같이 도전해 보세요.
      </Text>
      <View style={styles.inviteGrid}>
        {channels.map((c) => (
          <TouchableOpacity key={c.id} style={styles.inviteItem}>
            <Text style={styles.inviteLabel}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

// NOTICE & 알림

const DUMMY_NOTICE = [
  {
    id: "n1",
    title: "서비스 점검 안내",
    body: "10월 30일 새벽 2시~4시 동안 챌린지 서비스 점검이 진행됩니다.",
    date: "2025.10.20",
  },
];

const DUMMY_ALARM = [
  {
    id: "a1",
    title: "챌린지가 생성되었습니다",
    body: "새로운 1만원 챌린지를 시작해 보세요.",
    date: "2025.10.17 16:28",
  },
  {
    id: "a2",
    title: "리워드가 도착했습니다",
    body: "응원이 도착했습니다. 리워드를 확인해 보세요.",
    date: "2025.10.17 12:28",
  },
];

function NoticeScreen() {
  const [tab, setTab] = useState("NOTICE");

  const isNotice = tab === "NOTICE";
  const data = isNotice ? DUMMY_NOTICE : DUMMY_ALARM;

  return (
    <View style={styles.screen}>
      <Header title="알림 & 공지" />
      <View style={styles.noticeTabBar}>
        <TouchableOpacity
          style={[styles.noticeTab, isNotice && styles.noticeTabActive]}
          onPress={() => setTab("NOTICE")}
        >
          <Text
            style={[
              styles.noticeTabLabel,
              isNotice && styles.noticeTabLabelActive,
            ]}
          >
            공지사항
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.noticeTab, !isNotice && styles.noticeTabActive]}
          onPress={() => setTab("ALARM")}
        >
          <Text
            style={[
              styles.noticeTabLabel,
              !isNotice && styles.noticeTabLabelActive,
            ]}
          >
            알림
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.body}</Text>
            <Text style={styles.cardMeta}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

// styles

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFCA28",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFCA28",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FFCA28",
  },
  screenContent: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    height: 52,
    backgroundColor: "#FFC107",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#4E342E",
  },
  headerWithBack: {
    height: 52,
    backgroundColor: "#FFC107",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  backText: {
    fontSize: 20,
    color: "#4E342E",
  },
  card: {
    backgroundColor: "#FFF8E1",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5D4037",
    marginBottom: 4,
  },
  cardBigText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F57C00",
    marginVertical: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: "#6D4C41",
    lineHeight: 18,
  },
  cardMeta: {
    marginTop: 4,
    fontSize: 11,
    color: "#8D6E63",
  },
  primaryButton: {
    marginTop: 12,
    backgroundColor: "#F57C00",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
  secondaryButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F57C00",
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#F57C00",
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFE082",
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 11,
    color: "#8D6E63",
  },
  tabLabelActive: {
    fontWeight: "700",
    color: "#5D4037",
  },
  tabIndicator: {
    marginTop: 2,
    width: 22,
    height: 3,
    borderRadius: 999,
    backgroundColor: "#F57C00",
  },
  inviteGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  inviteItem: {
    width: "48%",
    backgroundColor: "#FFF8E1",
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 10,
    marginRight: "4%",
    alignItems: "center",
    justifyContent: "center",
  },
  inviteLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#5D4037",
  },
  noticeTabBar: {
    flexDirection: "row",
    marginTop: 8,
    marginHorizontal: 16,
    backgroundColor: "#FFE082",
    borderRadius: 24,
    padding: 3,
  },
  noticeTab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
  },
  noticeTabActive: {
    backgroundColor: "#FFF8E1",
  },
  noticeTabLabel: {
    fontSize: 13,
    color: "#8D6E63",
  },
  noticeTabLabelActive: {
    fontWeight: "700",
    color: "#5D4037",
  },
  writeButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#F57C00",
  },
  writeButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  onboardContainer: {
    flex: 1,
    backgroundColor: "#FFCA28",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  onboardLogo: {
    fontSize: 32,
    fontWeight: "900",
    color: "#F57C00",
    marginBottom: 16,
  },
  onboardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4E342E",
    textAlign: "center",
    marginBottom: 12,
  },
  onboardText: {
    fontSize: 14,
    color: "#5D4037",
    textAlign: "center",
    lineHeight: 20,
  },
});

