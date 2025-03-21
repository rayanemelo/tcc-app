import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { API } from '@/service/api';
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import CustomThemedView from '@/components/shared/CustomThemedView';
import { COLORS } from '@/styles/colors';
import { formatDate } from '@/utils/functions/format-date';
import Tag from '@/components/shared/Tag';
import { useRouter } from 'expo-router';

interface IHistory {
  id: 37;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  floodLevelId: number;
  createdAt: string;
}

export default function History() {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;
  const borderColor = theme === 'light' ? '#F2EEEE' : 'gray';

  const router = useRouter();

  const [history, setHistory] = useState<IHistory[] | []>([]);

  async function getHistory() {
    try {
      const response = await API.get('/user-history');
      setHistory(response.data);
    } catch {
      setHistory([]);
    }
  }

  const mapStatusToTagType = (status: string) => {
    switch (status) {
      case 'pending':
        return 4;
      case 'completed':
        return 5;
      case 'rejected':
        return 6;
      default:
        return 4;
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const ListHistory = () =>
    history.map((item) => (
      <TouchableOpacity
        key={item.id}
        onPress={() => router.push(`/history/${item.id}`)}
      >
        <ThemedView style={[styles.history, { borderColor: borderColor }]}>
          <View style={styles.wrapper}>
            <ThemedText
              ellipsizeMode="tail"
              numberOfLines={2}
              style={styles.address}
            >
              {item.address}
            </ThemedText>
            <View>
              <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
                {formatDate(item.createdAt)}
              </ThemedText>
              <Tag type={mapStatusToTagType(item.status)} />
            </View>
          </View>
        </ThemedView>
      </TouchableOpacity>
    ));

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        {history.length > 0 ? (
          <ListHistory />
        ) : (
          <CustomThemedView
            colorTheme={colorTheme}
            text="Nenhum histórico foi encontrado"
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 100,
    paddingTop: 16,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  address: {
    fontSize: 16,
    color: COLORS.blue,
    flex: 1,
    marginRight: 16,
  },

  history: {
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  createdAt: {
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 3,
  },
});
