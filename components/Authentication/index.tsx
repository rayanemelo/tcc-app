import { useState } from 'react';
import CustomAlert from '../shared/CustomAlert';
import PhoneNumber from './PhoneNumber';
import VerificationCode from './VerificationCode';

type Props = { handleCancel: () => void; handleConfirm: () => void };

const Authentication = ({ handleCancel, handleConfirm }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  const getStep = () => {
    const steps: any = {
      1: (
        <PhoneNumber
          handleContinue={() => nextStep()}
          handleCancel={handleCancel}
        />
      ),
      2: (
        <VerificationCode
          handleCancel={() => prevStep()}
          handleConfirm={handleConfirm}
        />
      ),
    };

    return steps[currentStep];
  };

  return <CustomAlert>{getStep()}</CustomAlert>;
};

export default Authentication;
