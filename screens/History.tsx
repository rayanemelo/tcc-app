import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/context/AuthContext';
import { API } from '@/service/api';
import { useEffect, useState } from 'react';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import CustomThemedView from '@/components/shared/CustomThemedView';
import { COLORS } from '@/styles/colors';
import { formatDate } from '@/utils/functions/format-date';
import Tag from '@/components/shared/Tag';

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

  const { signOut } = useAuth();

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
      <ThemedView
        key={item.id}
        style={[styles.history, { borderColor: borderColor }]}
      >
        <View style={styles.wrapper}>
          <ThemedText>{item.address}</ThemedText>
          <View>
            <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
              {formatDate(item.createdAt)}
            </ThemedText>
            <Tag type={mapStatusToTagType(item.status)} />
          </View>
        </View>
      </ThemedView>
    ));

  return (
    <>
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
      <TouchableOpacity
        onPress={() => signOut()}
        style={{ padding: 8, backgroundColor: 'red' }}
      >
        <ThemedText>sair</ThemedText>
      </TouchableOpacity>
    </>
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
    paddingHorizontal: 16,
    color: COLORS.blue,
    flex: 1,
  },

  history: {
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  createdAt: {
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: 16,
  },
});
