import Authentication from '@/components/Authentication';
import Camera from '@/components/Camera';
import ConfirmFloodLocation from '@/components/ConfirmFloodLocation';
import FloodLevel from '@/components/FloodLevel';
import InfoMessage from '@/components/InfoMessage';
import CustomMap from '@/components/Map';
import ErrorMessage from '@/components/Messages/error';
import SuccessMessage from '@/components/Messages/sucess';
import { useMarkerFlood } from '@/context/MarkerFloodContext';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapScreen() {
  const { markerAddressModal, selectedAddress, handleCancel, handleConfirm } =
    useMarkerFlood();

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (markerAddressModal) {
      setCurrentStep(2);
    }
  }, [markerAddressModal]);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function send() {
    setCurrentStep(6);
  }

  const getStep = () => {
    const steps: any = {
      1: (
        <InfoMessage text="Ajude a comunidade: marque áreas afetadas por enchentes." />
      ),
      2: (
        <ConfirmFloodLocation
          address={selectedAddress}
          isVisible={markerAddressModal}
          handleCancel={() => {
            setCurrentStep(1);
            handleCancel();
          }}
          handleConfirm={() => {
            handleConfirm();
            setCurrentStep(3);
          }}
        />
      ),
      3: (
        <Camera
          onClose={() => setCurrentStep(1)}
          sendPhoto={() => nextStep()}
        />
      ),
      4: <FloodLevel onClose={() => {}} handleContinue={() => nextStep()} />,
      5: (
        <Authentication
          handleCancel={() => setCurrentStep(1)}
          handleConfirm={send}
        />
      ),
      6: <SuccessMessage close={() => setCurrentStep(1)} />,
      7: <ErrorMessage close={() => setCurrentStep(1)} />,
    };

    return steps[currentStep];
  };

  return (
    <View style={styles.container}>
      <CustomMap />
      <View style={styles.main}>{getStep()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
