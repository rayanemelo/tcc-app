import { FloodLevel } from './flood-level';

export type FloodArea = {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  level: FloodLevel;
  createdAt: string;
  images: string[];
};

export type FloodAreaForm = {
  image: string;
  address: string;
  longitude: number | string;
  latitude: number | string;
  status: string; //'pending' | 'approved' | 'rejected';
  floodLevelId: number;
};
