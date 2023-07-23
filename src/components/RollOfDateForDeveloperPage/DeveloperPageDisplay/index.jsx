/* eslint-disable react/prop-types */
import React from 'react';

export default function DeveloperPageDisplayer({ date }) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">{date}</p>
      <p className="text-xs text-gray-400">Roll of date</p>
    </div>
  );
}
