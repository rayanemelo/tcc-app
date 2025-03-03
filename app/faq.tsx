import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import PageTitle from '@/components/PageTitle';
import { useFaqs } from '@/hooks/useFaq';
import { COLORS } from '@/styles/colors';
import Faqs from '@/components/Faq';

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;

  const { faqs, error } = useFaqs();

  if (error) {
    return (
      <ThemedView style={styles.flex}>
        <ThemedText style={{ color: colorTheme }}>
          Erro ao carregar notificações
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <PageTitle text="Perguntas Frequentes" backButton helpButton={false} />
      <ParallaxScrollView>
        <ThemedView style={styles.container}>
          {faqs.length > 0 ? (
            <Faqs
              faqs={faqs}
              theme={theme}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ) : (
            <ThemedView style={styles.flex}>
              <ThemedText style={{ color: colorTheme, marginTop: 46 }}>
                Nenhuma pergunta foi encontrada
              </ThemedText>
            </ThemedView>
          )}
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
    paddingHorizontal: 16,
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
