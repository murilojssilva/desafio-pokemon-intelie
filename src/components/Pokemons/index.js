import React from 'react';

export default function Pokemons ({ pokemons, openModal }) {
    return (
    <ul className='list-group mb-4'>
    {pokemons.map((pokemon,index) => (
        <div value={index} className="pokemon" key={index} onClick={() => openModal(index)}>
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                .replace("https://pokeapi.co/api/v2/pokemon/", "")
                .replace("/", ".png")}`}
                alt={pokemon.name}
            />
            <button value={index} onClick={() => openModal(index)}>Ver detalhes</button>
        </div>
        ))}
    </ul>
  );
};
