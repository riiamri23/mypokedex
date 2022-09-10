import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState({});

  let params = useParams();

  useEffect(() => {
    const getPokemon = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${params.name}`
      );

      const dataPokemon = await res.json();

      const resSpecies = await fetch(
        dataPokemon.species.url
      );
      dataPokemon.resSpecies = await resSpecies.json();

      const resEvo = await fetch(
        dataPokemon.resSpecies.evolution_chain.url
      );
      dataPokemon.evolution = await resEvo.json();

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
}

const PokemonDetailContainer = ({ pokemon }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="block py-10">
        <h1 className="text-4xl dark:text-white text-black">
          #{pokemon?.id} - {pokemon?.name.toUpperCase()}
        </h1>
      </div>
      <div className="flex flex-row gap-4">
        <div>
          <div className="dark:bg-white bg-slate-200 py-10 max-w-sm rounded-lg my-5">
            <img
              src={pokemon?.sprites?.other?.dream_world?.front_default}
              alt={pokemon?.name}
              className="h-48 w-48 mx-auto"
              width="50"
              height="50"
              preserveAspectRatio="xMidYMid meet"
            />
          </div>
          <div className="dark:bg-white bg-slate-200 rounded-lg max-w-sm p-5 my-5">
            <h3>
              Type:{" "}
              {pokemon?.types?.map((type, index) => {
                return (
                  <span
                    className={`${type?.type?.name}-type text-xl px-3 py-1 mx-1 rounded capitalize`}
                    key={index}
                  >
                    {type?.type?.name}
                  </span>
                );
              })}
            </h3>
          </div>
          <div className="flex flex-row max-w-sm">
            <div className="dark:bg-white bg-slate-200 rounded p-2 mx-4 my-5">
              <h3>Height: {pokemon?.height / 10} m</h3>
            </div>
            <div className="dark:bg-white bg-slate-200 rounded p-2 mx-4 my-5">
              <h3>Weight: {pokemon?.weight / 10} kg</h3>
            </div>
          </div>
          <div className="dark:bg-white bg-slate-200 max-w-sm rounded-lg p-5 my-5">
            <h3>Attribute</h3>
            <div className="">
              {pokemon?.stats?.map((stat, index) => {
                return (
                  <div className="px-2" key={index}>{`${
                    stat.base_stat
                  } ${stat.stat.name.toUpperCase()}`}</div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <div className="dark:bg-white bg-slate-200 p-5 max-w-sm rounded-lg my-5">
            <h3>Evolution</h3>
            <div>
              <EvolutionComponent evoChain={pokemon?.evolution?.chain} species={pokemon?.evolution?.chain?.species} />
            </div>
          </div>
          <div className="dark:bg-white bg-slate-200 p-5 max-w-sm rounded-lg my-5">
            <h3>Description</h3>
            <p>{pokemon?.resSpecies?.flavor_text_entries?.[0].flavor_text}</p>
          </div>
        </div>
      </div>

      {/* <div className="mx-auto flex flex-col items-center">
            <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon?.name} className="h-48 w-48" width="50" height="50" preserveAspectRatio="xMidYMid meet" />
            <h1>{pokemon?.name}</h1>
            <div className="flex m-auto">
                {pokemon.types.map((type, index)=>{
                    return (<span className={`${type?.type?.name}-type text-xl px-3 py-1 mx-1 rounded capitalize`} key={index}>{type?.type?.name}</span>);
                })}
            </div>
            <div className="flex flex-row">
                <div>
                    <h3>5.25kg</h3>
                    <h3>Weight</h3>
                </div>
                <div>
                    <h3>5.25kg</h3>
                    <h3>height</h3>
                </div>
            </div>
        </div> */}
    </div>
  );
};

const EvolutionComponent = ({ evoChain, species }) => {

  
  // console.log(evoChain);
  // return evoChain !== undefined ? evoChain?.evolves_to?.map((evo, index)=>{
  //   return (<div key={index}>
  //     <div>{evo?.species?.name}</div>{evo !== undefined ?<EvolutionComponent evoChain={evo} />: false}
  //   </div>);
  // }) : false;
  return (<div>
    {species !== undefined ? <div>{species?.name}</div> : <></>}
    {evoChain?.evolves_to?.length > 0 ? evoChain?.evolves_to?.map((evo, index)=>{
        return (<div key={index}>
          <div>{evo?.species?.name}</div>{evo !== undefined ?<EvolutionComponent evoChain={evo} />: false}
        </div>);
    }): false}
  </div>);
};
