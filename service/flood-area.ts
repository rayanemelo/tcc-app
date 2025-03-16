import { FloodAreaForm } from '@/types/flood-area';
import { API } from './api';

export class FlooadAreaService {
  public async sendFlooadArea(payload: FloodAreaForm) {
    try {
      return await API.post('/flood-area', payload);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
