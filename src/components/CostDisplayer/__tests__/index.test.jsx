/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-proto */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CostDisplayer from '../index';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn().mockReturnValue({ id: '1' })
}));

jest.mock('../../../utils/makeRequest', () => jest.fn());

describe('CostDisplayer', () => {
  it('should display the total cost when totalSupplementaryCost is greater than 0', async () => {
    const supplementaryCost = [
      { id: 1, cost_type: 'Transportation', amount: 100 },
      { id: 2, cost_type: 'Meals', amount: 200 }
    ];
    const totalSupplementaryCost = 300;
    const personalCost = 400;

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('accessToken');

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([supplementaryCost, totalSupplementaryCost])
      }));

    render(<CostDisplayer />);

    await waitFor(() => {
      expect(screen.getByText(`$ ${personalCost + totalSupplementaryCost}`)).toBeInTheDocument();
      expect(screen.getByText(`(${personalCost} + ${totalSupplementaryCost})`)).toBeInTheDocument();
      expect(screen.getByText('Supplementary Cost')).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });
  });

  it('should display the loader when totalSupplementaryCost is 0', async () => {
    const totalSupplementaryCost = 0;

    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue('accessToken');

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([[], totalSupplementaryCost])
      }));

    render(<CostDisplayer />);

    await waitFor(() => {
      expect(screen.getByTestId('bouncing-dots-loader')).toBeInTheDocument();
    });
  });
});

