import { Marker } from 'react-native-maps';
import { Coordinate } from '..';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, View } from 'react-native';


const UserLocation = () => {
  const [userLocation, setUserLocation] = useState<Coordinate | null>();

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.log('Permissão de localização não concedida');
      }
    };

    getLocationPermission();
  }, []);

  return userLocation && (
    <Marker coordinate={userLocation}>
      <View style={styles.shadow}>
        <View style={styles.white} >
          <View style={styles.blue} />
        </View>
      </View>
    </Marker>

  );
};


const styles = StyleSheet.create({
  blue: {
    backgroundColor: '#007EA4',
    padding: 8,
    borderRadius: '100%',
  },
  white: {
    opacity: 0.9,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }

});

export default UserLocation;