import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from '@/styles/colors';
import { AuthProvider } from '@/context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="faq"
              options={{
                headerBackButtonDisplayMode: 'minimal',
                headerTitle: 'PERGUNTAS FREQUENTES',
                headerStyle: {
                  backgroundColor:
                    colorScheme === 'light'
                      ? COLORS.lightThemeBackground
                      : COLORS.blackDefault,
                },
                headerTitleStyle: {
                  fontSize: 16,
                  color: colorScheme === 'light' ? COLORS.black : COLORS.white,
                  fontWeight: 'bold',
                },
                headerTintColor: COLORS.grayDark,
              }}
            />
            <Stack.Screen
              name="history/[id]"
              options={{
                headerBackButtonDisplayMode: 'minimal',
                headerTintColor: COLORS.grayDark,
                headerTitle: 'DETALHES',
                headerStyle: {
                  backgroundColor:
                    colorScheme === 'light'
                      ? COLORS.lightThemeBackground
                      : COLORS.blackDefault,
                },
                headerTitleStyle: {
                  fontSize: 16,
                  color: colorScheme === 'light' ? COLORS.black : COLORS.white,
                  fontWeight: 'bold',
                },
              }}
            />
          </Stack>
          <StatusBar style="auto" />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
