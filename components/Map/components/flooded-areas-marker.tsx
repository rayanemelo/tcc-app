import { Marker } from 'react-native-maps';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '@/styles/colors';
import { FloodArea } from '@/types/flood-area';

type Props = {
  selectedArea: FloodArea | null;
  onAreaPress: (area: FloodArea) => void;
};

const FloodedAreas = ({ selectedArea, onAreaPress }: Props) => {
  const dateNow = new Date();

  const floodedAreas: FloodArea[] = [
    {
      id: 1,
      latitude: -29.642781895977247,
      longitude: -50.76904580046604,
      address: 'Rua General Frota',
      level: 1,
      createdAt: dateNow.toISOString(),
    },
    {
      id: 2,
      latitude: -29.662377218010036,
      longitude: -50.76924130514626,
      address: 'Rua Marechal Deodoro',
      level: 2,
      createdAt: '2025-01-11T00:00:00Z',
    },
    {
      id: 3,
      latitude: -29.638590493759015,
      longitude: -50.795634436975625,
      address: 'Rua General Osório',
      level: 3,
      createdAt: '2025-01-10T00:00:00Z',
    },
  ];

  return floodedAreas?.map((area, index) => (
    <Marker
      coordinate={area}
      key={index}
      onPress={(e) => {
        e.stopPropagation();
        onAreaPress(area);
      }}
    >
      <View
        style={[
          styles.container,
          selectedArea?.id === area.id && styles.selectedArea,
        ]}
      >
        <MaterialIcons name="waves" size={19} color="white" />
      </View>
    </Marker>
  ));
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightBlue,
    padding: 6,
    borderRadius: 100,
  },
  selectedArea: { backgroundColor: COLORS.red },
});

export default FloodedAreas;
