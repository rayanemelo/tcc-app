import { useAuth } from '@/context/AuthContext';
import { AuthService } from '@/service/auth-service';
import { useUserAccess } from '@/stores/user-access';
import { useState } from 'react';

export function useAuthComponent() {
  const { setAuthenticated } = useAuth();

  const authService = new AuthService();

  const { setUser } = useUserAccess();

  const [currentStep, setCurrentStep] = useState(1);

  const [form, setForm] = useState({
    phone: '',
    code: ['', '', '', '', '', ''],
  });

  function nextStep() {
    setCurrentStep(currentStep + 1);
  }

  function prevStep() {
    setCurrentStep(currentStep - 1);
  }

  async function handleContinue() {
    const res = await authService.sendCode(form.phone);

    if (res?.status === 204) {
      nextStep();
    }
  }

  async function handleConfirmCode() {
    const codeStr = form.code.join('');
    const response = await authService.verifyCode(form.phone, codeStr);

    if (response?.status === 200) {
      const { token, user } = response.data;
      setAuthenticated(token);
      setUser(user);
    }
  }

  return {
    currentStep,
    form,
    setForm,
    handleContinue,
    handleConfirmCode,
    prevStep,
    authService,
  };
}
