import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { useAuth } from '@/context/AuthContext';

export default function History() {
  const { signOut } = useAuth();
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">historicooo</ThemedText>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{ padding: 8, backgroundColor: 'red' }}
      >
        <ThemedText>sair</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 8,
    paddingBottom: 100,
    paddingTop: 16,
  },
});
