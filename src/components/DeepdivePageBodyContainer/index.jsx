/* eslint-disable react/prop-types */
import React from 'react';

function DeepdivePageBodyContainer({ children }) {
  return (
    <div className="bg-[#f4f3f3] p-6 flex flex-col justify-around max-md:p-0" data-testid="container">
      {children}
    </div>
  );
}

export default DeepdivePageBodyContainer;
