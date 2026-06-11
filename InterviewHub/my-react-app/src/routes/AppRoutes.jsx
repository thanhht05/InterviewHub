import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import UserManagement from '../pages/Admin/UserManagement/UserManagement';

import CategoryManagement from '../pages/Admin/CategoryManagement/CategoryManagement';
import QuestionManagement from '../pages/Admin/QuestionManagement/QuestionManagement';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="questions" element={<QuestionManagement />} />
      </Route>
      <Route path="/" element={<Navigate to="/admin/users" replace />} />
    </Routes>
  );
};

export default AppRoutes;
