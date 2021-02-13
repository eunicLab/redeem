import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { App } from './App.js';

it('renders correctly', () => {
  const { queryByTestId, queryByPlaceholderText } = render(<App />);
  expect(queryByTestId('searchBox')).toBeTruthy();
  expect(queryByPlaceholderText('Enter Your City Here')).toBeTruthy();
});
describe('Input value', () => {
  it('update cityInput when city name is entered', () => {
    const { queryByPlaceholderText } = render(<App />);
    const cityInput = queryByPlaceholderText('Enter Your City Here');
    fireEvent.change(cityInput, { target: { value: 'Prague' } });
    expect(cityInput.value).toBe('Prague');
  });
});

it('handleClick is triggered when submit button is clicked', () => {
  let submitClicked = jest.fn();
  const { queryByTestId } = render(
    <button
      className='mybtn'
      data-testid='submitButton'
      onClick={submitClicked}>
      Check the weather!
    </button>
  );
  const submitButton = queryByTestId('submitButton');
  fireEvent.click(submitButton);
  expect(submitClicked).toHaveBeenCalled();
});
