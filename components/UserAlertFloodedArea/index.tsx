import { View, Text } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { styles } from './styles';
import { useUserAlertFloodedArea } from '@/hooks/useUserAlertFloddedArea';

type Props = {
  address: string;
  isVisible: boolean;
  handlePressYes: () => void;
  handlePressNo: () => void;
};

const UserAlertFloodedArea = ({
  address,
  isVisible,
  handlePressNo,
  handlePressYes,
}: Props) => {
  const { isLoading } = useUserAlertFloodedArea();
  return (
    <Modal isVisible={isVisible}>
      <Text style={styles.title}>Esta área ainda está alagada?</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.buttonContainer}>
        <Button
          text="Não"
          onPress={handlePressNo}
          type="outline"
          isLoading={isLoading.yes}
        />
        <Button
          text="Sim"
          onPress={handlePressYes}
          type="filled"
          isLoading={isLoading.no}
        />
      </View>
    </Modal>
  );
};

export default UserAlertFloodedArea;
