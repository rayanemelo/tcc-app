import { COLORS } from '@/styles/colors';
import { FloodLevel } from '@/types/flood-level';
import { View, Text, StyleSheet, ViewProps } from 'react-native';

type TagType = FloodLevel | 4 | 5 | 6;

type Props = ViewProps & {
  type: TagType;
};

const Tag = ({ type, ...rest }: Props) => {
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
    4: {
      color: '#40AAD8',
      label: 'Em análise',
    },
    5: {
      color: COLORS.green,
      label: 'Concluído',
    },
    6: {
      color: COLORS.red,
      label: 'Rejeitado',
    },
  };

  return (
    <View
      style={[styles.container, { backgroundColor: types[type].color }]}
      {...rest}
    >
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
    textAlign: 'center',
  },
});

export default Tag;
