import { Metadata } from 'next';
import React from 'react';
import ProviderClient from './provider';

export const metadata: Metadata = {
  title: 'My Pokemon App',
  description: 'My new Pokemon App with next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body>
        <ProviderClient>{children}</ProviderClient>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  );
}
