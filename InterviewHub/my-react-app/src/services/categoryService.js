import axiosClient from './axiosClient';

export const categoryService = {
  getAllCategories: (params) => {
    return axiosClient.get('/categories', { params });
  },
  getCategoryById: (id) => {
    return axiosClient.get(`/categories/${id}`);
  },
  createCategory: (data) => {
    return axiosClient.post('/categories', data);
  },
  updateCategory: (id, data) => {
    return axiosClient.put(`/categories/${id}`, data);
  },
  deleteCategory: (id) => {
    return axiosClient.delete(`/categories/${id}`);
  }
};
