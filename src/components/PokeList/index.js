import React, { useEffect, useState } from "react";

import api from "../../services/api";

import {
    Container,
    PTable,
    Pagination,
    PaginationButton,
    PaginationItem,
    Close
  } from "./styles";

import CloseIcon from "@material-ui/icons/Close";
import Modal from 'react-modal';

import "react-pagination-library/build/css/index.css"; 

export default function PokeList() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon,setPokemon] = useState([]);
    const total = 20;
    const limit = 10;
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen,setIsOpen] = useState(false);
    
    useEffect(() => {
        async function fetchPokemons() {
          const response = await api.get(
            `/pokemon?page=${currentPage}&limit=${limit}`
          );
          
          const totalPages = Math.ceil(total / limit);
    
          const arrayPages = [];
            for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
        }
    
          setPages(arrayPages);
          setPokemons(response.data.results);
        }
        fetchPokemons();
      }, [currentPage, limit, total]);
        
      

      async function openModal(index) {
        setIsOpen(true);
        const responseId = await api.get(`/pokemon/${index+1}`);
        setPokemon(responseId.data);
    }
     
     
      function closeModal(){
        setIsOpen(false);
      } 
   
          
    return (
        <Container>
            <h1>Lista dos Pokémons</h1>
            
            <ul>
            {pokemons.map((pokemon,index) => (
                <PTable value={index} key={index} onClick={() => openModal(index)}>
                    <h3>{pokemon.name}</h3>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", ".png")}`}
                        alt={pokemon.name}
                    />
                    <button value={index} onClick={() => openModal(index)}>Ver detalhes</button>
                </PTable>
                ))}
            </ul>
            
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
        >
          <Close onClick={closeModal}>
              <CloseIcon style={{ fill: "black", fontSize: 32 }} />
          </Close>
          <h1>{pokemon.name}</h1>
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            />
            <p><strong>Altura</strong>: {pokemon.height} cm</p>
            <p><strong>Peso</strong>: {pokemon.weight} kg</p>

        </Modal>
        <Pagination>
        <PaginationButton>
          {currentPage > 1 && (
            <PaginationItem onClick={() => setCurrentPage(currentPage - 1)}>
              Anterior
            </PaginationItem>
          )}
          {pages.map((page) => (
            <PaginationItem
              isSelect={page === currentPage}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length && (
            <PaginationItem onClick={() => setCurrentPage(currentPage + 1)}>
              Próxima
            </PaginationItem>
          )}
        </PaginationButton>
      </Pagination>
        
    </Container>
    )
}
