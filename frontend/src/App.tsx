import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { BlogPage } from './pages/BlogPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BlogPage />} path="/" />
        <Route element={<AdminLoginPage />} path="/admin/login" />
        <Route element={<AdminDashboardPage />} path="/admin" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
