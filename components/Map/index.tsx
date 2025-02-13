import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent } from 'react-native-maps';
import CustomMarker from './components/marker';
import FloodedAreas from './components/flooded-areas-marker';
import UserLocation from './components/user-location';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useMarkerFlood } from '@/context/MarkerFloodContext';
import { useState } from 'react';
import AreaInfos from '../AreaInfos';
import { FloodArea } from '@/types/flood-area';

const CustomMap = () => {
  const { userLocation } = useUserLocation();
  const { floodLocationCoordinates, handleMapPress, setCurrentStep } =
    useMarkerFlood();

  const [selectedArea, setSelectedArea] = useState<FloodArea | null>();

  let coordinates = selectedArea
    ? { latitude: 0, longitude: 0 }
    : (floodLocationCoordinates ?? { latitude: 0, longitude: 0 });

  return (
    <>
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
        <FloodedAreas
          selectedArea={selectedArea ?? null}
          onAreaPress={(area) => {
            setSelectedArea(area);
            setCurrentStep(0);
          }}
        />

        <UserLocation userLocation={userLocation} />
      </MapView>
      {selectedArea && (
        <AreaInfos
          isVisible={selectedArea !== null}
          area={selectedArea}
          onClose={() => {
            setSelectedArea(null);
            // setCurrentStep(1);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });

export default CustomMap;
