import { useFloodLocation } from '@/hooks/useFloodLocation';
import { FlooadAreaService } from '@/service/flood-area';
import { createContext, useContext, useState } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  currentStep: number;
  markerAddressModal: boolean;
  floodLocationCoordinates: LatLng | null;
  isLoading: boolean;
  send: () => Promise<any>;
  resetFloodedAreaMarking: () => void;
  setCurrentStep: (step: number) => void;
  handleMapPress: (event: MapPressEvent) => void;
  setFloodLocationCoordinates: (coordinates: LatLng | null) => void;
};

type MarkerFloodProviderProps = { children: JSX.Element | JSX.Element[] };

const MarkerFloodContext = createContext<MarkerFloodProps>(
  {} as MarkerFloodProps
);

const floodAreaService = new FlooadAreaService();

export const MarkerFloodProvider = ({ children }: MarkerFloodProviderProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    floodAreaForm,
    markerAddressModal,
    floodLocationCoordinates,
    handleMapPress,
    setFloodLocationCoordinates,
    resetFloodedAreaMarking,
  } = useFloodLocation();

  async function send() {
    setIsLoading(true);
    const payload = {
      ...floodAreaForm,
      latitude: floodAreaForm.latitude.toString(),
      longitude: floodAreaForm.longitude.toString(),
      status: 'pending',
    };

    const res = await floodAreaService.sendFloodArea(payload);

    setIsLoading(false);

    if (res?.status === 201) {
      setCurrentStep(6);
    } else {
      setCurrentStep(7);
    }
    return res;
  }

  return (
    <MarkerFloodContext.Provider
      value={{
        send,
        markerAddressModal,
        floodLocationCoordinates,
        handleMapPress,
        currentStep,
        setCurrentStep,
        setFloodLocationCoordinates,
        resetFloodedAreaMarking,
        isLoading,
      }}
    >
      {children}
    </MarkerFloodContext.Provider>
  );
};

export const useMarkerFlood = () => {
  return useContext(MarkerFloodContext);
};
