import Button from '@/components/shared/Button';
import { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type Props = { handleCancel: () => void; handleConfirm: () => void };

const VerificationCode = ({ handleCancel, handleConfirm }: Props) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [countdown, setCountdown] = useState(60);
  const [isCounting, setIsCounting] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
      setCountdown(60); // Reseta o countdown
    }

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar
  }, [isCounting, countdown]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.replace(/\D/g, '');
    setCode(newCode);

    // Move para o próximo campo se o dígito for preenchido
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus(); // Foca no próximo campo
    }
  };

  const handleResend = () => {
    console.log('Código reenviado');
    setIsCounting(true);
  };

  return (
    <View>
      <Text style={styles.title}>
        Enviaremos um código de 6 dígitos para o número informado
      </Text>
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.input}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <View>
        <Text style={styles.resendText}>Não recebeu?</Text>
        <TouchableOpacity onPress={handleResend} disabled={isCounting}>
          <Text style={styles.resendText}>
            {isCounting
              ? `Tentar novamente em ${countdown} segundos`
              : 'Tentar novamente'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button text="Cancelar" onPress={handleCancel} type="outline" />
        <Button
          text="Confirmar"
          onPress={handleConfirm}
          type="filled"
          disabled={code.includes('')}
        />
      </View>
    </View>
  );
};

export default VerificationCode;
