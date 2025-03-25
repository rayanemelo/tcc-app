import ParallaxScrollView from '@/components/ui/ParallaxScrollView';
import { ThemedView } from '@/components/ui/ThemedView';
import { ThemedText } from '@/components/ui/ThemedText';
import { StyleSheet, View } from 'react-native';
import Tag from '@/components/shared/Tag';
import { mapStatusToTagType } from '@/utils/functions/map-status-to-tag-type';
import { formatCustomDate } from '@/utils/functions/format-custom-date';
import SeeImagensButton from '@/components/shared/SeeImagensButton';
import { useHistoryDetails } from '@/hooks/useHistoryDetails';
import ImageCarousel from '@/components/ImageCarousel';

export default function HistoryDetails() {
  const { history, setVisibleImages, visibleImages } = useHistoryDetails();
  return history ? (
    <>
      <ParallaxScrollView>
        <ThemedView style={[styles.wrapper]}>
          <View>
            <ThemedText style={[styles.bold]}>Local</ThemedText>
            <ThemedText>{history.address}</ThemedText>
            <ThemedText>{formatCustomDate(history.createdAt)}</ThemedText>
          </View>
          <View style={styles.flex}>
            <ThemedText style={[styles.bold]}>Status</ThemedText>
            <ThemedText>
              <Tag type={mapStatusToTagType(history.status)} />
            </ThemedText>
          </View>
          <View style={styles.flex}>
            <ThemedText style={[styles.bold]}>Nível da enchente</ThemedText>
            <ThemedText>
              <Tag type={history.floodLevelId} />
            </ThemedText>
          </View>

          {history.commentsAdmin && (
            <View>
              <ThemedText style={[styles.bold, styles.flex]}>
                Comentários
              </ThemedText>
              <ThemedText>{history.commentsAdmin}</ThemedText>
            </View>
          )}

          <SeeImagensButton
            text="Ver imagem"
            onPress={() => setVisibleImages(true)}
          />
        </ThemedView>
      </ParallaxScrollView>
      {visibleImages && history.images && (
        <ImageCarousel
          images={history.images}
          onClose={() => setVisibleImages(false)}
        />
      )}
    </>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 24,
    gap: 16,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
