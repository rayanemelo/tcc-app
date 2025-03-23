import { API } from '@/service/api';
import { Status } from '@/types/flood-area';
import { useEffect, useState } from 'react';

interface IHistory {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
  status: Status;
  created_at: string;
  floodLevelId: number;
  createdAt: string;
}

export function useHistory() {
  const [history, setHistory] = useState<IHistory[] | []>([]);

  async function getHistory() {
    try {
      const response = await API.get('/user-history');
      setHistory(response.data);
    } catch {
      setHistory([]);
    }
  }

  const listSortedByDate = history.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    getHistory();
  }, []);

  return {
    history: listSortedByDate,
  };
}
