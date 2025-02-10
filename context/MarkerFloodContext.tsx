import { useFloodLocation } from '@/hooks/useFloodLocation';
import { createContext, useContext } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  markerAddressModal: boolean;
  selectedAddress: string;
  floodLocationCoordinates: LatLng | null;
  handleMapPress: (event: MapPressEvent) => void;
  handleCancel: () => void;
  handleConfirm: () => void;
};

type MarkerFloodProviderProps = { children: JSX.Element | JSX.Element[] };

const MarkerFloodContext = createContext<MarkerFloodProps>(
  {} as MarkerFloodProps
);

export const MarkerFloodProvider = ({ children }: MarkerFloodProviderProps) => {
  const {
    markerAddressModal,
    selectedAddress,
    floodLocationCoordinates,
    handleMapPress,
    handleCancel,
    handleConfirm,
  } = useFloodLocation();

  return (
    <MarkerFloodContext.Provider
      value={{
        markerAddressModal,
        selectedAddress,
        floodLocationCoordinates,
        handleMapPress,
        handleCancel,
        handleConfirm,
      }}
    >
      {children}
    </MarkerFloodContext.Provider>
  );
};

export const useMarkerFlood = () => {
  return useContext(MarkerFloodContext);
};
