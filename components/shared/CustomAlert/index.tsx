import { View, StyleSheet, ViewProps } from 'react-native';

type Props = ViewProps & {
  children: React.ReactNode;
};

const CustomAlert = ({ children, ...rest }: Props) => {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 60,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Elevação para Android
  }, 
});

export default CustomAlert;