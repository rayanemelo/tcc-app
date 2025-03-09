import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';

type Props = {
  colorTheme: string;
  text: string;
};

export default function ViewFaq({ colorTheme, text }: Props) {
  return (
    <>
      <ThemedView style={styles.flex}>
        <ThemedText style={{ color: colorTheme }}>{text}</ThemedText>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
