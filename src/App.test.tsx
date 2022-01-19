import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('app renders input', () => {
  render(<App />);
  const input = screen.getByLabelText('input value');
  expect(input).toBeInTheDocument();
});

test('backspace button click functions', () => {
  const { container } = render(<App />);
  const backspace = container.querySelector('[name="backspace"]');
  const input: HTMLInputElement = screen.getByLabelText('input value');

  if (!backspace) throw new Error('Missing backspace element');

  const originalValue = input.value;
  userEvent.click(backspace);

  expect(input.value).toBe(originalValue.slice(0, -1));
});
