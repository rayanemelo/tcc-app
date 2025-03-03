import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import PageTitle from '@/components/PageTitle';

export default function HistoryScreen() {
  return (
    <>
      <PageTitle text="Histórico" />
      <ParallaxScrollView>
        <ThemedView style={styles.container}>
          <ThemedText type="title">historico</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
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
});
