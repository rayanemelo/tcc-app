import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText';
import { useRouter } from 'expo-router';
import { useHistory } from '@/hooks/useHistory';
import { COLORS } from '@/styles/colors';
import { formatDate } from '@/utils/functions/format-date';
import Tag from '../shared/Tag';
import { mapStatusToTagType } from '@/utils/functions/map-status-to-tag-type';

const ListHistory = () => {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;
  const borderColor = theme === 'light' ? '#F2EEEE' : 'gray';

  const router = useRouter();

  const { history } = useHistory();

  return history.map((item) => (
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
          <View style={{ alignItems: 'flex-end' }}>
            <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
              {formatDate(item.createdAt)}
            </ThemedText>
            <ThemedText>
              <Tag type={mapStatusToTagType(item.status)} />
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </TouchableOpacity>
  ));
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  address: {
    fontSize: 16,
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

export default ListHistory;
