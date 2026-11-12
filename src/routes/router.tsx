import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'
import PublicLayout from '@/layouts/PublicLayout'

import CourseCreatePage from '@/pages/admin/CourseCreatePage'
import CourseEditPage from '@/pages/admin/CourseEditPage'
import CourseLecturesPage from '@/pages/admin/CourseLecturesPage'
import DashboardPage from '@/pages/admin/DashboardPage'
import CourseDetailsPage from '@/pages/public/CourseDetailsPage'
import CoursesPage from '@/pages/public/CoursesPage'
import HomePage from '@/pages/public/HomePage'
import LecturePage from '@/pages/public/LecturePage'
import NotFoundPage from '@/pages/public/NotFoundPage'
import Login from '@/pages/auth/LoginPage'
import Register from '@/pages/auth/RegisterPage'

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/:courseId', element: <CourseDetailsPage /> },
      {
        path: 'courses/:courseId/lectures/:lectureId',
        element: <LecturePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      
      {
        path:'login', Component:Login
      },
      {
        path:'register', Component:Register
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'courses/new', element: <CourseCreatePage /> },
      { path: 'courses/:courseId/edit', element: <CourseEditPage /> },
      {
        path: 'courses/:courseId/lectures',
        element: <CourseLecturesPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
