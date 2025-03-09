import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedView } from '@/components/ui/ThemedView';
import PageTitle from '@/components/PageTitle';
import { useFaqs } from '@/hooks/useFaq';
import { COLORS } from '@/styles/colors';
import Faqs from '@/components/Faq';
import CustomThemedView from '@/components/shared/CustomThemedView';

export default function FAQScreen() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;

  const { faqs } = useFaqs();

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
            <CustomThemedView
              colorTheme={colorTheme}
              text="Nenhuma pergunta foi encontrada"
            />
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
});
