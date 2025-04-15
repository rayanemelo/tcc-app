import Authentication from '@/components/Authentication';
import Camera from '@/components/Camera';
import ConfirmFloodLocation from '@/components/ConfirmFloodLocation';
import FloodLevel from '@/components/FloodLevel';
import InfoMessage from '@/components/InfoMessage';
import { LocationAccess } from '@/components/LocationAccess';
import CustomMap from '@/components/Map';
import ErrorMessage from '@/components/Messages/error';
import SuccessMessage from '@/components/Messages/success';
import { NotWithinRadius } from '@/components/NotWithinRadius';
import UserAlertFloodedArea from '@/components/UserAlertFloodedArea';
import { useAuth } from '@/context/AuthContext';
import {
  stepAuthentication,
  stepConfirmFloodLocation,
  stepError,
  stepSuccess,
  useMarkerFlood,
} from '@/context/MarkerFloodContext';
import { useUserAlertFloodedArea } from '@/hooks/useUserAlertFloddedArea';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapScreen() {
  const { authentication } = useAuth();
  const { updateFloodAreaByUser, openAlertUser, closeAlert, setIsFlooded } =
    useUserAlertFloodedArea();

  const [isToUpadted, setIsToUpdated] = useState(false);

  const {
    markerAddressModal,
    currentStep,
    setCurrentStep,
    send,
    returnToStepOne,
    handleConfirmFloodLocation,
    nextStep,
  } = useMarkerFlood();

  useEffect(() => {
    if (markerAddressModal) {
      setCurrentStep(stepConfirmFloodLocation);
    }
  }, [markerAddressModal]);

  function onPressAlertResponse(response: boolean) {
    setIsToUpdated(true);
    setIsFlooded(response);
    userIsAuthenticated();
  }

  async function userIsAuthenticated() {
    if (!authentication.authenticated) {
      setCurrentStep(stepAuthentication);

      if (isToUpadted) {
        console.log('entrei aqui');
      }

      return;
    }

    await submit();
  }

  async function submit() {
    if (isToUpadted) {
      console.log('isToUpadted: ', isToUpadted);
      const res = await updateFloodAreaByUser();
      console.log('res: ', res.status);

      if (res?.status === 200) {
        setCurrentStep(stepSuccess);
      } else {
        setCurrentStep(stepError);
      }

      // closeAlert();
      return;
    }

    await send();
  }

  const textSuccess = !isToUpadted
    ? 'Estamos analisando a imagem enviada. Assim que for confirmada, a área será marcada como alagada no mapa.'
    : '';

  const getStep = () => {
    const steps: Record<number, React.ReactNode> = {
      1: (
        <InfoMessage text="Ajude a comunidade: marque áreas afetadas por enchentes." />
      ),
      2: (
        <ConfirmFloodLocation
          isVisible={markerAddressModal}
          handleCancel={() => returnToStepOne()}
          handleConfirm={() => handleConfirmFloodLocation()}
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
          handleConfirm={() => submit()}
        />
      ),
      6: <SuccessMessage close={() => returnToStepOne()} text={textSuccess} />,
      7: <ErrorMessage close={() => returnToStepOne()} />,
      8: <NotWithinRadius close={() => returnToStepOne()} />,
      9: <LocationAccess close={() => returnToStepOne()} />,
    };

    return steps[currentStep];
  };

  return (
    <View style={styles.container}>
      <CustomMap />
      <View style={styles.main}>{getStep()}</View>
      <UserAlertFloodedArea
        isVisible={openAlertUser}
        address="Rua dos Pinheiros, nº 0"
        handlePressYes={() => onPressAlertResponse(true)}
        handlePressNo={() => onPressAlertResponse(false)}
      />
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
