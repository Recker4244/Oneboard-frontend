import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_RETRO } from '../../constants/apiEndpoints';
import Retro from '../Retro';
// import RetroForm from '../RetroForm';
import BouncingDotsLoader from '../BouncingDotsLoader';
import './RetroBoard.css';

function RetroBoard({ role }) {
  const [retro, setRetro] = React.useState([]);
  // const [click, setClick] = React.useState(false);
  const token = localStorage.getItem('accessToken');
  // const projectId = '36f7f7b9-94b9-4083-8732-7023f704399e';
  const { id } = useParams();
  // console.log('id');
  // console.log(id);
  React.useEffect(() => {
    const fetchRetro = async () => {
      const response = await makeRequest(GET_RETRO(id), {}, { headers: { 'x-auth-token': token } });
      setRetro(response);
    };
    fetchRetro();
    console.log('retro');
    console.log(retro);
  }, []);

  return retro.length > 0 ? (
    <div className="retro-board-gallery" data-testid="retro-component">
      {retro && retro.map((retroData) => (

        <Retro retroData={retroData} role={role} />
      ))}
      {/* {click && <RetroForm click={click} setClick={setClick} />} */}
    </div>
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

RetroBoard.propTypes = {
  role: PropTypes.string.isRequired
};

export default RetroBoard;
