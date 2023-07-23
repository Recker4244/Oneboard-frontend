import React from 'react';
import {
  render, fireEvent, waitFor, screen
} from '@testing-library/react';
import makeRequest from '../../../utils/makeRequest';
import RetroBoardGallery from '../index';
// import RetroForm from '../../RetroForm';

jest.mock('../../../utils/makeRequest');

describe('RetroBoardGallery', () => {
  beforeEach(() => {
    makeRequest.mockResolvedValueOnce([{ id: 1, title: 'retro_1' }, { id: 2, title: 'retro_2' }]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should rennder the + icon', () => {
    const { getByTestId } = render(<RetroBoardGallery />);
    waitFor(() => expect(getByTestId('add-icon')).toHaveTextContent('+'));
  });
  it('should render the "Add New Retro Board Snapshot" button', () => {
    const { getByTestId } = render(<RetroBoardGallery />);
    // check if the text of the retro-button is "Add New Retro Board Snapshot"
    waitFor(() => expect(getByTestId('retro-button')).toHaveTextContent('Add New Retro Board Snapshot'));
  });
  it('should fetch retro data on mount', async () => {
    render(<RetroBoardGallery />);
    await waitFor(() => expect(makeRequest).toHaveBeenCalledTimes(1));
  });
  it('should render the retro data', () => {
    const { getByText } = render(<RetroBoardGallery />);
    waitFor(() => expect(getByText('retro_1')).toBeInTheDocument());
    waitFor(() => expect(getByText('retro_2')).toBeInTheDocument());
  });
  it('should display the BouncingDotsLoader component when retro data is still being fetched', async () => {
    makeRequest.mockResolvedValueOnce([]);
    const { getByTestId } = render(<RetroBoardGallery />);
    expect(getByTestId('bouncing-dots-loader')).toBeTruthy();
    await waitFor(() => expect(getByTestId('bouncing-dots-loader')).not.toBeTruthy());
  });
});
