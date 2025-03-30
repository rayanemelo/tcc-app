import Authentication from '@/components/Authentication';
import Camera from '@/components/Camera';
import ConfirmFloodLocation from '@/components/ConfirmFloodLocation';
import FloodLevel from '@/components/FloodLevel';
import InfoMessage from '@/components/InfoMessage';
import CustomMap from '@/components/Map';
import ErrorMessage from '@/components/Messages/error';
import SuccessMessage from '@/components/Messages/success';
import { useAuth } from '@/context/AuthContext';
import { useMarkerFlood } from '@/context/MarkerFloodContext';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapScreen() {
  const { authentication } = useAuth();

  const {
    markerAddressModal,
    resetFloodedAreaMarking,
    currentStep,
    setCurrentStep,
    send,
  } = useMarkerFlood();

  useEffect(() => {
    if (markerAddressModal) {
      setCurrentStep(2);
    }
  }, [markerAddressModal]);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function returnToStepOne() {
    resetFloodedAreaMarking();
    setCurrentStep(1);
  }

  async function userIsAuthenticated() {
    if (!authentication.authenticated) {
      setCurrentStep(5);

      return;
    }

    await send();
  }

  const getStep = () => {
    const steps: Record<number, React.ReactNode> = {
      1: (
        <InfoMessage text="Ajude a comunidade: marque áreas afetadas por enchentes." />
      ),
      2: (
        <ConfirmFloodLocation
          isVisible={markerAddressModal}
          handleCancel={() => returnToStepOne()}
          handleConfirm={() => nextStep()}
        />
      ),
      3: (
        <Camera
          onClose={() => returnToStepOne()}
          sendPhoto={() => nextStep()}
        />
      ),
      4: (
        <FloodLevel
          onClose={() => returnToStepOne()}
          handleContinue={() => userIsAuthenticated()}
        />
      ),
      5: (
        <Authentication
          handleCancel={() => returnToStepOne()}
          handleConfirm={() => send()}
        />
      ),
      6: <SuccessMessage close={() => returnToStepOne()} />,
      7: <ErrorMessage close={() => returnToStepOne()} />,
    };

    return steps[currentStep];
  };

  return (
    <View style={styles.container}>
      <CustomMap />
      <View style={styles.main}>{getStep()}</View>
      {/* <UserAlertFloodedArea address="Rua dos Bobos, nº 0" /> */}
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
