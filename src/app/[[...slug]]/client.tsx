'use client';

import dynamic from 'next/dynamic';
import ProviderClient from '../provider';

const App = dynamic(() => import('../../pages/HomePage'), { ssr: false });

export function ClientOnly() {
  return (
    <ProviderClient>
      <App />
    </ProviderClient>
  );
}
