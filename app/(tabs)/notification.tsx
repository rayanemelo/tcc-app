import { StyleSheet, View } from 'react-native';

import { useNotifications } from '@/hooks/useNotifications';
import CustomThemedView from '@/components/shared/CustomThemedView';
import { ListNotification } from '@/components/ListNotification';

export default function NotificationScreen() {
  const { notifications } = useNotifications();

  return (
    <View style={styles.container}>
      {notifications.length > 0 ? (
        <ListNotification />
      ) : (
        <CustomThemedView text="Nenhuma notificação foi encontrada" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
