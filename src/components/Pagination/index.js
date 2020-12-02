import React from 'react'

export default function Pagination({pokemonsPerPage,totalPokemons,paginate}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++){
        pageNumbers.push[i];
    }
    return (
        <ul>
            {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                    <a onClick={() => paginate(number)} href="!#" className="page-link">
                        {number}
                    </a>
                </li>
            ))}
            
        </ul>
        
    )
}
