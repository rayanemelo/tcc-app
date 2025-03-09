import { FloodAreaInfo } from '@/types/flood-area-info';
import { useState } from 'react';
import { LatLng, MapPressEvent } from 'react-native-maps';

export function useFloodLocation() {
  const [floodLocationCoordinates, setFloodLocationCoordinates] =
    useState<LatLng | null>(null); // Localização do ponto de enchente
  const [markerAddressModal, setMarkerAddressModal] = useState(false); // Modal de confirmação de endereço

  const [floodAreaInfo, setFloodAreaInfo] = useState<FloodAreaInfo | null>(
    null
  );
  // console.log('floodAreaInfo: ', floodAreaInfo);

  function handleMapPress(event: MapPressEvent) {
    const coordinate = event.nativeEvent.coordinate;
    console.log('coordinate: ', coordinate);
    setFloodLocationCoordinates(coordinate);

    if (coordinate) {
      setMarkerAddressModal(true);
      // fetchGeocoding(coordinate);
    }
  }

  // const fetchGeocoding = async (coordinate: LatLng) => {
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}&key=${AUTH_KEY_GEOCONDING_API}`;
  //   try {
  //     const response = await API_GEOCODE.get(url);
  //     console.log('response: ', response.data);
  //   } catch (error) {
  //     console.log('error: ', error);
  //   }
  // };

  function handleConfirm() {
    setFloodLocationCoordinates(null);
    setMarkerAddressModal(false);
  }

  function handleCancel() {
    setMarkerAddressModal(false);
    setFloodLocationCoordinates(null);
  }

  return {
    floodLocationCoordinates,
    handleMapPress,
    markerAddressModal,
    handleConfirm,
    handleCancel,
    setFloodLocationCoordinates,
    floodAreaInfo,
    setFloodAreaInfo,
  };
}
