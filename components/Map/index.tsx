import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent } from 'react-native-maps';
import CustomMarker from './components/marker';
import FloodedAreas from './components/flooded-areas-marker';
import UserLocation from './components/user-location';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useMarkerFlood } from '@/context/MarkerFloodContext';

const CustomMap = () => {
  const { userLocation } = useUserLocation();
  const { floodLocationCoordinates, handleMapPress } = useMarkerFlood();

  const coordinates = floodLocationCoordinates ?? { latitude: 0, longitude: 0 };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      onPress={(e: MapPressEvent) => {
        handleMapPress(e);
      }}
    >
      <CustomMarker coordinate={coordinates} />
      <FloodedAreas />
      <UserLocation userLocation={userLocation} />
    </MapView>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });

export default CustomMap;
