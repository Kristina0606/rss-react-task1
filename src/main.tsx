import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Layout from './pages/Layout';
import NotFound from './pages/NotFoundPage';
import { pokemonsNamesLoader } from './components/Results';
import SearchBar, { pokemonLSLoader } from './components/Top-controls';
import { ClipLoader } from 'react-spinners';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      loader: pokemonsNamesLoader,
      HydrateFallback: () => (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader loading={true} size={50} />
        </div>
      ),
      children: [
        {
          index: true,
          element: <SearchBar />,
          loader: pokemonLSLoader,
        },
      ],
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
