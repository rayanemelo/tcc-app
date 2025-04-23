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
  useMarkerFlood,
} from '@/context/MarkerFloodContext';
import { useUserAlertFloodedArea } from '@/hooks/useUserAlertFloodedArea';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function MapScreen() {
  const { authentication } = useAuth();

  const {
    send,
    nextStep,
    currentStep,
    setCurrentStep,
    returnToStepOne,
    markerAddressModal,
    handleConfirmFloodLocation,
  } = useMarkerFlood();

  const {
    changeCountFloodedArea,
    isLoading,
    openModal,
    closeModal,
    flowAlertUser,
    setFlowAlertUser,
  } = useUserAlertFloodedArea();

  useEffect(() => {
    if (markerAddressModal) {
      setCurrentStep(stepConfirmFloodLocation);
    }
  }, [markerAddressModal]);

  async function submit(
    responseUser: boolean | undefined,
    isFlow: boolean = false
  ) {
    const isAuthenticated = authentication.authenticated;

    if (!isAuthenticated) {
      closeModal();
      setCurrentStep(stepAuthentication);
      return;
    }

    if (isFlow && responseUser !== undefined) {
      console.log('update');
      update(responseUser);
      return;
    }

    console.log('send flood area');
    await send();
  }

  async function update(responseUser: boolean) {
    console.log('update: ');
    const res = await changeCountFloodedArea(responseUser);
    console.log('res: ', res?.status);

    if (res?.status === 200) setCurrentStep(stepConfirmFloodLocation);
    else setCurrentStep(stepError);

    closeModal();
  }

  const textSuccess = !flowAlertUser
    ? 'Estamos analisando a imagem enviada. Assim que for confirmada, a área  será marcada como alagada no mapa.'
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
          handleContinue={() => submit(undefined)}
        />
      ),
      5: (
        <Authentication
          handleCancel={() => returnToStepOne()}
          handleConfirm={() => submit(undefined)}
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
        openModal={openModal}
        close={closeModal}
        address="Rua dos Bobos, nº 0"
        isLoading={isLoading}
        onPressNo={() => {
          setFlowAlertUser(true);
          submit(false, true);
        }}
        onPressYes={() => {
          setFlowAlertUser(true);
          submit(true, true);
        }}
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
