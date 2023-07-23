/* eslint-disable react/prop-types */
import React from 'react';

function PTOBadge({ leaves, username }) {
  const filteredPTO = leaves.filter((leave) => leave.username === username
  && new Date(leave.end_date) >= new Date());
  if (filteredPTO.length === 0) return null;
  const PTO = filteredPTO.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))[0];
  function daysRemaining(startDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const today = new Date();
    const start = new Date(startDate);
    const diff = Math.floor((start - today) / oneDay) + 1;
    return diff;
  }
  const daysLeft = daysRemaining(PTO.start_date);
  return (
    <div>
      {daysLeft > 0 && daysLeft <= 4 && (
      <p className="bg-orangeBadge text-xs text-white px-2 border-none rounded-xl font-bold">
        {`PTO in ${daysLeft}`}
        {' '}
        day
        {daysLeft > 1 && 's'}
      </p>
      )}
      {(new Date(PTO.start_date) <= new Date() && new Date() <= new Date(PTO.end_date)) && <p className="bg-blue text-xs text-white px-1 border-none rounded-xl font-bold">on PTO</p>}
    </div>
  );
}

export default PTOBadge;
