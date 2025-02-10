import { useState } from "react";
import CustomAlert from "../shared/CustomAlert";
import PhoneNumber from "./PhoneNumber";
import VerificationCode from "./VerificationCode";

const Authentication = () => {
  const [currentStep, setCurrentStep] = useState(1)

  function nextStep() {
    setCurrentStep(currentStep + 1)
  }

  function prevStep() { 
    setCurrentStep(currentStep - 1)
  }

  const getStep = () => {
    const steps: any = {
      1: <PhoneNumber handleContinue={() => nextStep()} />,
      2: <VerificationCode handleCancel={() => prevStep()} />,
    }

    return steps[currentStep]
  }

  return (
    <CustomAlert>
      {getStep()}
    </CustomAlert>
  );
}

export default Authentication;
