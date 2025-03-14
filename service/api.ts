import axios from 'axios';

export const API = axios.create({
  baseURL: `http://192.168.2.113:3332/api`,
});

export const API_GEOCODE = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/geocode/json`,
});
