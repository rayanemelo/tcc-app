import { Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import ParallaxScrollView from '@/components/ui/ParallaxScrollView';

export default function HistoryDetail() {
  const { id } = useLocalSearchParams();

  return (
    <ParallaxScrollView>
      <Text>Detalhes do histórico com ID: {id}</Text>
    </ParallaxScrollView>
  );
}
