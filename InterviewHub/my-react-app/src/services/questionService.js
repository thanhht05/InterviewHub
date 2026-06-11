import axiosClient from './axiosClient';

export const questionService = {
  getAllQuestions: (params) => {
    return axiosClient.get('/questions', { params });
  },
  getQuestionById: (id) => {
    return axiosClient.get(`/questions/${id}`);
  },
  createQuestion: (data) => {
    return axiosClient.post('/questions', data);
  },
  updateQuestion: (id, data) => {
    return axiosClient.put(`/questions/${id}`, data);
  },
  deleteQuestion: (id) => {
    return axiosClient.delete(`/questions/${id}`);
  }
};
