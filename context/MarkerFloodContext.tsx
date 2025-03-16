import { useFloodLocation } from '@/hooks/useFloodLocation';
import { createContext, useContext, useState } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  currentStep: number;
  markerAddressModal: boolean;
  floodLocationCoordinates: LatLng | null;
  resetFloodedAreaMarking: () => void;
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
    floodLocationCoordinates,
    handleMapPress,
    setFloodLocationCoordinates,
    resetFloodedAreaMarking,
  } = useFloodLocation();

  return (
    <MarkerFloodContext.Provider
      value={{
        markerAddressModal,
        floodLocationCoordinates,
        handleMapPress,
        currentStep,
        setCurrentStep,
        setFloodLocationCoordinates,
        resetFloodedAreaMarking,
      }}
    >
      {children}
    </MarkerFloodContext.Provider>
  );
};

export const useMarkerFlood = () => {
  return useContext(MarkerFloodContext);
};
