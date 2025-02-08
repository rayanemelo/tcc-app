import { Coordinate } from '@/types/coordinate';
import { FontAwesome5 } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

type Props = {
  coordinate: Coordinate | null;
}

const CustomMarker = ({ coordinate }: Props) => {
  return coordinate && (
    <Marker coordinate={coordinate}>
      <FontAwesome5 name="map-marker-alt" size={35} color="#D84040" />
    </Marker>
  );
};


export default CustomMarker;