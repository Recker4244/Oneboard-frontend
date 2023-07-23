import React from 'react';
import { render } from '@testing-library/react';
import DeepdivePageBodyContainer from '../index';
import '@testing-library/jest-dom';

describe('DeepdivePageBodyContainer', () => {
  it('renders its children', () => {
    const { getByText } = render(
      <DeepdivePageBodyContainer>
        <div>Child element</div>
      </DeepdivePageBodyContainer>
    );
    expect(getByText('Child element')).toBeInTheDocument();
  });

  it('has correct class name and styling', () => {
    const { getByTestId } = render(
      <DeepdivePageBodyContainer>
        <div>Child element</div>
      </DeepdivePageBodyContainer>
    );
    const container = getByTestId('container');
    expect(container).toHaveClass('bg-[#f4f3f3] p-6 flex flex-col justify-around max-md:p-0');
  });
});
