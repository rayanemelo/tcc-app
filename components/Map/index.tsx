import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import CustomMarker from './components/marker';
import FloodedAreas from './components/flooded-areas-marker';
import UserLocation from './components/user-location';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useFloodLocation } from '@/hooks/useFloodLocation';
import InfoMessage from '../InfoMessage';
import ConfirmFloodLocation from '../ConfirmFloodLocation';
import Camera from '../Camera';
import { useState } from 'react';
import FloodLevel from '../FloodLevel';
import Authentication from '../Authentication';

const CustomMap = () => {
  const { userLocation } = useUserLocation();
  const {
    floodLocationCoordinates,
    handleMapPress,
    selectedAddress,
    markerAddressModal,
    handleCancel,
    handleConfirm
  } = useFloodLocation();

  const [isCameraVisible, setIsCameraVisible] = useState(false);

  const openCamera = () => {
    setIsCameraVisible(true);
  };

  const closeCamera = () => {
    setIsCameraVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <InfoMessage text="Ajude a comunidade: marque áreas afetadas por enchentes." />
        <CustomMarker coordinate={floodLocationCoordinates} />

        <FloodedAreas />

        <UserLocation userLocation={userLocation} />

        <FloodLevel isVisible={false} onClose={() => { }} />
        
        <Authentication />

      </MapView>
      <ConfirmFloodLocation
        address={selectedAddress}
        // isVisible={markerAddressModal}
        isVisible={false}
        handleCancel={handleCancel}
        handleConfirm={() => {
          handleConfirm();
          openCamera();
        }}
      />

      {isCameraVisible && <Camera onClose={closeCamera} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default CustomMap;