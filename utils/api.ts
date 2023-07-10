import axios from 'axios';
//TODO: how to switch automatically exported urls based on environment development/production?

// export const baseURLStringTest = 'https://sys.kasterweb.com/api/v1';
// export const baseURLStringTest = 'http://10.0.2.2:8081/api/v1';
export const baseURLStringTest = 'http://192.168.0.52:8081/api/v1';
// export const baseURLStringTest = 'https://test.kastershop.com.br/api/v1';
export const baseURLStringProduction = 'https://my.kastershop.com.br/api/v1';

export const baseURLAppTest = axios.create({
  baseURL: baseURLStringTest + '/app',
});

export const baseURLAppProduction = axios.create({
  baseURL: baseURLStringProduction + '/app',
});

export const baseURLTest = axios.create({
  baseURL: baseURLStringTest,
});

export const baseURLProduction = axios.create({
  baseURL: baseURLStringTest,
});
