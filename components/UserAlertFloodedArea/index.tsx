import { View, Text } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { styles } from './styles';

type Props = { address: string };

const UserAlertFloodedArea = ({ address }: Props) => {
  return (
    <Modal isVisible>
      <Text style={styles.title}>Esta área ainda está alagada?</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.buttonContainer}>
        <Button text="Não" onPress={() => {}} type="outline" />
        <Button text="Sim" onPress={() => {}} type="filled" />
      </View>
    </Modal>
  );
};

export default UserAlertFloodedArea;
