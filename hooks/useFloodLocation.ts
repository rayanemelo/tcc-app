import { useState } from 'react';
import { LatLng, MapPressEvent } from 'react-native-maps';

export function useFloodLocation() {
  const [floodLocationCoordinates, setFloodLocationCoordinates] =
    useState<LatLng | null>(null); // Localização do ponto de enchente
  const [selectedAddress, setSelectedAddress] = useState(''); // Endereço do ponto de enchente
  const [markerAddressModal, setMarkerAddressModal] = useState(false); // Modal de confirmação de endereço

  function handleMapPress(event: MapPressEvent) {
    const coordinate = event.nativeEvent.coordinate;
    setFloodLocationCoordinates(coordinate);

    getAddressFromCoordinates();
  }

  function getAddressFromCoordinates() {
    setMarkerAddressModal(true);
    setSelectedAddress('Rua teste, 123');
  }

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
    selectedAddress,
    markerAddressModal,
    handleConfirm,
    handleCancel,
    setFloodLocationCoordinates,
  };
}
