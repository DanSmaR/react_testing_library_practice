import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('testando o componente App', () => {
  test(`se o topo da aplicação contém um conjunto
  fixo de links de navegação`, () => {
    ['Home', 'Favorite Pokémons', 'About'].forEach((elem) => {
      expect(screen.getByRole('link', { name: elem })).toBeInTheDocument();
    });
  });
});
