import { View, Text } from 'react-native';
import Modal from '../shared/Modal';
import { COLORS } from '@/styles/colors';
import { FloodArea } from '@/types/flood-area';
import Tag from '../shared/Tag';
import CloseButton from '../shared/CloseButton';
import { useState } from 'react';
import { styles } from './styles';
import { formatDate } from '@/utils/functions/format-date';
import SeeImagens from '../shared/SeeImagensButton';
import ImageCarousel from '../ImageCarousel';

type Props = {
  isVisible: boolean;
  area: FloodArea;
  onClose: () => void;
};

const AreaInfos = ({ isVisible, onClose, area }: Props) => {
  const { address, createdAt } = area;

  const [visibleImages, setVisibleImages] = useState(false);

  const publishedDateRelativeToNow = formatDate(createdAt);

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
            <Tag type={area.floodLevelId} />
          </View>
          <SeeImagens
            onPress={() => setVisibleImages(true)}
            text="Ver imagens"
          />
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
