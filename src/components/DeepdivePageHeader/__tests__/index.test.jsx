import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams } from 'react-router-dom';
import makeRequest from '../../../utils/makeRequest';
import DeepdivePageHeader from '../index';
import '@testing-library/jest-dom';

jest.mock('../../../utils/makeRequest');
jest.mock('react-router-dom', () => ({
  useParams: jest.fn()
}));

describe('DeepdivePageHeader', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading message when project data is not loaded yet', async () => {
    makeRequest.mockRejectedValueOnce(new Error('Failed to load project data'));
    render(<DeepdivePageHeader />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    await waitFor(() => expect(makeRequest).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    expect(screen.getByText('Failed to load project data')).toBeInTheDocument();
  });

  it('renders project name and charge codes when project data is loaded', async () => {
    const mockProject = {
      id: 1,
      project_name: 'Mock Project',
      charge_codes: ['Code 1', 'Code 2'],
    };
    makeRequest.mockResolvedValueOnce(mockProject);
    render(<DeepdivePageHeader />);
    expect(screen.getByText('Loading')).toBeInTheDocument();
    await waitFor(() => expect(makeRequest).toHaveBeenCalledTimes(1));
    expect(screen.queryByText('Loading')).not.toBeInTheDocument();
    expect(screen.getByText('Mock Project')).toBeInTheDocument();
    expect(screen.getByText('CC(s): Code 1 | Code 2')).toBeInTheDocument();
  });

  it('opens edit project dialog when Edit button is clicked', async () => {
    const mockProject = {
      id: 1,
      project_name: 'Mock Project',
      charge_codes: ['Code 1', 'Code 2'],
    };
    makeRequest.mockResolvedValueOnce(mockProject);
    render(<DeepdivePageHeader />);
    await waitFor(() => expect(makeRequest).toHaveBeenCalledTimes(1));
    const editButton = screen.getByRole('button', { name: /edit/i });
    userEvent.click(editButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
