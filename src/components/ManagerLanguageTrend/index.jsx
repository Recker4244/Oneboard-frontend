import React from 'react';
import { decodeToken } from 'react-jwt';
import StockedColumChart from '../LanguageTrend';
import BouncingDotsLoader from '../BouncingDotsLoader';
import makeRequest from '../../utils/makeRequest';
import { GET_MANAGER_LANGUAGE_USAGE } from '../../constants/apiEndpoints';

function ManagerLanguageTrend() {
  const decodedToken = decodeToken(localStorage.getItem('accessToken'));
  const [languages, setLanguages] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    makeRequest(GET_MANAGER_LANGUAGE_USAGE(decodedToken.username), {}, {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken')
      }
    })
      .then((response) => {
        setLanguages(response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) {
    return <BouncingDotsLoader />;
  }
  // console.log(decodedToken.github);
  return (
    <div className="flex" style={{ width: '100%', height: '100%' }}>
      <StockedColumChart data={languages} />
    </div>
  );
}

export default ManagerLanguageTrend;
