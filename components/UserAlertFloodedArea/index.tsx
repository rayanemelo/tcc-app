import { View, Text } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { styles } from './styles';
import CloseButton from '../shared/CloseButton';
import { COLORS } from '@/styles/colors';

type Props = {
  openModal: boolean;
  address: string;
  isLoading: {
    yes: boolean;
    no: boolean;
  };
  close: () => void;
  onPressNo: () => void;
  onPressYes: () => void;
};

const UserAlertFloodedArea = ({
  address,
  openModal,
  onPressNo,
  onPressYes,
  isLoading,
  close,
}: Props) => {
  return (
    <Modal isVisible={openModal}>
      <View style={styles.close}>
        <CloseButton onPress={close} color={COLORS.gray} />
      </View>
      <Text style={styles.title}>Esta área ainda está alagada?</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.buttonContainer}>
        <Button
          text="Não"
          onPress={onPressNo}
          type="outline"
          isLoading={isLoading.no}
        />
        <Button
          text="Sim"
          onPress={onPressYes}
          type="filled"
          isLoading={isLoading.yes}
        />
      </View>
    </Modal>
  );
};

export default UserAlertFloodedArea;
