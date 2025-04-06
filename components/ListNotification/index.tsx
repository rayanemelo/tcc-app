import { ListRenderItem, StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { formatDate } from '@/utils/functions/format-date';
import { INotification, useNotifications } from '@/hooks/useNotifications';
import { COLORS } from '@/styles/colors';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';

export function ListNotification() {
  const theme = useColorScheme() ?? 'light';

  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;
  const borderColor = theme === 'light' ? '#F2EEEE' : 'gray';
  const { notifications, isFetching, refetch } = useNotifications();

  const renderItem: ListRenderItem<INotification> = ({ item }) => (
    <ThemedView style={[styles.notification, { borderColor: borderColor }]}>
      <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
        {formatDate(item.createdAt)}
      </ThemedText>
      <ThemedText style={styles.message}>{item.content}</ThemedText>
    </ThemedView>
  );

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
      }
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 80 /* , paddingTop: 10 */ }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notification: {
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
  },
  createdAt: {
    fontSize: 14,
    textAlign: 'right',
    // marginBottom: 2,
  },
  message: {
    fontSize: 16,
  },
});
