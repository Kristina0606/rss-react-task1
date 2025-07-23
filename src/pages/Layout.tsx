import ErrorBoundary from '../components/ErrorBoundary';
import PokemonsNames from '../components/Results';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div>
      <ErrorBoundary>
        <header>
          <PokemonsNames />
        </header>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
