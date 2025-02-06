import { FontAwesome5 } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';
import { Coordinate } from '..';

type Props = {
  coordinate: Coordinate;
}

const CustomMarker = ({ coordinate }: Props) => {
  return (
    <Marker coordinate={coordinate}>
      <FontAwesome5 name="map-marker-alt" size={35} color="#D84040" />
    </Marker>
  );
};


export default CustomMarker;