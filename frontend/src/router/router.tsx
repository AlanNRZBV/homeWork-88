import {createBrowserRouter} from 'react-router-dom';
import Layout from '../layout/layout.tsx';
import Threads from "../features/Threads/Threads.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path:'/',
        element:<Threads/>
      }

    ],
  },
]);
