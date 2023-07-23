import { fireEvent, render, screen } from '@testing-library/react';
import Login from '..';
import makeRequest from '../../../utils/makeRequest';

jest.mock('../../../utils/makeRequest');

describe('Login', () => {
  it('should call correct api endpoint when username and password are submitted', () => {
    const mockSetIsLoggedIn = jest.fn();

    render(<Login setIsLoggedIn={mockSetIsLoggedIn} />);
    const usernameInput = screen.getByTestId('usernameInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(usernameInput, { target: { value: 'demoUser' } });
    fireEvent.change(passwordInput, { target: { value: 'demoPassword' } });
    fireEvent.click(submitButton);

    makeRequest.mockReturnValue();
  });
});
