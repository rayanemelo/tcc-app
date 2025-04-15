import { FlooadAreaService } from '@/service/flood-area';
import { useEffect, useState } from 'react';
import { useUserLocation } from './useUserLocation';
import { useFloodedAreas } from './useFloodedAreas';
import { getDistanceInMeters } from '@/utils/functions/get-distance-in-meters';
import { useUserAccess } from '@/stores/user-access';
import { FloodArea } from '@/types/flood-area';

const floodAreaService = new FlooadAreaService();

export function useUserAlertFloodedArea() {
  const { userLocation } = useUserLocation();
  const { user } = useUserAccess();
  const { publicFloodedAreas } = useFloodedAreas();

  const [openAlertUser, setOpenAlertUser] = useState(false);
  const [areaNearby, setAreaNearby] = useState<FloodArea | null>(null);
  const [isFlooded, setIsFlooded] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState({
    yes: false,
    no: false,
  });

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

    if (areaNearby) setAreaNearby(areaNearby);

    setOpenAlertUser(!!areaNearby);
  }, [userLocation, publicFloodedAreas, user]);

  function closeAlert() {
    setOpenAlertUser(false);
  }

  function verifyLoading() {
    if (isFlooded) {
      setIsLoading((prevState) => ({ ...prevState, yes: true }));
    } else {
      console.log('estou aqui');
      setIsLoading((prevState) => ({ ...prevState, no: true }));
    }
  }

  async function updateFloodAreaByUser(): Promise<
    AxiosResponse<FloodArea | null>
  > {
    verifyLoading();

    if (!areaNearby) {
      return {
        status: 401,
        data: null,
      };
    }

    setOpenAlertUser(false);

    let payload = {
      id: areaNearby.id,
      yesCount: areaNearby.yesCount,
      noCount: areaNearby.noCount,
    };

    if (isFlooded) {
      payload = {
        ...payload,
        yesCount: areaNearby.yesCount + 1,
      };
    } else {
      payload = {
        ...payload,
        noCount: areaNearby.noCount + 1,
      };
    }

    return {
      data: null,
      status: 200,
    };
    const res = await floodAreaService.updateFloodAreaAlert(payload);
    setIsLoading({
      yes: false,
      no: false,
    });
  }

  return {
    isLoading,
    openAlertUser,
    closeAlert,
    setIsFlooded,
    updateFloodAreaByUser,
  };
}
