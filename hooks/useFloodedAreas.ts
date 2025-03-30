import { FlooadAreaService } from '@/service/flood-area';
import { FloodArea } from '@/types/flood-area';
import { useEffect, useState } from 'react';

const floodAreaService = new FlooadAreaService();

export function useFloodedAreas() {
  const [floodedAreas, setFloodedAreas] = useState<FloodArea[]>([]);

  async function getActiveFloodArea() {
    const res = await floodAreaService.getActiveFloodArea();

    if (!res) {
      setFloodedAreas([]);
      return;
    }

    setFloodedAreas(res);
  }

  useEffect(() => {
    getActiveFloodArea();
  }, []);

  return {
    floodedAreas,
  };
}
