/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // import the matcher

import Retro from '../index';

describe('Retro component', () => {
  const retroData = {
    id: 1,
    title: 'Test Retro',
    image_path: 'test-image.png',
    action_items: ['action item 1', 'action item 2']
  };

  it('renders the title of the retro', () => {
    const { getByTestId } = render(<Retro retroData={retroData} />);
    // const { getByTestId } = render(<Retro retroData={retroData} />);
    expect(getByTestId('retro-data')).toHaveTextContent('Test Retro');
  });

  it('renders the image of the retro', () => {
    const { getByAltText } = render(<Retro retroData={retroData} />);
    expect(getByAltText('retro')).toHaveAttribute('src', 'test-image.png');
  });

  it('displays fallback image when the image fails to load', () => {
    const { getByAltText } = render(<Retro retroData={{ ...retroData, image_path: 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg' }} />);
    expect(getByAltText('retro')).toHaveAttribute('src', 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg');
  });

  it('opens RetroDetails component when the image is clicked', () => {
    const { getByAltText, getByTestId } = render(<Retro retroData={retroData} />);
    fireEvent.click(getByAltText('retro'));
    expect(getByTestId('detail-title')).toBeInTheDocument();
  });
  it('renders RetroDetails component when clicked', () => {
    const { getByAltText, getByTestId } = render(<Retro retroData={retroData} />);
    expect(getByTestId('retro-data')).toBeInTheDocument();
    fireEvent.click(getByAltText('retro'));
    expect(getByTestId('detail-title')).toBeInTheDocument();
  });
  it('calls handleImageError function on image error', () => {
    const { getByAltText } = render(<Retro retroData={retroData} />);
    const image = getByAltText('retro');

    fireEvent.error(image);

    expect(image).toHaveAttribute('src', 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg');
  });
});
