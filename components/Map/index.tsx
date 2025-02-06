import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import CustomMarker from './components/marker';
import FloodedAreas from './components/flooded-areas-marker';
import UserLocation from './components/user-location';


export type Coordinate = {
  latitude: number;
  longitude: number;
};

const CustomMap = () => {
  const [coordinate, setCoordinate] = useState<Coordinate>({ latitude: -23.5505, longitude: -46.6333 });

  const handleMapPress = (event: any) => {
    const coordinate = event.nativeEvent.coordinate;
    setCoordinate(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        <CustomMarker coordinate={coordinate} />

        <FloodedAreas />

        <UserLocation />

      </MapView>
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