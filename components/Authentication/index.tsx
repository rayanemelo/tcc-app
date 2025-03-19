import CustomAlert from '../shared/CustomAlert';
import PhoneNumber from './PhoneNumber';
import VerificationCode from './VerificationCode';
import { useAuthComponent } from '@/hooks/useAuthComponent';

type Props = { handleCancel: () => void; handleConfirm: () => void };

const Authentication = ({ handleCancel, handleConfirm }: Props) => {
  const {
    form,
    setForm,
    prevStep,
    authService,
    currentStep,
    handleContinue,
    handleConfirmCode,
  } = useAuthComponent();

  const getStep = () => {
    const steps: Record<number, JSX.Element> = {
      1: (
        <PhoneNumber
          form={form}
          setForm={setForm}
          handleContinue={() => {
            if (form.phone.length >= 11) {
              handleContinue();
            }
          }}
          handleCancel={handleCancel}
        />
      ),
      2: (
        <VerificationCode
          form={form}
          setForm={setForm}
          handleCancel={() => prevStep()}
          handleConfirm={async () => {
            await handleConfirmCode();

            await handleConfirm();
          }}
          handleResend={async () => {
            await authService.sendCode(form.phone);
          }}
        />
      ),
    };

    return steps[currentStep];
  };

  return <CustomAlert>{getStep()}</CustomAlert>;
};

export default Authentication;
