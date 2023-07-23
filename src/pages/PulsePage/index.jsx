import React from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import makeRequest from '../../utils/makeRequest';
import { HOME_ROUTE } from '../../constants/routes';
import { PULSE_API_POST } from '../../constants/apiEndpoints';

function PulsePage() {
  const [error, setErr] = React.useState(null);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const pulse = query.get('pulse');
    const projectId = query.get('project_id');
    const username = query.get('username');
    if (token !== null) {
      const decodedToken = decodeToken(token);
      const name = decodedToken.username;
      if (name !== username) {
        setErr('You are not allowed to report this pulse');
      }
      makeRequest(PULSE_API_POST, { data: { pulse, project_id: projectId, username } }, { headers: { 'x-auth-token': token } })
        .then((res) => {
          console.log(res, 'res');
        })
        .catch((err) => {
          setErr(err.response.data.message);
        });
    } else {
      navigate(HOME_ROUTE);
    }
  }, []);
  return error
    ? (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Something Went Wrong</h1>
        <p className="text-xl">{error}</p>
      </div>
    )
    : (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold">Thanks, Pulse Reported Successfully</h1>
      </div>
    );
}

export default PulsePage;
