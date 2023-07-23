/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
// import { makeStyles } from '@material-ui/core/styles';
// import { useParams } from 'react-router-dom';
import { GET_EVENTS } from '../../constants/apiEndpoints';
import { filterAndSortEvents, getRemainingDaysString } from '../../utils/common';
import makeRequest from '../../utils/makeRequest';

function UpcomingEvents({ projectId }) {
  const token = localStorage.getItem('accessToken');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await makeRequest(GET_EVENTS(projectId), {}, { headers: { 'x-auth-token': token } });
      const { data } = response;
      setEvents(filterAndSortEvents(data));
    };
    fetchEvents();
  }, []);

  return (
    <div className="flex gap-x-2 gap-y-3 flex-wrap m-2">
      {events.length === 0 && (
        <p className="px-2 py-1 text-slate-500 border-2 border-none">
          No upcoming events!
        </p>
      )}
      {events.slice(0, 2).map((event) => (
        <p className="bg-[#cfe9fa] px-2 py-1 border-2 border-none rounded-md">
          {event.event_name}
          {' '}
          {getRemainingDaysString(event.start_date)}
        </p>
      ))}
      <Tooltip
        arrow
        title={(
          <div>
            {events.slice(2).map((event) => (
              <li className="text-sm">
                {event.event_name}
                {' '}
                {getRemainingDaysString(event.start_date)}
              </li>
            ))}
          </div>
        )}
      >
        <div className="rounded-md">
          {events.length > 2 && (
            <p className="bg-[#cfe9fa] px-2 py-1 border-2 border-none rounded-md">
              <strong>
                +
                {events.length - 2}
              </strong>
            </p>
          )}
        </div>
      </Tooltip>
    </div>
  );
}

export default UpcomingEvents;

