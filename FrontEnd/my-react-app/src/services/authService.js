import axiosClient from './axiosClient';

export const authService = {
  register: (data) => {
    return axiosClient.post('/auth/register', data);
  },
  login: (data) => {
    return axiosClient.post('/auth/login', data);
  },
  getAccount: () => {
    return axiosClient.get('/auth/account');
  }
};
