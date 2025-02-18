import { StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Region } from 'react-native-maps';
import CustomMarker from './components/marker';
import FloodedAreas from './components/flooded-areas-marker';
import UserLocation from './components/user-location';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useMarkerFlood } from '@/context/MarkerFloodContext';
import { useEffect, useMemo, useRef, useState } from 'react';
import AreaInfos from '../AreaInfos';
import { FloodArea } from '@/types/flood-area';

const CustomMap = () => {
  const { userLocation } = useUserLocation();
  const {
    floodLocationCoordinates,
    handleMapPress,
    handleCancel,
    setCurrentStep,
    currentStep,
  } = useMarkerFlood();

  const [selectedArea, setSelectedArea] = useState<FloodArea | null>();

  const mapRef = useRef<MapView | null>(null);

  const initialRegion = useMemo(() => {
    return {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }, []);

  const coordinates = useMemo(() => {
    return selectedArea
      ? { latitude: selectedArea.latitude, longitude: selectedArea.longitude }
      : (floodLocationCoordinates ?? { latitude: 0, longitude: 0 });
  }, [selectedArea, floodLocationCoordinates]);

  const animateToRegion = (region: Region) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 500);
    }
  };

  useEffect(() => {
    if (selectedArea) {
      animateToRegion({
        latitude: selectedArea.latitude,
        longitude: selectedArea.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [selectedArea]);

  useEffect(() => {
    if (coordinates) {
      animateToRegion({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (currentStep === 1) {
      animateToRegion(initialRegion);
    }
  }, [currentStep, initialRegion]);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(e: MapPressEvent) => {
          if (selectedArea) {
            return;
          }

          handleMapPress(e);
        }}
      >
        <CustomMarker coordinate={coordinates} />
        <FloodedAreas
          selectedArea={selectedArea ?? null}
          onAreaPress={(area) => {
            setSelectedArea(area);
            setCurrentStep(0);
            handleCancel();
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
            setCurrentStep(1);
            if (mapRef.current) {
              mapRef.current.animateToRegion(initialRegion, 500);
            }
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({ map: { flex: 1 } });

export default CustomMap;
