/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_LEAVES_BY_PROJECT, GET_LEAVES_BY_USERNAME, CREATE_LEAVE } from '../../constants/apiEndpoints';
import { formatDate, incrementDate, validateLeave } from '../../utils/common';
import './PTOCalendar.css';
import BouncingDotsLoader from '../BouncingDotsLoader';

function PTOCalendar({ username }) {
  const token = localStorage.getItem('accessToken');
  const [leaves, setLeaves] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaveValid, setIsLeaveValid] = useState(false);

  const { id: projectId } = useParams();

  useEffect(() => {
    const fetchLeaves = async () => {
      let response;
      if (projectId) {
        response = await makeRequest(GET_LEAVES_BY_PROJECT(projectId), {}, { headers: { 'x-auth-token': token } });
      } else {
        response = await makeRequest(GET_LEAVES_BY_USERNAME(username), {}, { headers: { 'x-auth-token': token } });
      }
      const { data } = response;
      const newLeaves = data.map((leave) => ({
        title: leave.name,
        start: new Date(leave.start_date).toISOString().slice(0, 10),
        end: incrementDate(new Date(leave.end_date).toISOString().slice(0, 10), 1)
      }));
      setLeaves(newLeaves);
    };
    fetchLeaves();
  }, [username, isModalOpen]);

  useEffect(() => {
    if (validateLeave(startDate, endDate)[0]) {
      setIsLeaveValid(true);
    } else {
      setIsLeaveValid(false);
    }
  }, [startDate, endDate]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.50)',
      zIndex: 1000
    },
    content: {
      display: 'flex',
      width: '30rem',
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

  const createLeaveHandler = async () => {
    const requestBody = {
      data: {
        username,
        startDate,
        endDate
      }
    };
    await makeRequest(CREATE_LEAVE, requestBody, { headers: { 'x-auth-token': token } });
    setIsModalOpen(false);
  };

  const dateClickHandler = (event) => {
    setStartDate(formatDate(event.date.toLocaleDateString()));
    setEndDate(formatDate(event.date.toLocaleDateString()));
    setIsModalOpen(true);
  };

  return leaves.length > 0 ? (
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
        events={leaves}
        dateClick={!projectId && dateClickHandler}
      />

      <Modal
        style={customStyles}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl text-[#160d82]"><strong>Create PTO</strong></h1>
          <div className="cursor-pointer">
            <CloseIcon onClick={() => setIsModalOpen(false)} />
          </div>
        </div>
        <div className="bg-white flex-col space-y-4 p-4">
          <div className="flex-col space-y-6">
            <label className="pr-4" htmlFor="start-time">Start Date:</label>
            <input
              type="date"
              className=" border-2 w-72 p-2 my-4 rounded-md"
              name="start-date"
              defaultValue={startDate && startDate.split('/').reverse().join('-')}
              onChange={(event) => { setStartDate(event.target.value); }}
            />
            <br />
            <label className="pr-6" htmlFor="end-time">End Date:</label>
            <input
              type="date"
              className=" border-2 w-72 p-2 my-4 rounded-md"
              name="end-date"
              defaultValue={endDate && endDate.split('/').reverse().join('-')}
              onChange={(event) => { setEndDate(event.target.value); }}
            />
          </div>
          {!isLeaveValid && <p className="text-red text-xs">{validateLeave(startDate, endDate)[1]}</p>}
          <div className="flex justify-end">
            {!isLeaveValid ? <button type="button" className="bg-[#bebec2] flex text-black border-2 py-2 px-8 rounded-full border-none mb-2">Save</button>
              : <button type="button" onClick={createLeaveHandler} className="bg-[#2f1ae6] flex justify-end text-white border-2 py-2 px-8 rounded-full border-none mb-2">Save</button>}
          </div>
        </div>
      </Modal>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

export default PTOCalendar;
