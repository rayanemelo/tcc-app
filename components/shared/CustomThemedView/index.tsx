import { StyleSheet, useColorScheme, ViewProps } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { COLORS } from '@/styles/colors';

type Props = ViewProps & {
  text: string;
};

export default function CustomThemedView({ text, ...rest }: Props) {
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;

  return (
    <ThemedView style={styles.flex} {...rest}>
      <ThemedText style={{ color: colorTheme }}>{text}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
