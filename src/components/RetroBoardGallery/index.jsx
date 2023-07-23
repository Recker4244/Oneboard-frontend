import React from 'react';
import { useParams } from 'react-router-dom';
import makeRequest from '../../utils/makeRequest';
import { GET_RETRO } from '../../constants/apiEndpoints';
import Retro from '../Retro';
import RetroForm from '../RetroForm';
import BouncingDotsLoader from '../BouncingDotsLoader';
import './RetroBoardGallery.css';

function RetroBoardGallery() {
  const [retro, setRetro] = React.useState([]);
  const [click, setClick] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  // const projectId = '36f7f7b9-94b9-4083-8732-7023f704399e';
  const token = localStorage.getItem('accessToken');
  const { id } = useParams();
  // console.log('id');
  // console.log(id);
  React.useEffect(() => {
    const fetchRetro = async () => {
      const response = await makeRequest(GET_RETRO(id), {}, { headers: { 'x-auth-token': token } });
      setRetro(response);
      setLoading(false);
    };
    fetchRetro();
  }, []);

  // console.log(retro);

  const handleClick = () => {
    setClick(!click);
    // window.location.reload();
  };

  return (
    <div className="retro-board-gallery">
      <div className="retro-add-button" data-testid="button-click">
        <button type="button" className="retro-button" onClick={handleClick}>
          <span className="icon" data-testid="add-icon">+</span>
          <span className="retro-board-content" data-testid="retro-button">Add New Retro Board Snapshot</span>
        </button>
      </div>
      {/* {retro && retro.map((retroData) => (

        <Retro retroData={retroData} />
      ))} */}
      {!loading ? (
        <>
          {retro && retro.map((retroData) => (
            <Retro key={retroData.id} retroData={retroData} />
          ))}
          {click && <RetroForm click={click} setClick={setClick} />}
        </>
      ) : (
        <div className="flex justify-center items-center mt-16 ml-24" data-testid="bouncing-dots-loader">
          <BouncingDotsLoader />
        </div>
      )}

      {/* </div> */}
      {click && <RetroForm click={click} setClick={setClick} />}
    </div>
  );
}

export default RetroBoardGallery;
