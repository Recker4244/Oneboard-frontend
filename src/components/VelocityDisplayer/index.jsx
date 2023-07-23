/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbTriangleFilled, TbTriangleInvertedFilled } from 'react-icons/tb';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5';
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CountUp from 'react-countup';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_DEVELOPER_VELOCITY, GET_TEAM_VELOCITY } from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';

function VelocityDisplayer() {
  const { id } = useParams();

  const [developerVelocity, setDeveloperVelocity] = useState(0);
  const [teamVelocity, setTeamVelocity] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    makeRequest(GET_DEVELOPER_VELOCITY(id), { params: { username: 'ashutosh' } }, { headers: { 'x-auth-token': token } }).then(
      (response) => {
        setDeveloperVelocity(response);
      }
    );
    makeRequest(GET_TEAM_VELOCITY(id), {}, { headers: { 'x-auth-token': token } }).then(
      (response) => {
        setTeamVelocity(response);
      }
    );
  }, []);

  return teamVelocity && developerVelocity ? (
  // <div className="m-3 w-36">
  //   <div className="mt-4 text-xs left-5 top-1 flex justify-end">
  //     <p className="border-2 border-gray-400 rounded-md px-1">
  //       <span className="font-bold">{developerVelocity}</span>
  //       {' '}
  //       Team Velocity
  //     </p>
  //   </div>
  //   <div className="flex flex-col justify-start">
  //     <p className="text-4xl font-bold">{teamVelocity}</p>
  //     <p className="text-sm text-gray-400">Velocity</p>
  //   </div>

    // </div>
    <div className="flex flex-row justify-around h-44 bg-white rounded-3xl my-1 w-1/5 px-2">
      <div className="flex flex-col justify-center items-center">
        <p className="text-8xl self-center"><CountUp end={developerVelocity} duration={7} /></p>
        <p className="text-base text-McKinseyBlue self-center py-1">Your Velocity</p>
      </div>
      <div className="flex flex-col justify-start mt-3">
        <p className="flex flex-row border rounded-lg p-1" style={{ border: `${(developerVelocity >= teamVelocity) ? '2px dotted #6fdb04' : '2px dotted #e30909'}` }}>
          <div className="">
            {developerVelocity >= teamVelocity ? (
              <IoMdArrowRoundUp
                style={{
                  color: '#04b831', border: '1px solid white', borderRadius: '50%', backgroundColor: '#e2f0d5'
                }}
                size={28}
              />
            ) : (
              <IoMdArrowRoundDown
                style={{
                  color: '#fc2d08', border: '1px solid white', borderRadius: '50%', backgroundColor: '#f7d5d5'
                }}
                size={28}
              />
            )}
          </div>
          &nbsp;
          <span className="text-slate-400 text-base self-center">
            {' '}
            Team Velocity

          </span>
          {' '}
          &nbsp;
          <span className="font-bold text-xl text-McKinseyBlue self-center"><CountUp end={teamVelocity} duration={7} /></span>
        </p>
        {/* <div className="flex justify-center mb-4">{developerVelocity > teamVelocity ? <TbTriangleFilled style={{ color: '#8FD04F' }} size={70} /> : <TbTriangleInvertedFilled style={{ color: '#F24627' }} size={42} />}</div> */}
        {/* <div className="flex justify-center my-4">{developerVelocity > teamVelocity ? <IoCaretUpSharp style={{ color: '#8FD04F' }} size={70} /> : <IoCaretDownSharp style={{ color: '#F24627' }} size={70} />}</div> */}
        {/* <div className="flex justify-center">
          {developerVelocity > teamVelocity ? <AiOutlineArrowUp style={{ color: '#8FD04F' }} size={70} /> : (
            <AiOutlineArrowDown
              style={{
                color: '#F24627', border: '1px solid white', borderRadius: '50%', backgroundColor: '#eba396'
              }}
              size={28}
            />
          )}
        </div> */}

      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-10 mr-10 pr-10">
      <BouncingDotsLoader />
    </div>
  );
}

export default VelocityDisplayer;
