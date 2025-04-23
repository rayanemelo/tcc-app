import { useFloodLocation } from '@/hooks/useFloodLocation';
import { useUserLocation } from '@/hooks/useUserLocation';
import { FlooadAreaService } from '@/service/flood-area';
import { isWithinRadius } from '@/utils/functions/is-within-radius';
import { createContext, useContext, useState } from 'react';
import { MapPressEvent, LatLng } from 'react-native-maps';

type MarkerFloodProps = {
  currentStep: number;
  markerAddressModal: boolean;
  floodLocationCoordinates: LatLng | null;
  isLoading: boolean;
  nextStep: () => void;
  send: () => Promise<any>;
  returnToStepOne: () => void;
  resetFloodedAreaMarking: () => void;
  handleValidateLocation: () => boolean;
  setCurrentStep: (step: number) => void;
  handleConfirmFloodLocation: () => void;
  handleMapPress: (event: MapPressEvent) => void;
  setFloodLocationCoordinates: (coordinates: LatLng | null) => void;
};

type MarkerFloodProviderProps = { children: JSX.Element | JSX.Element[] };

export const stepInfoMessage = 1;
export const stepConfirmFloodLocation = 2;
export const stepCamera = 3;
export const stepFloodLevel = 4;
export const stepAuthentication = 5;
export const stepSuccess = 6;
export const stepError = 7;
export const stepNotWithinRadius = 8;
export const stepLocationAccess = 9;

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

  const { userLocation } = useUserLocation();

  function handleValidateLocation() {
    if (!userLocation) {
      setCurrentStep(stepLocationAccess);
      return false;
    }

    const coordinates = {
      latArea: Number(floodAreaForm.latitude),
      lonArea: Number(floodAreaForm.longitude),
      latUser: Number(userLocation.latitude),
      lonUser: Number(userLocation.longitude),
    };

    if (!isWithinRadius(coordinates)) {
      setCurrentStep(stepNotWithinRadius);
      return false;
    }
    return true;
  }

  async function send() {
    setIsLoading(true);

    if (!userLocation) {
      setIsLoading(false);
      return;
    }

    const payload = {
      ...floodAreaForm,
      latitude: floodAreaForm.latitude.toString(),
      longitude: floodAreaForm.longitude.toString(),
      status: 'pending',
      userLocation: {
        latitude: userLocation.latitude.toString(),
        longitude: userLocation.longitude.toString(),
      },
    };

    const res = await floodAreaService.sendFloodArea(payload);

    setIsLoading(false);

    if (res?.status === 201) {
      setCurrentStep(stepSuccess);
    } else {
      setCurrentStep(stepError);
    }
    return res;
  }

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function handleConfirmFloodLocation() {
    const isValidLocation = handleValidateLocation();

    if (!isValidLocation) {
      return;
    }

    nextStep();
  }

  function returnToStepOne() {
    resetFloodedAreaMarking();
    setCurrentStep(1);
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
        handleValidateLocation,
        nextStep,
        handleConfirmFloodLocation,
        returnToStepOne,
      }}
    >
      {children}
    </MarkerFloodContext.Provider>
  );
};

export const useMarkerFlood = () => {
  return useContext(MarkerFloodContext);
};
