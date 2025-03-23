import { API } from '@/service/api';
import { FloodArea } from '@/types/flood-area';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export function useHistoryDetails() {
  const { id } = useLocalSearchParams();

  const [details, setDetails] = useState<FloodArea | null>(null);
  const [visibleImages, setVisibleImages] = useState(false);

  async function getHistoryById() {
    try {
      const response = await API.get(`/flood-area/${id}`);

      setDetails(response.data);
    } catch {
      setDetails(null);
    }
  }

  useEffect(() => {
    getHistoryById();
  }, []);

  return {
    history: details,
    visibleImages,
    setVisibleImages,
  };
}
