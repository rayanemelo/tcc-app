import { COLORS } from '@/styles/colors';
import { FloodLevel } from '@/types/flood-level';
import { View, Text, StyleSheet } from 'react-native';

type TagType = FloodLevel | 'analise' | 'concluido' | 'rejeitado';

interface Props {
  type: TagType;
}

const Tag = ({ type }: Props) => {
  const types: Record<TagType, { color: string; label: string }> = {
    1: {
      color: COLORS.yellow,
      label: 'Leve',
    },
    2: {
      color: COLORS.orange,
      label: 'Moderado',
    },
    3: {
      color: COLORS.red,
      label: 'Interditado',
    },
    analise: {
      color: '#40AAD8',
      label: 'Em análise',
    },
    concluido: {
      color: COLORS.green,
      label: 'Concluído',
    },
    rejeitado: {
      color: COLORS.red,
      label: 'Rejeitado',
    },
  };

  return (
    <View style={[styles.container, { backgroundColor: types[type].color }]}>
      <Text style={styles.label}>{types[type].label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Tag;
