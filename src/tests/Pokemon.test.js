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

function getToTheDetailsPage(pokeName) {
  userEvent.click(screen.getByRole('link', { name: 'More details' }));
  expect(screen.getByRole('heading', { level: 2, name: `${pokeName} Details` }));
}

describe('Testando o componente Pokemon', () => {
  describe('Testando a renderização do card com as informações de um pokemon', () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    test('se mostra o nome correto do pokemon na tela', () => {
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    });

    test('se mostra o tipo correto do pokemon', () => {
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    });

    test(`se mostra o peso médio do pokemon com um texto no formato (Average weight:
    <value> <measurementUnit>); onde <value> e <measurementUnit> são, 
    respectivamente, o peso médio do pokémon e sua unidade de medida`, () => {
      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent(averageWeight);
    });

    test(`se mostra imagem do pokemon contendo um atributo src com a URL da imagem 
    e um atributo alt com o texto <name> sprite, onde <name> é o nome 
    do pokémon.`, () => {
      expect(screen.getByRole('img', { name: `${name} sprite` }))
        .toHaveAttribute('src', image);
    });
  });
});

describe('Testando redirecionamento para pagina de detalhes', () => {
  test(`se contém um link de navegação para exibir detalhes deste pokémon. 
  O link deve possuir a URL (/pokemons/<id>), onde <id> é o id do 
  pokémon exibido`, () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'More details' }))
      .toHaveAttribute('href', `/pokemons/${id}`);
  });

  test(`se ao clicar no link de navegação do pokémon, é feito o 
  redirecionamento da aplicação para a página de detalhes de pokémon`, () => {
    renderWithRouter(<App />);
    getToTheDetailsPage(name);
  });

  test(`se a URL exibida no navegador muda para /pokemons/<id>, onde <id> 
  é o id do pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<App />);
    getToTheDetailsPage(name);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
});

describe('Testando os pokemons favoritos na pagina de detalhes', () => {
  test(`se o ícone é uma imagem com o atributo src contendo 
  o caminho /star-icon.svg e com o atributo alt igual a 
  (<pokemon> is marked as favorite)`, () => {
    renderWithRouter(<App />);
    getToTheDetailsPage(name);
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    expect(screen.getByRole('img', { name: `${name} is marked as favorite` }))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
