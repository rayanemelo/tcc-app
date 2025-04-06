import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Coordinate } from '@/types/coordinate';
import { INITIAL_REGION } from '@/utils/constants';

export function useUserLocation() {
  const [userLocation, setUserLocation] = useState<Coordinate>(INITIAL_REGION);

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
        console.log('Permissão de localização não concedida'); // TO DO: Show a message to the user
      }
    };

    getLocationPermission();
  }, []);

  return {
    userLocation,
  };
}
