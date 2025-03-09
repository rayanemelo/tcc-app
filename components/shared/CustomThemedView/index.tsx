import { StyleSheet, ViewProps } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';

type Props = ViewProps & {
  colorTheme: string;
  text: string;
};

export default function CustomThemedView({ colorTheme, text, ...rest }: Props) {
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
