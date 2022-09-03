import React, { useEffect } from 'react';
import PokemonListing from './pages/pokemon/PokemonListing';

function App() {
  useEffect(() => {
    document.body.classList.add('bg-white');
    document.body.classList.add('dark:bg-black');
    document.body.classList.add('transition-colors');
    document.body.classList.add('duration-300');
    //  
  
    return function cleanup() {
      document.body.classList.remove('bg-white');
      document.body.classList.remove('dark:bg-black');
      document.body.classList.remove('transition-colors');
      document.body.classList.remove('duration-300');
    };
  }, []);
 
  return (
      <PokemonListing />
  );
}

export default App;
