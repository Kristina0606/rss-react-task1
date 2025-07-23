import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Layout from './pages/Layout';
import NotFound from './pages/NotFoundPage';
import { pokemonLoader } from './components/Results';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      loader: pokemonLoader,
      HydrateFallback: () => <p>HydrateFallback...</p>,
    },
  ],
  {
    basename: '/rss-react-task1',
  }
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
