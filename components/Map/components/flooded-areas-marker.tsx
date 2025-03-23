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
      floodLevelId: 1,
      updatedAt: dateNow.toISOString(),
      createdAt: dateNow.toISOString(),
      active: true,
      status: 'pending',
      noCount: 0,
      yesCount: 0,
      userId: 1,
      images: [
        'https://i0.wp.com/diariodotransporte.com.br/wp-content/uploads/2020/02/8701ecbc-920b-41cb-86bf-1dd77a1fbdc1.jpg?fit=720%2C1280&ssl=1',
        'https://www.correiodopovo.com.br/image/contentid/policy:1.1491055:1714832272/Enchentes%20na%20Caldas%20J%C3%BAnior%20com%20Rua%20dos%20Andradas_03.jpeg?$p=8771375&w=1136&$w=ec52ab9',
      ],
    },
    {
      id: 2,
      latitude: -29.662377218010036,
      longitude: -50.76924130514626,
      address: 'Rua Marechal Deodoro',
      floodLevelId: 2,
      createdAt: '2025-01-11T00:00:00Z',
      updatedAt: dateNow.toISOString(),
      images: [
        'https://static.ndmais.com.br/2023/11/copia-de-nd-canva-vertical-videos-do-portal-53-3-frame-video-731x1300.jpg',
      ],
      active: true,
      status: 'completed',
      noCount: 0,
      yesCount: 0,
      userId: 2,
    },
    {
      id: 3,
      latitude: -29.638590493759015,
      longitude: -50.795634436975625,
      address: 'Rua General Osório',
      floodLevelId: 3,
      active: true,
      status: 'pending',
      noCount: 0,
      yesCount: 0,
      userId: 1,
      createdAt: '2025-01-10T00:00:00Z',
      updatedAt: dateNow.toISOString(),
      images: [
        'https://portal-arquivos.engeplus.com.br/cache/noticia/0155/0155667/apos-chuva-urussanga-registra-alagamentos-nesta-quarta-feira.jpg',
        'https://odia.ig.com.br/_midias/jpg/2020/12/26/398x470/1_chuva_caxias-20819611.jpg',
      ],
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
