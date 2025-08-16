'use client';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('../../pages/HomePage'), { ssr: false });

export function ClientOnly() {
  return <App />;
}
