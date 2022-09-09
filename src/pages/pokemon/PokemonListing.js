import React, { useEffect, useState } from "react";
// import PokemonThumb from "../../components/pokemon/PokemonThumb";
import PokemonCard from "../../components/pokemon/PokemonCard";
// import PokemonDetails from '../../components/PokemonDetails'

const PokemonListing = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const dataPokemon = await res.json();
        // console.log(dataPokemon);
        setAllPokemons((currentList) => [...currentList, dataPokemon]);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app-contaner dark: ">
      <h1 className="block text-sm font-medium dark:text-white text-black">
        My Pokedex
      </h1>
      <div>
        <form>
          <label className="block">
            <span className="block text-sm font-medium dark:text-white text-black">
              Search Pokemon
            </span>
            <input className="" />
          </label>
        </form>
      </div>
      <div className="pokemon-container">
        <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mt-10">
          {allPokemons.map((pokemonStats, index) => (
            // <PokemonThumb
            //   key={index}
            //   id={pokemonStats.id}
            //   image={pokemonStats.sprites.other.dream_world.front_default}
            //   name={pokemonStats.name}
            //   type={pokemonStats.types[0].type.name}
            // />
            <PokemonCard pokemon={pokemonStats} key={index} />
          ))}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>
          Load more
        </button>
      </div>
    </div>
  );
};

export default PokemonListing;
