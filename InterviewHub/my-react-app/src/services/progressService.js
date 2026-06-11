import axiosClient from './axiosClient';

export const progressService = {
  markQuestionStatus: (data) => {
    return axiosClient.post('/progress', data);
  },
  getUserProgress: (params) => {
    return axiosClient.get('/progress', { params });
  }
};
