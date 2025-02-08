import { COLORS } from '@/styles/colors';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  type: 'outline' | 'filled';
  onPress: () => void;
  text: string;
};

const Button = ({ type, onPress, text }: Props) => {
  const buttonStyle = type === 'outline' ? styles.outline : styles.filled;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={text}
    >
      <Text style={type === 'outline' ? styles.outlineText : styles.filledText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 6,
    padding: 15,
  },
  outline: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D4DAE1',
  },
  filled: {
    backgroundColor: COLORS.blue,
  },
  outlineText: {
    color: COLORS.blue,
    textAlign: 'center',
  },
  filledText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Button;