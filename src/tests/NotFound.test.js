import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';
// import App from '../App';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe('testando o componente(page) NotFound', () => {
  test(`se a página contém um heading h2 com 
  o texto 'Page requested not found 😭'`, () => {
    expect(screen
      .getByRole('heading', { level: 2, name: 'Page requested not found Crying emoji' }))
      .toBeInTheDocument();
    expect(screen
      .getByRole('img', {
        name: 'Pikachu crying because the page requested was not found',
      }))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
