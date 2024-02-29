import {createBrowserRouter} from 'react-router-dom';
import Layout from '../layout/layout.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [


    ],
  },
]);
