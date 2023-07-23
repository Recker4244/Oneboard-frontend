import React from 'react';
import LeadershipSummary from '../../components/LeadershipSummary';
import BarGraph from '../../components/BarGraph';
import Navbar from '../../components/Navbar';

function LeadershipLandingPage() {
  const colors = ['#FF0000', '#FFA500', '#008000'];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <LeadershipSummary />
      <BarGraph title="Pulse Check" y="Responses" x="Month" colors={colors} />
    </div>
  );
}

export default LeadershipLandingPage;
