/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import CloseIcon from '@mui/icons-material/Close';
import dayGridPlugin from '@fullcalendar/daygrid';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { CREATE_EVENT, GET_EVENTS, GET_LEAVES_BY_PROJECT } from '../../constants/apiEndpoints';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { getISOString } from '../../utils/common';
import './EventCalendar.css';

function EventCalendar({ role, eventFilter }) {
  const token = localStorage.getItem('accessToken');
  const [events, setEvents] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true); // add loading state

  const { id: projectId } = useParams();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await makeRequest(GET_EVENTS(projectId), {}, { headers: { 'x-auth-token': token } });
      const { data } = response;
      const newEvents = data.map((event) => ({
        title: event.event_name,
        start: event.start_date.toLocaleString(),
        end: event.end_date.toLocaleString()
      }));
      setEvents(newEvents);
      setIsLoading(false); // set isLoading to false after fetching data
    };

    const fetchLeaves = async () => {
      const response = await makeRequest(GET_LEAVES_BY_PROJECT(projectId), {}, { headers: { 'x-auth-token': token } });
      const { data } = response;
      const newLeaves = data.map((leave) => ({
        title: leave.name,
        start: new Date(leave.start_date).toISOString().slice(0, 10),
        end: new Date(leave.end_date).toISOString().slice(0, 10),
        color: '#FF5A5F'
      }));
      setLeaves(newLeaves);
    };

    fetchEvents();
    fetchLeaves();
  }, [isModalOpen]);

  useEffect(() => {
    setAllEvents([...events, ...leaves]);
  }, [events, leaves]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgb(0,0,0,0.5)',
      zIndex: 1000
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      backgroundColor: '#f4f3f3',
      transform: 'translate(-50%, -50%)'
    }
  };

  const createEventHandler = async () => {
    const requestBody = {
      data: {
        projectId,
        eventName,
        startDate: getISOString(selectedDate, startTime),
        endDate: getISOString(selectedDate, endTime)
      }
    };
    await makeRequest(CREATE_EVENT, requestBody, { headers: { 'x-auth-token': token } });
    setIsModalOpen(false);
  };

  const dateClickHandler = (event) => {
    setSelectedDate(event.date.toLocaleDateString());
    setIsModalOpen(true);
  };
  if (isLoading) {
    // render the loading screen if isLoading is true
    return (
      <div className="flex justify-center items-center mt-24">
        <BouncingDotsLoader />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={400}
        headerToolbar={{
          left: 'title',
          right: 'prev,next'
        }}
        dayHeaderClassNames="bg-McKinseyBlue text-white"
        views={{
          dayGridMonth: {
            dayMaxEvents: 1
          }
        }}
        eventTimeFormat={{
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false
        }}
        eventDisplay="block"
        events={eventFilter === 'allEvents' ? allEvents : eventFilter === 'events' ? events : leaves}
        dateClick={(role === 'manager' || role === 'leadership') && dateClickHandler}
      />

      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-[#160d82]">Create Event</h1>
          <div className="cursor-pointer">
            <CloseIcon onClick={() => setIsModalOpen(false)} />
          </div>
        </div>
        <div className="bg-white flex-col space-y-4 p-4">
          <input
            className="border-2 w-96 rounded-md border-grey p-2"
            type="text"
            placeholder="Event Name"
            onChange={(event) => setEventName(event.target.value)}
          />
          <p className="border-2 w-28 p-2 rounded-md">{selectedDate}</p>
          <div className="flex-col">
            <label className="pr-2" htmlFor="start-time">Start Time:</label>
            <input
              type="time"
              name="start-time"
              defaultValue="00:00"
              onChange={(event) => { setStartTime(event.target.value); }}
            />
            <br />
            <label className="pr-4" htmlFor="end-time">End Time:</label>
            <input
              type="time"
              name="end-time"
              defaultValue="23:59"
              onChange={(event) => { setEndTime(event.target.value); }}
            />
          </div>
          <div className="flex justify-end">
            {!eventName ? <button type="button" className="bg-[#bebec2] flex text-black border-2 py-2 px-8 rounded-full border-none mb-2">Save</button>
              : <button type="button" onClick={createEventHandler} className="bg-[#2f1ae6] flex justify-end text-white border-2 py-2 px-8 rounded-full border-none mb-2">Save</button>}
          </div>
        </div>
      </Modal>

    </div>
  );
}

export default EventCalendar;
