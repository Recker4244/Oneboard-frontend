/* eslint-disable global-require */
/* eslint-disable no-proto */
/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from '@testing-library/react';
import CommitDisplayer from '../index';
import '@testing-library/jest-dom';
import makeRequest from '../../../utils/makeRequest';

jest.mock('react-jwt', () => ({
  decodeToken: jest.fn(() => ({
    username: 'sneha'
  }))
}));

jest.mock('../../../utils/makeRequest');

describe('CommitDisplayer', () => {
  let getItem;
  let decodeTokenSpy;
  beforeEach(() => {
    // mock the local storage to return a token
    getItem = jest.spyOn(window.localStorage.__proto__, 'getItem');
    getItem.mockReturnValue('accessToken');
    // Mock the decodeToken function
    decodeTokenSpy = jest.spyOn(require('react-jwt'), 'decodeToken');
    decodeTokenSpy.mockReturnValue({ name: 'sneha' });
    // Mock the navigate function
    // navigate = jest.fn();
    // useNavigate.mockReturnValue(navigate);
  });
  it('renders loader when data is not fetched', () => {
    const mockMakeRequest = makeRequest.mockResolvedValue(null);
    render(<CommitDisplayer />);
    expect(mockMakeRequest).toHaveBeenCalledTimes(1);
    const commitStatsElement = screen.getByTestId('loader');
    expect(commitStatsElement).toBeInTheDocument();
  });

  it('renders when data is present', async () => {
    const mockMakeRequest = makeRequest.mockResolvedValue({
      userCommits: 5,
      teamCommits: 10
    });
    render(<CommitDisplayer />);
    expect(mockMakeRequest).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      const commitStatsElement = screen.findByTestId('commit-stats');
      expect(commitStatsElement).toBeTruthy();
    });
  });
});
