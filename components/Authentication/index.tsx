import { useState } from 'react';
import CustomAlert from '../shared/CustomAlert';
import PhoneNumber from './PhoneNumber';
import VerificationCode from './VerificationCode';
import { API } from '@/service/api';
import { cleanNumber } from '@/utils/functions/format-phone';
import { useAuth } from '@/context/AuthContext';
import { useUserAccess } from '@/stores/user-access';

type Props = { handleCancel: () => void; handleConfirm: () => void };

const Authentication = ({ handleCancel, handleConfirm }: Props) => {
  const { setAuthenticated } = useAuth();
  const { setUser } = useUserAccess();

  const [currentStep, setCurrentStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  const sendCode = async () => {
    try {
      const phone = cleanNumber(phoneNumber);

      const response = await API.post('/auth-user/send-sms', {
        phone,
      });

      if (response.status === 204) {
        nextStep();
      }
    } catch (e) {
      console.log('e: ', e);
    }
  };

  const verifyCode = async (code: string) => {
    try {
      const phone = cleanNumber(phoneNumber);

      const response = await API.post('/auth-user/validate-code', {
        phone,
        code,
      });

      console.log('response: ', response.data);
      if (response.status === 200) {
        const { token, user } = response.data;
        console.log('response.data: ', response.data);
        setAuthenticated(token);
        setUser(user);
        handleConfirm();
      }
    } catch (e) {
      console.log('e: ', e);
    }
  };

  const getStep = () => {
    const steps: any = {
      1: (
        <PhoneNumber
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          handleContinue={() => {
            if (phoneNumber.length >= 15) {
              sendCode();
            }
          }}
          handleCancel={handleCancel}
        />
      ),
      2: (
        <VerificationCode
          code={code}
          setCode={setCode}
          handleCancel={() => prevStep()}
          handleConfirm={() => {
            const codeStr = code.join('');
            verifyCode(codeStr);
          }}
        />
      ),
    };

    return steps[currentStep];
  };

  return <CustomAlert>{getStep()}</CustomAlert>;
};

export default Authentication;
