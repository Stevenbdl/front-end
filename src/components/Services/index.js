import axios from 'axios';

export const baseURL = axios.create({
  baseURL: 'http://localhost:1323/',
});


export * from './customers';
export * from './attributes';