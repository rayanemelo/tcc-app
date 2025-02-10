import Button from '@/components/shared/Button';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

type Props = {
  handleContinue: () => void;
};

const PhoneNumber = ({handleContinue}: Props) => {
const [phoneNumber, setPhoneNumber] = useState('');

return (
  <View>
    <Text style={styles.title}>Para continuar, digite seu número de telefone para receber o código de verificação</Text>
    <TextInputMask
      style={styles.input}
      placeholder="(99) 99999-9999"
      value={phoneNumber}
      onChangeText={setPhoneNumber}
      keyboardType="phone-pad"
      maxLength={15}  
      type={'custom'}
      options={{
        mask: '(99) 99999-9999',
      }}
      placeholderTextColor="#aaa" 
    />
    <View style={styles.buttonContainer}>
      <Button
        text="Cancelar"
        onPress={() => { }}
        type='outline' 
      />
      <Button
        text="Continuar"
        onPress={handleContinue}
        type='filled'
      />
    </View>
  </View>
);
};

const styles = StyleSheet.create({
title: {
  fontSize: 16,
  marginBottom: 20,
  textAlign: 'center',
},
input: {
  width: '100%',
  height: 50,
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 5,
  paddingHorizontal: 10,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  width: '100%',
  gap: 10,
},
});

export default PhoneNumber;