import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedView } from '@/components/ui/ThemedView';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import CustomThemedView from '@/components/shared/CustomThemedView';
import { COLORS } from '@/styles/colors';
import { useHistory } from '@/hooks/useHistory';
import ListHistory from '@/components/ListHistory';

export default function History() {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;

  const { history } = useHistory();
  console.log('history: ', history.length);

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
});
