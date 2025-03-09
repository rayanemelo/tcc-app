import { useFloodLocation } from '@/hooks/useFloodLocation';
import { FloodAreaInfo } from '@/types/flood-area-info';
import { createContext, useContext, useState } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  currentStep: number;
  markerAddressModal: boolean;
  floodLocationCoordinates: LatLng | null;
  floodAreaInfo: FloodAreaInfo | null;
  setFloodAreaInfo: (data: FloodAreaInfo) => void;
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
  console.log('currentStep: ', currentStep);

  const {
    markerAddressModal,

    floodLocationCoordinates,
    handleMapPress,
    handleCancel,
    handleConfirm,
    setFloodLocationCoordinates,
    floodAreaInfo,
    setFloodAreaInfo,
  } = useFloodLocation();

  return (
    <MarkerFloodContext.Provider
      value={{
        floodAreaInfo,
        setFloodAreaInfo,
        markerAddressModal,

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
