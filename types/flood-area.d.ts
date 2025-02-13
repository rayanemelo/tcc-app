import { FloodLevel } from './flood-level';

export type FloodArea = {
  id: number;
  latitude: number;
  longitude: number;
  address: string;
  level: FloodLevel;
  createdAt: string;
};
