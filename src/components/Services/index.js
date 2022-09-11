import axios from 'axios';

export const baseURL = axios.create({
  baseURL: 'http://localhost:<port>',
});


export * from './customers';
export * from './attributes';