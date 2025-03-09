import { API } from '@/service/api';
import { useEffect, useState } from 'react';

export interface INotification {
  id: number;
  content: string;
  createdAt: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<INotification[] | []>([]);

  const fetchNotifications = async () => {
    try {
      const response = await API.get('/notification');
      setNotifications(response.data);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
  };
}
