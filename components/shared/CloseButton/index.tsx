import { StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface Props {
  onClick: () => void;
}

const CloseButton = ({ onClick }: Props) => (
  <TouchableOpacity onPress={onClick} style={styles.container}>
    <AntDesign name="closecircle" size={28} color="white" />
  </TouchableOpacity>
);


const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 65,
    // left: 20,
  },
})

export default CloseButton;