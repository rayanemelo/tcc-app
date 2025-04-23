import { COLORS } from '@/styles/colors';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';

type Props = TouchableOpacityProps & {
  type: 'outline' | 'filled';
  text: string;
  isLoading?: boolean;
};

const Button = ({ type, text, isLoading, disabled, ...rest }: Props) => {
  const buttonStyle = type === 'outline' ? styles.outline : styles.filled;

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, disabled && { opacity: 0.5 }]}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={text}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={type === 'outline' ? COLORS.blue : COLORS.white}
        />
      ) : (
        <Text
          style={type === 'outline' ? styles.outlineText : styles.filledText}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 6,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#D4DAE1',
  },
  filled: { backgroundColor: COLORS.blue },
  outlineText: { color: COLORS.blue, textAlign: 'center' },
  filledText: { color: COLORS.white, textAlign: 'center' },
});

export default Button;
