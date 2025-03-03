import { API } from '@/service/api';
import { useEffect, useState } from 'react';

export interface INotification {
  id: number;
  content: string;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[] | []>([]);
  const [error, setError] = useState<unknown | null>(null);

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notification');
      setNotifications(response.data);
    } catch (err: unknown) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    error,
  };
}
