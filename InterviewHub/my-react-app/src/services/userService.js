import axiosClient from './axiosClient';

export const userService = {
  getAllUsers: (params) => {
    return axiosClient.get('/users', { params });
  },
  getUserById: (id) => {
    return axiosClient.get(`/users/${id}`);
  },
  createUser: (data) => {
    return axiosClient.post('/users', data);
  },
  updateUser: (id, data) => {
    return axiosClient.put(`/users/${id}`, data);
  },
  deleteUser: (id) => {
    return axiosClient.delete(`/users/${id}`);
  }
};
