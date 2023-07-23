/* eslint-disable no-console */
import React from 'react';
import { decodeToken } from 'react-jwt';
import StockedColumChart from '../LanguageTrend';
import VelocitySpeedometer from '../VelocitySpeedometer';
import RoleYearlyDistribution from '../RoleYearlyDistribution';
import makeRequest from '../../utils/makeRequest';
import { GET_LANGUAGE_USAGE } from '../../constants/apiEndpoints';

function DeveloperLandingPageSummary() {
  const decodedToken = decodeToken(localStorage.getItem('accessToken'));
  console.log(decodedToken);
  const [languages, setLanguages] = React.useState(null);
  React.useEffect(() => {
    makeRequest(GET_LANGUAGE_USAGE(decodedToken.github), {}, {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken')
      }
    })
      .then((response) => {
        if (Object.keys(response).length !== 0) {
          setLanguages(response);
        } else {
          setLanguages(null);
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex">
      <div className="flex flex-1 items-center bg-[#F4F3F3] m-6 py-3 justify-between">
        <div className="flex items-center justify-center w-2/12 h-48 ml-5 bg-white rounded-2xl">
          <VelocitySpeedometer />
        </div>
        <div className="flex items-center justify-center w-6/12 ml-5 h-48 bg-white rounded-2xl">
          {languages
            ? <StockedColumChart data={languages} />
            : <div>No Language Data Found</div>}
        </div>
        <div className="flex items-center justify-center w-4/12 mx-5 h-48 bg-white rounded-2xl">
          <RoleYearlyDistribution />
        </div>
      </div>
    </div>
  );
}

export default DeveloperLandingPageSummary;
