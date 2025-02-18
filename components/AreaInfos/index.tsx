import { View, Text, TouchableOpacity } from 'react-native';
import Modal from '../shared/Modal';
import { COLORS } from '@/styles/colors';
import { FloodArea } from '@/types/flood-area';
import Tag from '../shared/Tag';
import CloseButton from '../shared/CloseButton';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import Feather from '@expo/vector-icons/Feather';
import ImageCarousel from '../ImageCarousel';
import { useState } from 'react';
import { styles } from './styles';

type Props = {
  isVisible: boolean;
  area: FloodArea;
  onClose: () => void;
};

const AreaInfos = ({ isVisible, onClose, area }: Props) => {
  const { address, createdAt } = area;

  const [visibleImages, setVisibleImages] = useState(false);

  const publishedDateRelativeToNow = formatDistanceToNow(
    createdAt || new Date(),
    {
      locale: ptBR,
      addSuffix: true,
    }
  );
  return (
    <>
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
          <TouchableOpacity
            style={styles.imagesButton}
            onPress={() => setVisibleImages(true)}
          >
            <Feather name="camera" size={18} color="black" />
            <Text>Ver imagens</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {visibleImages && (
        <ImageCarousel
          images={area.images}
          onClose={() => setVisibleImages(false)}
        />
      )}
    </>
  );
};

export default AreaInfos;
