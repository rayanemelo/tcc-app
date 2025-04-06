import { View, Text } from 'react-native';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import { styles } from './styles';
import { useUserLocation } from '@/hooks/useUserLocation';
import { useFloodedAreas } from '@/hooks/useFloodedAreas';
import { useEffect, useState } from 'react';
import { getDistanceInMeters } from '@/utils/functions/get-distance-in-meters';
import { useUserAccess } from '@/stores/user-access';

type Props = { address: string };

const UserAlertFloodedArea = ({ address }: Props) => {
  const { userLocation } = useUserLocation();
  const { publicFloodedAreas } = useFloodedAreas();
  const { user } = useUserAccess();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userLocation || publicFloodedAreas.length === 0) return;

    const areaNearby = publicFloodedAreas.find((area) => {
      const isFromSameUser = area.userId === user.id;
      const distance = getDistanceInMeters(
        userLocation.latitude,
        userLocation.longitude,
        area.latitude,
        area.longitude
      );

      return !isFromSameUser && distance <= 30;
    });

    setOpenModal(!!areaNearby);
  }, [userLocation, publicFloodedAreas, user.id]);

  return (
    <Modal isVisible={openModal}>
      <Text style={styles.title}>Esta área ainda está alagada?</Text>
      <Text style={styles.address}>{address}</Text>
      <View style={styles.buttonContainer}>
        <Button text="Não" onPress={() => {}} type="outline" />
        <Button text="Sim" onPress={() => {}} type="filled" />
      </View>
    </Modal>
  );
};

export default UserAlertFloodedArea;
