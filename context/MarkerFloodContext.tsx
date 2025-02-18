import { useFloodLocation } from '@/hooks/useFloodLocation';
import { createContext, useContext, useState } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  currentStep: number;
  selectedAddress: string;
  markerAddressModal: boolean;
  floodLocationCoordinates: LatLng | null;
  handleCancel: () => void;
  handleConfirm: () => void;
  setCurrentStep: (step: number) => void;
  handleMapPress: (event: MapPressEvent) => void;
  setFloodLocationCoordinates: (coordinates: LatLng | null) => void;
};

type MarkerFloodProviderProps = { children: JSX.Element | JSX.Element[] };

const MarkerFloodContext = createContext<MarkerFloodProps>(
  {} as MarkerFloodProps
);

export const MarkerFloodProvider = ({ children }: MarkerFloodProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const {
    markerAddressModal,
    selectedAddress,
    floodLocationCoordinates,
    handleMapPress,
    handleCancel,
    handleConfirm,
    setFloodLocationCoordinates,
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
        currentStep,
        setCurrentStep,
        setFloodLocationCoordinates,
      }}
    >
      {children}
    </MarkerFloodContext.Provider>
  );
};

export const useMarkerFlood = () => {
  return useContext(MarkerFloodContext);
};
