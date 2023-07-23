import React from 'react';
import { render } from '@testing-library/react';
import BouncingDotsLoader from '../index';

describe('BouncingDotsLoader', () => {
  it('should renders the component correctly', () => {
    const { container } = render(<BouncingDotsLoader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

