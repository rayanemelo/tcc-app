import { API } from '@/service/api';
import { useEffect, useState } from 'react';

export interface IFAQ {
  id: number;
  question: string;
  answer: string;
  createdAt: string;
}

export function useFaqs() {
  const [faqs, setFaqs] = useState<IFAQ[] | []>([]);
  const [error, setError] = useState<unknown | null>(null);

  const fetchFaqs = async () => {
    try {
      const response = await API.get('/faq');
      setFaqs(response.data);
    } catch (err: unknown) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  return {
    faqs,
    error,
  };
}
