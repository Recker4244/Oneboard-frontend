/* eslint-disable no-unused-vars */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Pages from '../../index';

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedNavigate
}));
describe('AdminDashboard', () => {
  it('should show Title when rendered', () => {
    render(<Pages.AdminDashboard />);
    expect(screen.getByText('User Management')).toBeTruthy();
  });
  it('should show Add User Button when rendered', () => {
    render(<Pages.AdminDashboard />);
    expect(screen.getByText('Add User')).toBeTruthy();
  });
});

