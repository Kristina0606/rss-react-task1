import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import Layout from './pages/Layout';
import NotFound from './pages/NotFoundPage';
import { ClipLoader } from 'react-spinners';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      HydrateFallback: () => (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader loading={true} size={50} />
        </div>
      ),
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: '/about',
          element: <AboutPage />,
        },
      ],
    },
  ],
  {
    basename: '/rss-react-task1/',
  }
);

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
