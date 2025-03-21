import { StyleSheet, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { formatDate } from '@/utils/functions/format-date';
import { COLORS } from '@/styles/colors';
import { useNotifications } from '@/hooks/useNotifications';
import CustomThemedView from '@/components/shared/CustomThemedView';

export default function NotificationScreen() {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;
  const borderColor = theme === 'light' ? '#F2EEEE' : 'gray';

  const { notifications } = useNotifications();

  const Notifications = () =>
    notifications.map((item) => (
      <ThemedView
        key={item.id}
        style={[styles.notification, { borderColor: borderColor }]}
      >
        <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
          {formatDate(item.createdAt)}
        </ThemedText>
        <ThemedText style={styles.message}>{item.content}</ThemedText>
      </ThemedView>
    ));

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.container}>
        {notifications.length > 0 ? (
          <Notifications />
        ) : (
          <CustomThemedView
            colorTheme={colorTheme}
            text="Nenhuma notificação foi encontrada"
          />
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    paddingBottom: 100,
    paddingTop: 16,
  },
  notification: {
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  createdAt: {
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: 16,
  },
  message: {
    fontSize: 16,
    paddingHorizontal: 16,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
