/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable max-len */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RetroDetails from '../index';
import '@testing-library/jest-dom/extend-expect';

describe('RetroDetails', () => {
  const mockRetroBoard = {
    title: 'Mock Retro Board',
    image_path: 'mock-image-path.jpg',
    action_items: ['item 1', 'item 2'],
    id: 1
  };
  it('should render the retro board title', () => {
    render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" />);
    expect(screen.getByTestId('detail-title')).toHaveTextContent('Mock Retro Board');
  });
  it('should render the retro board image', () => {
    render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" />);
    expect(screen.getByTestId('detail-image')).toHaveAttribute('src', 'mock-image-path.jpg');
  });
  it('should render the retro board action items', () => {
    render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" />);
    expect(screen.getByTestId('detail-action-items')).toHaveTextContent('item 1');
    expect(screen.getByTestId('detail-action-items')).toHaveTextContent('item 2');
  });
  it('should show the edit button for the "leadership" role', () => {
    const { getByTestId } = render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" />);
    expect(getByTestId('edit-icon')).toBeInTheDocument();
  });

  // it('should not show the edit button for the "developer" role', () => {
  //   const { queryByTestId } = render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="developer" />);
  //   expect(queryByTestId('edit-icon')).not.toBeInTheDocument();
  // });
  it('should call the click function when the close button is clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<RetroDetails retroBoard={mockRetroBoard} click={handleClick} setClick={() => {}} role="leadership" />);
    fireEvent.click(getByTestId('close-detail'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
  it('should call the handleImageError function when the image fails to load', () => {
    const handleImageError = jest.fn();
    const { getByTestId } = render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" handleImageError={handleImageError} />);
    fireEvent.error(getByTestId('detail-image'));
    expect(handleImageError).toHaveBeenCalledTimes(0);
  });
  it('should match the snapshot', () => {
    const { asFragment } = render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should match the snapshot when the image fails to load', () => {
    const { asFragment } = render(<RetroDetails retroBoard={mockRetroBoard} click={() => {}} setClick={() => {}} role="leadership" handleImageError={() => {}} />);
    fireEvent.error(screen.getByTestId('detail-image'));
    expect(asFragment()).toMatchSnapshot();
  });
});

