import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import CustomThemedView from '@/components/shared/CustomThemedView';
import { useHistory } from '@/hooks/useHistory';
import ListHistory from '@/components/ListHistory';

export default function History() {
  const { history } = useHistory();

  return (
    <ThemedView style={styles.container}>
      {history.length > 0 ? (
        <ListHistory />
      ) : (
        <CustomThemedView text="Nenhum histórico foi encontrado" />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 80,
  },
});
