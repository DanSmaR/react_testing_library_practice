import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

function getPokemonData({
  id, name, type, averageWeight: { value, measurementUnit }, image }) {
  return {
    id,
    name,
    type,
    averageWeight: `Average weight: ${value} ${measurementUnit}`,
    image,
  };
}

const { id, name, type, averageWeight, image } = getPokemonData(pokemons[0]);

describe('Testando o componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
  });

  describe('Testando as informações detalhadas do pokemon selecionado', () => {
    test(`se a página contém um texto <name> Details, onde 
    <name> é o nome do pokémon`, () => {
      expect(screen.getByRole('heading', { level: 2, name: `${name} Details` }))
        .toBeInTheDocument();
    });

    test('se não há um link de navegação para os detalhes do pokémon selecionado', () => {
      expect(screen.queryByRole('link', { name: 'More details' }))
        .not.toBeInTheDocument();
    });

    test('se a seção de detalhes contém um heading h2 com o texto \'Summary\'', () => {
      expect(screen.getByRole('heading', { name: /summary/i }))
        .toBeInTheDocument();
    });
  });
});
