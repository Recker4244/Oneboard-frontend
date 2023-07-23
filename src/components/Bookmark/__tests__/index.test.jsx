/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Bookmark from '../index';

jest.mock('react-router-dom', () => ({
  useParams: () => ({ id: '1' })
}));

jest.mock('../../../utils/makeRequest', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('Bookmark', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    const { getByTestId } = render(<Bookmark />);
    expect(getByTestId('bookmark')).toBeTruthy();
  });
});

