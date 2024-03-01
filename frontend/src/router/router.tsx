import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Threads from '../features/Threads/Threads.tsx';
import Register from '../features/Users/Register.tsx';
import Login from '../features/Users/Login.tsx';
import ThreadWithComments from '../features/Threads/components/ThreadWithComments.tsx';
import NotFound from '../components/UI/NotFound/NotFound.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Threads />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/threads/:id',
        element: <ThreadWithComments />,
      },
      {
        path: '/*',
        element: <NotFound />,
      },
    ],
  },
]);
