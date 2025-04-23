import { useUserLocation } from '@/hooks/useUserLocation';
import { useFloodedAreas } from '@/hooks/useFloodedAreas';
import { useEffect, useState } from 'react';
import { getDistanceInMeters } from '@/utils/functions/get-distance-in-meters';
import { useUserAccess } from '@/stores/user-access';
import { FloodArea } from '@/types/flood-area';
import { FlooadAreaService } from '@/service/flood-area';

const floodAreaService = new FlooadAreaService();

export function useUserAlertFloodedArea() {
  const { userLocation } = useUserLocation();
  const { publicFloodedAreas } = useFloodedAreas();
  const { user } = useUserAccess();

  const [openModal, setOpenModal] = useState(false);
  const [areaNearby, setAreaNearby] = useState<FloodArea | null>(null);
  const [isLoading, setIsLoading] = useState({
    yes: false,
    no: false,
  });

  const [flowAlertUser, setFlowAlertUser] = useState(false);

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

    setAreaNearby(areaNearby || null);

    setOpenModal(!!areaNearby);
  }, [userLocation, publicFloodedAreas, user.id]);

  async function changeCountFloodedArea(
    isFlooded: boolean
  ): Promise<AxiosResponse<FloodArea | null> | undefined> {
    if (isFlooded) {
      setIsLoading({ yes: true, no: false });
    } else {
      setIsLoading({ yes: false, no: true });
    }

    if (!areaNearby) return;

    let payload = {
      id: areaNearby.id,
      yesCount: areaNearby.yesCount,
      noCount: areaNearby.noCount,
    };

    if (isFlooded) {
      payload.yesCount += 1;
    } else {
      payload.noCount += 1;
    }

    setTimeout(() => {
      setIsLoading({ yes: false, no: false });
    }, 1500);

    return await floodAreaService.updateFloodAreaAlert(payload);
  }

  function closeModal() {
    setOpenModal(false);
  }

  return {
    isLoading,
    openModal,
    closeModal,
    changeCountFloodedArea,
    flowAlertUser,
    setFlowAlertUser,
  };
}
