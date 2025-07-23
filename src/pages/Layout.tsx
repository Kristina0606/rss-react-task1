import ErrorBoundary from '../components/ErrorBoundary';
import PokemonsNames2 from '../components/Results';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {
  return (
    <div>
      <ErrorBoundary>
        <header>
          <PokemonsNames2 />
        </header>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
