import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import UserManagement from '../pages/Admin/UserManagement/UserManagement';

import CategoryManagement from '../pages/Admin/CategoryManagement/CategoryManagement';
import QuestionManagement from '../pages/Admin/QuestionManagement/QuestionManagement';

import MainLayout from '../layouts/MainLayout/MainLayout';
import HomePage from '../pages/Public/HomePage/HomePage';
import CategoryDetailPage from '../pages/Public/CategoryDetail/CategoryDetailPage';
import QuestionDetailPage from '../pages/Public/QuestionDetail/QuestionDetailPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="categories/:id" element={<CategoryDetailPage />} />
        <Route path="questions/:id" element={<QuestionDetailPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="users" replace />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="questions" element={<QuestionManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
