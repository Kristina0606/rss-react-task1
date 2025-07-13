// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import Results from './components/results';
import SearchBar from './components/top-controls';

function App() {
  return (
    <>
      <header>
        <SearchBar />
      </header>
      <main>
        <Results />
      </main>
    </>
  );
}

export default App;
