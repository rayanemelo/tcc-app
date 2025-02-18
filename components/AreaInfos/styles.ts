import { COLORS } from '@/styles/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    maxWidth: '90%',
  },
  createdAt: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.grayDark,
  },
  imagesButton: {
    borderRadius: 6,
    padding: 15,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D4DAE1',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
