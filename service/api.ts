import axios from 'axios';

export const API = axios.create({
  baseURL: `http://192.168.2.113:3333/api`,
});

export const API_GEOCODE = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/geocode/json`,
});
