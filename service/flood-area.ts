import { FloodAreaForm, FloodAreaImage } from '@/types/flood-area';
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

  public async getImagesByFloodAreaId(
    id: string
  ): Promise<FloodAreaImage[] | null> {
    try {
      const res = await API.get(`/flood-area/${id}/images`);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
