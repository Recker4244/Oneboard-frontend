/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import RetroBoard from '../index';
import makeRequest from '../../../utils/makeRequest';

jest.mock('../../../utils/makeRequest', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockRetro = [
  {
    id: 1,
    title: 'Retro 1',
    image_path: 'https://images.unsplash.com/photo-1610398000000-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    action_items: ['action item 1', 'action item 2']
  },
  {
    id: 2,
    title: 'Retro 2',
    image_path: 'https://images.unsplash.com/photo-1610398000000-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    action_items: ['action item 1', 'action item 2']
  }
];

describe('RetroBoard', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
  });

  it('should show the loading spinner', () => {
    const { getByTestId } = render(<RetroBoard retro={[]} role="developer" />, {
      route: '/retro/1'
    });
    expect(getByTestId('loader')).toBeTruthy();
  });

  it('renders the correct number of Retro components based on the length of the retro state', () => {
    // Mock the makeRequest function to return the mockRetro data
    makeRequest.mockResolvedValueOnce(mockRetro);

    const { getAllByTestId } = render(<RetroBoard role="developer" />, {
      route: '/retro/1'
    });

    // Wait for the component to render the Retro components
    waitFor(() => {
      const retroComponents = getAllByTestId('retro-component');
      expect(retroComponents.length).toBe(mockRetro.length);
    });
  });
  it('updates the retro state with the correct data after fetching it', async () => {
    makeRequest.mockResolvedValueOnce(mockRetro);
    const { findByTestId } = render(<RetroBoard role="developer" />);
    const retroComponent = await findByTestId('retro-component');
    expect(retroComponent).toBeTruthy();
  });
});
