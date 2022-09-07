import React from 'react';
import { Link } from "react-router-dom";

const PokemonCard = ({pokemon}) =>{
    // console.log(pokemon);
    const containerStyle = pokemon?.types[0]?.type?.name + "-Bgcolor px-10 pb-5 my-10";
    return (
        <Link to={`/detail/${pokemon?.name}`} className={containerStyle}>
            {/* <div > */}
                <div className="relative -mt-20">
                    <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon?.name} className="h-48 w-48 mx-auto " width="50" height="50" preserveAspectRatio="xMidYMid meet" />
                </div>

                <div className="mb-2">
                    <h3 className="p text-2xl capitalize">{pokemon?.name}</h3>
                    <p className="p text-xl capitalize">#{pokemon?.id}</p>
                </div>
                <div className="flex m-auto">
                    {pokemon.types.map((type, index)=>{
                        return (<span className={`${type?.type?.name}-type text-xl px-3 py-1 mx-1 rounded capitalize`} key={index}>{type?.type?.name}</span>);
                    })}
                </div>
            {/* </div> */}
        </Link>
    );
}

export default PokemonCard;