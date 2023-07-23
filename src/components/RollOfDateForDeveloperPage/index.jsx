/* eslint-disable react/prop-types */
import React from 'react';
import { decodeToken } from 'react-jwt';
import { GET_ROLL_OF_DATE } from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import transformRollOfDate from '../../utils/transformRollOfDate';

export default function RollOfDate({ projectId }) {
  const [date, setDate] = React.useState();
  const token = localStorage.getItem('accessToken');
  const decodedToken = decodeToken(token);
  const { username } = decodedToken;
  async function getRollOfDate() {
    const data = await makeRequest(GET_ROLL_OF_DATE(projectId, username), {}, { headers: { 'x-auth-token': localStorage.getItem('accessToken') } });
    const transformedDate = transformRollOfDate(data);
    setDate(transformedDate);
  }

  React.useEffect(() => {
    getRollOfDate();
  }, []);

  return date ? (
    <div className="flex flex-col justify-center mr-5 bg-white rounded-3xl w-1/6 h-44 items-center">
      <p className="text-2xl font-bold ">{date}</p>
      <p className="text-base text-gray-400">Roll Off Date</p>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-10 mr-10 pr-10">
      <BouncingDotsLoader />
    </div>
  );
}

