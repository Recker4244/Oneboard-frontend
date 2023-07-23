/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable import/no-named-as-default */
/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import { React, useState, useEffect } from 'react';
// import { decodeToken } from 'react-jwt';
import { useParams } from 'react-router-dom';
import WidgetInfo from '../WidgetInfo';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_LEAVES_BY_PROJECT, GET_TEAM_MEMBERS } from '../../constants/apiEndpoints';
import PTOBadge from '../PTOBadge';

function TeamMemberBox() {
  const token = localStorage.getItem('accessToken');
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(true);
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    makeRequest(GET_TEAM_MEMBERS(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        // response.sort((a, b) => {

        // });
        console.log('team_members: ', response);
        const arr = ['purple', 'blue', 'green', 'yellow', 'orange', 'red'];

        setDetails(response);
        // console.log(sorted);
        // console.log('inside response: ', response);
      })
      .catch((error) => {
        console.log(error);
      });

    makeRequest(GET_LEAVES_BY_PROJECT(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setLeaves(response.data);
      });
  }, []);

  // console.log('outside details: ', details);

  // const handleClick = () => {
  //   setShowDetails(!showDetails);
  // };

  const handleDates = (date) => {
    const newDate = new Date(date);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = newDate.toLocaleDateString('en-US', options);
    return formattedDate;
  };

  const handleFlag = (flag) => {
    switch (flag) {
      case 'purple':
        return '#7032a0';
      case 'green':
        return '#03b050';
      case 'yellow':
        return '#febf04';
      case 'orange':
        return '#ff6602';
      case 'red':
        return '#c10100';
      default:
        return '#0270c0';
    }
  };

  return details ? (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-between mb-2">
        <div className="flex text-2xl text-[#040b81] ">
          <span className="font-bold">Team Members</span>
          <WidgetInfo widgetName="team members" />
        </div>

        {/* <div style={{ color: '#1A31E8' }}><button type="submit" onClick={handleClick}>{!showDetails ? 'Show More Details' : 'Hide More Details'}</button></div> */}
      </div>
      <div className="my-3 flex flex-col p-5 overscroll-contain w-full h-full overflow-scroll" style={{ backgroundColor: '#F7FBFF' }}>
        {details && details.map((detail) => (
          <div key={detail.id}>
            {/* {console.log(detail)} */}
            <div className="flex flex-col bg-white m-2 ">
              <div className="flex flex-row h-9 relative overflow-hidden">
                {/* <div className="w-2 bg-McKinseyBlue z-50" /> */}
                <div className="w-2" style={{ backgroundColor: `${handleFlag(detail.user.flag)}` }} />
                {/* <div className="absolute inset-0 w-9 -translate-x-5 -translate-y-5 rotate-45 " style={{ backgroundColor: `${handleFlag(detail.user.flag)}` }} /> */}
                <div className={`pl-5 flex gap-x-2 items-center self-center text-xl ${showDetails ? 'font-normal' : 'font-thin'}`}>

                  {detail?.user.name}
                  <PTOBadge leaves={leaves} username={detail.username} />
                </div>
              </div>
              <div className={`${showDetails ? 'flex' : 'hidden'} flex-row `} id="team-member-details">
                {/* <div className="w-2 bg-McKinseyBlue z-50" /> */}
                <div className="w-2" style={{ backgroundColor: `${handleFlag(detail.user.flag)}` }} />
                <div className="pl-1 h-9  text-slate-400 flex flex-row justify-self-center w-full">
                  <div className="border-r-2 self-center px-9 border-slate-400 w-3/12 flex justify-start text-ellipsis whitespace-nowrap overflow-hidden">
                    {' '}
                    {detail?.role}
                  </div>
                  <div className="border-r-2 self-center px-2 border-slate-400 w-3/12 flex pl-7 text-ellipsis whitespace-nowrap overflow-hidden">
                    {' '}
                    $
                    {' '}
                    {detail?.cost}
                    {' '}
                    /
                    {' '}
                    day
                  </div>
                  {/* <div className="border-r-2 self-center px-5 border-slate-400">
                  {' '}
                  {detail?.role}
                </div> */}
                  <div className=" self-center w-6/12 flex pl-7 text-ellipsis whitespace-nowrap overflow-hidden">
                    {' '}
                    {new Date(detail?.end_date) >= new Date() ? `Active until ${handleDates(detail.end_date)}` : `Rolled Off on ${handleDates(detail.end_date)}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

export default TeamMemberBox;

// #7032a0 purple partner/firm leader
// #0270c0 blue
// #03b050 green manager
// #febf04 yellow assotiate/specialist
// #ff6602 orange team leader
// #c10100 red junior analyst
