import { View, Text, StyleSheet } from 'react-native';
import Modal from '../shared/Modal';
import { COLORS } from '@/styles/colors';
import Button from '../shared/Button';

type Props = {
  // address: string;
  isVisible: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
};

const ConfirmFloodLocation = ({
  isVisible,
  handleCancel,
  handleConfirm,
}: Props) => {
  return (
    <Modal isVisible={isVisible}>
      <Text style={styles.title}>
        Deseja marcar este local como ponto de alagamento?
      </Text>
      {/* <Text style={styles.address}>{address}</Text> */}
      <View style={styles.buttonContainer}>
        <Button type="outline" onPress={handleCancel} text="Não" />
        <Button type="filled" onPress={handleConfirm} text="Sim" />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: COLORS.black,
  },
  address: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default ConfirmFloodLocation;
