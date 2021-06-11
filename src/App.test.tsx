import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('find button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Connect/i);
  expect(linkElement).toBeInTheDocument();
});
