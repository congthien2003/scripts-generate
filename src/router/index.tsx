import { createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from '@/pages/error/ErrorPage';
import { ScriptLayout } from '@/shared/components/ScriptLayout';
import { NotificationGenerator } from '@/features/sql/notification/NotificationGenerator';
import { ImproveSqlGenerator } from '@/features/prompt/improve-sql/ImproveSqlGenerator';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ScriptLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/sql/notification" replace />,
      },
      // SQL Generators
      {
        path: 'sql/notification',
        element: <NotificationGenerator />,
      },
      // Prompt Generators
      {
        path: 'prompt/improve-sql',
        element: <ImproveSqlGenerator />,
      },
    ],
  },
]);

export default router;
