import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<App />);
});

const testIdName = 'pokemon-name';

function getToTheNextButton() {
  const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(nextBtn).toBeInTheDocument();
  return nextBtn;
}

function getToTheAllTypeButton() {
  const allBtn = screen.getByRole('button', { name: 'All' });
  expect(allBtn).toBeInTheDocument();
  return allBtn;
}

function showAllPokemonsOneByOne() {
  pokemons.forEach((pokemon) => {
    const nextBtn = getToTheNextButton();
    expect(screen.getAllByTestId(testIdName)).toHaveLength(1);
    expect(screen.getAllByTestId(testIdName)[0])
      .toHaveTextContent(pokemon.name);
    userEvent.click(nextBtn);
  });
}

describe('testando o componente(page) Pokedex', () => {
  test('se a página contém um heading h2 com o texto \'Encountered pokémons\'', () => {
    expect(screen
      .getByRole('heading', { level: 2, name: 'Encountered pokémons' }))
      .toBeInTheDocument();
  });
});

describe('Testando o Painel de Botões', () => {
  test('se botão contém o texto \'Próximo pokémon\'', () => {
    getToTheNextButton();
  });

  test(`se todos os pokémons da lista são mostrados, 
  um a um, ao clicar sucessivamente no botão`, () => {
    showAllPokemonsOneByOne();
  });

  test(`primeiro pokémon da lista deve ser mostrado 
  ao clicar no botão, se estiver no último pokémon da lista`, () => {
    showAllPokemonsOneByOne();
    expect(screen.getByTestId(testIdName)).toHaveTextContent(pokemons[0].name);
  });
});

describe('Testar os botões de filtro', () => {
  const typesList = [...new Set(pokemons.map(({ type }) => type))];
  const typeSelected = 'Fire';
  const fireTypeList = pokemons.filter(({ type }) => type === typeSelected);

  function showPokeByType(pokeTypeList) {
    pokeTypeList.forEach((pokemon) => {
      expect(screen.getByTestId(testIdName)).toHaveTextContent(pokemon.name);
      userEvent.click(getToTheNextButton());
    });
  }

  test('se existe um botão de filtragem para cada tipo de pokémon, sem repetição', () => {
    typesList.forEach((type, index) => {
      expect(screen.getAllByTestId('pokemon-type-button')[index]).toHaveTextContent(type);
    });
    getToTheAllTypeButton();
  });

  test(`se a partir da seleção de um botão de tipo, a
    Pokédex circula somente pelos pokémons daquele tipo`, () => {
    userEvent.click(screen.getByRole('button', { name: typeSelected }));
    showPokeByType(fireTypeList);
    showPokeByType(fireTypeList);
    getToTheAllTypeButton();
  });

  test(`se a Pokédex mostra os pokémons normalmente (sem filtros) 
  quando o botão All for clicado`, () => {
    userEvent.click(screen.getByRole('button', { name: typeSelected }));
    showPokeByType(fireTypeList);
    userEvent.click(getToTheAllTypeButton());
    showAllPokemonsOneByOne();
  });
});
