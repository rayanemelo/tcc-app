import Button from '@/components/shared/Button';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from './styles';

type Props = { handleContinue: () => void; handleCancel: () => void };

const PhoneNumber = ({ handleContinue, handleCancel }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <View>
      <Text style={styles.title}>
        Para continuar, digite seu número de telefone para receber o código de
        verificação
      </Text>
      <TextInputMask
        style={styles.input}
        placeholder="(99) 99999-9999"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        maxLength={15}
        type={'custom'}
        options={{ mask: '(99) 99999-9999' }}
        placeholderTextColor="#aaa"
      />
      <View style={styles.buttonContainer}>
        <Button text="Cancelar" onPress={handleCancel} type="outline" />
        <Button
          text="Continuar"
          onPress={handleContinue}
          type="filled"
          disabled={phoneNumber.length < 15}
        />
      </View>
    </View>
  );
};

export default PhoneNumber;
