import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from '../shared/Modal';
import { COLORS } from '@/styles/colors';
import { FloodArea } from '@/types/flood-area';
import Tag from '../shared/Tag';
import CloseButton from '../shared/CloseButton';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import Feather from '@expo/vector-icons/Feather';

type Props = {
  isVisible: boolean;
  area: FloodArea;
  onClose: () => void;
};

const AreaInfos = ({ isVisible, onClose, area }: Props) => {
  const { address, createdAt } = area;

  const publishedDateRelativeToNow = formatDistanceToNow(
    createdAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.address}>{address}</Text>
          <CloseButton onPress={onClose} color={COLORS.gray} />
        </View>
        <View style={styles.content}>
          <Text style={styles.createdAt}>
            Criado {publishedDateRelativeToNow}
          </Text>
          <Tag type={area.level} />
        </View>
        <TouchableOpacity style={styles.imagesButton}>
          <Feather name="camera" size={18} color="black" />
          <Text>Ver imagens</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default AreaInfos;
