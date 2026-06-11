import axiosClient from './axiosClient';

export const roleService = {
  getAllRoles: () => {
    return axiosClient.get('/roles');
  },
  getRoleById: (id) => {
    return axiosClient.get(`/roles/${id}`);
  },
  createRole: (data) => {
    return axiosClient.post('/roles', data);
  },
  updateRole: (id, data) => {
    return axiosClient.put(`/roles/${id}`, data);
  },
  deleteRole: (id) => {
    return axiosClient.delete(`/roles/${id}`);
  }
};
