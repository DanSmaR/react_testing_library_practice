import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

function getPokemonData({
  name, foundAt, summary }) {
  return {
    name,
    foundAt,
    summary,
  };
}

const { name, foundAt, summary } = getPokemonData(pokemons[0]);

const nameTestId = 'pokemon-name';
const linkDetailsName = 'More details';

function getLink(linkName) {
  return screen.queryByRole('link', { name: linkName });
}

function checkIsFavorite(bool, testId) {
  if (bool) {
    expect(screen.getAllByTestId(testId)).toHaveLength(1);
  } else {
    expect(screen.queryAllByTestId(testId)).toHaveLength(0);
  }
}

function toggleFavoritePokemon() {
  userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
  return screen.queryByRole('img', { name: `${name} is marked as favorite` });
}

describe('Testando o componente PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(getLink(linkDetailsName));
  });

  describe('Testando as informações detalhadas do pokemon selecionado', () => {
    test(`se a página contém um texto <name> Details, onde 
    <name> é o nome do pokémon`, () => {
      expect(screen.getByRole('heading', { level: 2, name: `${name} Details` }))
        .toBeInTheDocument();
    });

    test('se não há um link de navegação para os detalhes do pokémon selecionado', () => {
      expect(getLink(linkDetailsName))
        .not.toBeInTheDocument();
    });

    test('se a seção de detalhes contém um heading h2 com o texto \'Summary\'', () => {
      expect(screen.getByRole('heading', { name: /summary/i }))
        .toBeInTheDocument();
    });

    test(`se há um parágrafo com o resumo do pokémon 
    específico sendo visualizado`, () => {
      console.log(summary);
      expect(screen.getByText(summary)).toBeInTheDocument();
    });
  });

  describe('Testando a seção com os mapas', () => {
    test(`se há uma heading h2 com o texto (Game Locations of <name>); 
    onde <name> é o nome do pokémon exibido`, () => {
      expect(screen
        .getByRole('heading', { level: 2, name: `Game Locations of ${name}` }))
        .toBeInTheDocument();
    });

    test('se as localizações do pokemon são mostradas na tela', () => {
      foundAt.forEach(({ location, map }, index) => {
        expect(screen.getAllByRole('img', { name: `${name} location` })[index])
          .toHaveAttribute('src', map);
        expect(screen.getByText(location)).toBeInTheDocument();
      });
    });
  });

  describe('Testando a opção de selecionar o pokemon como favorito', () => {
    test('se possui um checkbox que permite favoritar o pokemon', () => {
      expect(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }))
        .toBeInTheDocument();
    });

    test(`se cliques alternados no checkbox adiciona e remove, respectivamente,
    o pokemon da lista de favoritos`, () => {
      let isFavorite = toggleFavoritePokemon();
      userEvent.click(getLink('Favorite Pokémons'));
      checkIsFavorite(isFavorite, nameTestId);
      userEvent.click(getLink('Home'));
      userEvent.click(getLink(linkDetailsName));
      isFavorite = toggleFavoritePokemon();
      userEvent.click(getLink('Favorite Pokémons'));
      checkIsFavorite(isFavorite, nameTestId);
    });
  });
});
