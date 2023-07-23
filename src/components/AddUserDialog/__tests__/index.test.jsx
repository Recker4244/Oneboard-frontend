// eslint-disable-next-line no-unused-vars
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import AddUserDialog from '..';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));
describe('AddUserDialog', () => {
  it('should render correctly', () => {
    const { container } = render(<AddUserDialog />);
    expect(container).toMatchSnapshot();
  });
  it('should show Add User Dialog when rendered', () => {
    render(<AddUserDialog />);
    expect(screen.getByText('Add User')).toBeTruthy();
  });
});
