import { StyleSheet, useColorScheme, View } from 'react-native';

import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import PageTitle from '@/components/PageTitle';
import { formatDate } from '@/utils/formatDate';
import { COLORS } from '@/styles/colors';

export default function NotificationScreen() {
  const dateNow = new Date();
  const theme = useColorScheme() ?? 'light';
  const colorTheme = theme === 'light' ? COLORS.grayDark : COLORS.gray;

  const notification = [
    {
      id: '1',
      message:
        'Previsão de chuvas intensas nas próximas horas. Prepare-se adequadamente.',
      createdAt: dateNow.toISOString(),
    },
    {
      id: '2',
      message: 'Nível de água do rio subindo. Fique atento.',
      createdAt: '2025-02-11T00:00:00Z',
    },
    {
      id: '3',
      message: 'Alerta de enchente na região. Evite sair de casa.',
      createdAt: '2025-01-21T00:00:00Z',
    },
    {
      id: '4',
      message:
        'Previsão de chuvas intensas nas próximas horas. Prepare-se adequadamente.',
      createdAt: '2025-01-20T00:00:00Z',
    },
    {
      id: '5',
      message:
        'Situação de alagamento melhorou em certas regiões. Consulte o mapa.',
      createdAt: '2025-01-16T00:00:00Z',
    },
    {
      id: '6',
      message:
        'Evite dirigir em ruas alagadas e mantenha-se informado através do nosso mapa.',
      createdAt: '2025-01-02T00:00:00Z',
    },
  ];

  return (
    <>
      <PageTitle text="Notificações" />
      <ParallaxScrollView>
        <ThemedView style={styles.container}>
          {notification.map((item) => (
            <View key={item.id} style={[styles.notification]}>
              <ThemedText style={[styles.createdAt, { color: colorTheme }]}>
                {formatDate(item.createdAt)}
              </ThemedText>

              <ThemedText style={styles.message}>{item.message}</ThemedText>
            </View>
          ))}
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
  notification: {
    borderBottomWidth: 1,
    borderBottomColor: '#F2EEEE',
    paddingBottom: 12,
  },
  createdAt: {
    fontSize: 14,
    textAlign: 'right',
    paddingHorizontal: 16,
  },
  message: {
    fontSize: 16,
    paddingHorizontal: 16,
    color: COLORS.black,
  },
});
