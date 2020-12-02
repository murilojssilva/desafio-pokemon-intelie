import React, { useEffect, useState ,useCallback} from "react";

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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign             : 'center'
  }
};

export default function PokeList() {
    const [pokemons, setPokemons] = useState([]);
    const [pokemon,setPokemon] = useState([]);
    const [total,setTotal] = useState(0);
    const [limit,setLimit] = useState(50);
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalIsOpen,setIsOpen] = useState(false);
    
    useEffect(() => {
        async function fetchPokemons() {
          const response = await api.get(
            `/pokemon?offset=${currentPage}&limit=${limit}`
          );
          console.log(currentPage);
          setTotal(response.data.count);
          const totalPages = Math.ceil(total / limit);
          const arrayPages = [];
          for (let i = 1; i <= totalPages; i++) {
            arrayPages.push(i);
          }
          setPages(arrayPages);
          setPokemons(response.data.results);
        }
        fetchPokemons();
      }, [currentPage,total,limit]);
    async function openModal(index) {
        setIsOpen(true);
        const responseId = await api.get(`/pokemon/${index+1}`);
        setPokemon(responseId.data);
    }
     
      function closeModal(){
        setIsOpen(false);
      }
      const limits = useCallback((e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
      }, []);
        
    return (
        <Container>
            <h1>Lista dos Pokémons</h1>
            <select onChange={limits}>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
            <ul>
            {pokemons.map((pokemon,index) => (
                <PTable value={index} key={index} onClick={() => openModal(index)}>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
                        .replace("https://pokeapi.co/api/v2/pokemon/", "")
                        .replace("/", ".png")}`}
                        alt={pokemon.name}
                    />
                    <h3>{pokemon.name}</h3>
                </PTable>
                ))}
            </ul>
            
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
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
