import axiosClient from './axiosClient';

export const progressService = {
  markQuestionStatus: (data) => {
    return axiosClient.post('/progress', data);
  },
  getUserProgress: (params) => {
    return axiosClient.get('/progress', { params });
  },
  getQuestionProgress: (questionId) => {
    return axiosClient.get(`/progress/${questionId}`);
  },
  getLearnedQuestionsByCategory: (categoryId, params) => {
    return axiosClient.get(`/progress/category/${categoryId}/learned`, { params });
  }
};
