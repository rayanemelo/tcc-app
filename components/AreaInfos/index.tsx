import Modal from '../shared/Modal';
import { FloodArea } from '@/types/flood-area';
import { useState } from 'react';
import ImageCarousel from '../ImageCarousel';
import { PublicArea } from './PublicArea';
import { PrivatePendingArea } from './PrivatePendingArea';

type Props = {
  isVisible: boolean;
  area: FloodArea;
  onClose: () => void;
};

const AreaInfos = ({ isVisible, onClose, area }: Props) => {
  console.log('area: ', area);
  const [visibleImages, setVisibleImages] = useState(false);

  const { status } = area;

  return (
    <>
      <Modal isVisible={isVisible}>
        {status === 'pending' ? (
          <PrivatePendingArea
            area={area}
            onClose={() => onClose()}
            onPress={() => setVisibleImages(true)}
          />
        ) : (
          <PublicArea
            area={area}
            onClose={() => onClose()}
            onPress={() => setVisibleImages(true)}
          />
        )}

        {/* <View style={styles.container}>
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
        </View> */}
      </Modal>
      {visibleImages && (
        <ImageCarousel
          images={area.images || []}
          onClose={() => setVisibleImages(false)}
        />
      )}
    </>
  );
};

export default AreaInfos;
