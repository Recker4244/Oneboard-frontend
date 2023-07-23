import React from 'react';
import BarGraph from '../BarGraph';
import ManagerLanguageTrend from '../ManagerLanguageTrend';
import ProjectCountDisplayer from '../ProjectCountDisplayer';

// const languages1 = {
//   Python: [54, 23, 17.5, 21, 2, 54, 65, 98, 2, 0, 0, 0],
//   Shell: [0, 0, 14.1666, 0, 0, 23, 0, 0, 0, 43, 0, 0],
//   'C++': [11, 22, 74.1666666, 0, 0, 0, 22, 0, 0, 42, 0, 0]
// };

function ManagerLandingPageSummary() {
  return (
    <div className="flex">
      <div className="flex flex-1 items-center bg-[#F4F3F3] m-6 py-3 justify-between">
        <div className="flex items-center justify-center w-2/12 h-48 ml-5 bg-white rounded-2xl">
          <ProjectCountDisplayer />
        </div>
        <div className="flex items-center justify-center w-5/12 ml-5 h-48 bg-white rounded-2xl">
          <ManagerLanguageTrend />
        </div>
        <div className="flex items-center justify-center w-5/12 mx-5 h-48 bg-white rounded-2xl">
          <BarGraph
            title="Pulse Check"
            y="Responses"
            x="Months"
            colors={['#FF0000', '#0000FF', '#00FF00']}
          />
        </div>
      </div>
    </div>
  );
}

export default ManagerLandingPageSummary;
