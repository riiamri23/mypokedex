import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetail () {
  const [pokemon, setPokemon] = useState({});

  let params = useParams();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.name}`
      );

      const dataPokemon = await res.json();
      console.log(dataPokemon);

      setPokemon((prevState) => dataPokemon);
    };
    getPokemon();
    // console.log(pokemon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return Object.keys(pokemon).length !== 0 ? (
    <PokemonDetailContainer pokemon={pokemon} />
  ) : (
    <h1>loading...</h1>
  );
};

const PokemonDetailContainer = ({pokemon})=>{
    return (<div>
        <div>
            <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon?.name} className="h-48 w-48" width="50" height="50" preserveAspectRatio="xMidYMid meet" />
            <h1>{pokemon?.name}</h1>
            <div className="flex m-auto">
                {pokemon.types.map((type, index)=>{
                    return (<span className={`${type?.type?.name}-type text-xl px-3 py-1 mx-1 rounded capitalize`} key={index}>{type?.type?.name}</span>);
                })}
            </div>
            <div>
                <div>
                    <h3>5.25kg</h3>
                    <h3>Weight</h3>
                </div>
                <div>
                    <h3>5.25kg</h3>
                    <h3>height</h3>
                </div>
            </div>
        </div>
    </div>);
}
