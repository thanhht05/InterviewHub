import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import UserManagement from '../pages/Admin/UserManagement/UserManagement';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/users" replace />} />
    </Routes>
  );
};

export default AppRoutes;
