import { useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { styles } from './styles';
import { useSharedValue } from 'react-native-reanimated';
import CloseButton from '../shared/CloseButton';

type Props = {
  images: string[];
  onClose: () => void;
};

const { width, height } = Dimensions.get('window');

const ImageCarousel = ({ images, onClose }: Props) => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const renderItem = ({ item }: { item: string }) => (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.overlay}>
      <CloseButton onPress={onClose} style={styles.close} />
      <Carousel
        ref={carouselRef}
        loop={false}
        width={width * 0.8}
        height={height * 0.7}
        autoPlay={false}
        data={images}
        renderItem={renderItem}
        scrollAnimationDuration={1000}
        onProgressChange={progress}
      />

      <Pagination.Basic
        progress={progress}
        data={images}
        dotStyle={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          borderRadius: 50,
          marginTop: -35,
        }}
        activeDotStyle={{ backgroundColor: '#f1f1f1' }}
        containerStyle={{ gap: 5, marginTop: 10 }}
      />
    </View>
  );
};

export default ImageCarousel;
