/* eslint-disable */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

// eslint-disable-next-line import/no-unresolved

import mockSurveyData from '../../mocks/surveyData';

function PulseCheckGraph() {
  return (
    <div className='bg-white'>
    <BarChart
      width={600}
      height={300}
      data={mockSurveyData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Great" stackId="a" fill="green" />
      <Bar dataKey="OK" stackId="a" fill="yellow" />
      <Bar dataKey="Terrible" stackId="a" fill="red" />
    </BarChart>
    </div>
  );
}

export default PulseCheckGraph;
