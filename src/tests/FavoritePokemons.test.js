import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../pages/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// beforeEach(() => {
//   renderWithRouter(<FavoritePokemons />);
// });

describe('testando o componente(page) FavoritePokemons', () => {
  test(`se é exibido na tela a mensagem 
  'No favorite pokemon found', caso não tenha favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i))
      .toBeInTheDocument();
  });

  test('se é exibido na tela os cards favoritados', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(/Pikachu/i);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    userEvent.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    expect(screen.getByRole('img', { name: 'Pikachu is marked as favorite' }))
      .toHaveAttribute('src', '/star-icon.svg');
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });
});
