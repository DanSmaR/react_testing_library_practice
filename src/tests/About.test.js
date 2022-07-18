import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('testando o componente(page) About', () => {
  test('se possui um heading \'h2\' com o texto \'About Pokédex\'', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'About Pokédex' }));
  });

  test('se possui uma imagem da Pokédex', () => {
    expect(screen.getByRole('img', { name: 'Pokédex' }))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('se possui dois paragrafos com texto sobre a Pokédex', () => {
    const para1a = 'This application simulates a Pokédex, ';
    const para1b = 'a digital encyclopedia containing all Pokémons';
    const text1 = para1a + para1b;
    // screen.logTestingPlaygroundURL();
    expect(screen.getByText(text1))
      .toBeInTheDocument();
  });
});
