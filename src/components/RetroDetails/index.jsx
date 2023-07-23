/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import './RetroDetails.css';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';
import RetroUpdate from '../RetroUpdate';

function RetroDetails(props) {
  const {
    retroBoard, click, setClick, role
  } = props;
  const [edit, setEdit] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(`${retroBoard.image_path}`);
  const [imageNotFound, setImageNotFound] = React.useState(false);

  const handleImageError = () => {
    if (!imageNotFound) {
      setImageNotFound(true);
      setImageSrc('https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg');
    }
  };
  // console.log(retroBoard);
  // console.log(role);
  // console.log(click);
  const editRetroHandler = () => {
    setEdit(!edit);
  };

  const handleClick = () => {
    setClick(!click);
  };
  return (
    <div className="retro-form z-50">
      <div className="retro-form-content">
        <div className="retro-form-heading">
          <div className="retro-title-left-icon">
            <div data-testid="detail-title">{retroBoard.title}</div>
            {role !== 'developer' && <button type="button" onClick={editRetroHandler} data-testid="edit-icon"><EditIcon sx={{ fontSize: 30, fontWeight: 900 }} /></button>}
            {/* <button type="button" onClick={editRetroHandler}><EditIcon sx={{ fontSize: 30, fontWeight: 900 }} /></button> */}

          </div>
          <button type="button" className="cancel-button-retro" onClick={handleClick} data-testid="close-detail"><CloseRoundedIcon sx={{ fontSize: 40, fontWeight: 900 }} /></button>
        </div>
        <div className="retro-form-body-details">
          <div className="image">
            <img
              src={imageSrc}
              alt="retro"
              onError={handleImageError}
              data-testid="detail-image"
            />
          </div>
          <vr />
          <div className="retro-details-right">
            <h1>ACTION ITEMS</h1>

            <ul className="action-items-details" data-testid="detail-action-items">
              {retroBoard.action_items.map((actions) => (
                <li className="actions">{actions}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {edit && <RetroUpdate id={retroBoard.id} retroBoard={retroBoard} edit={edit} setEdit={setEdit} click={click} setClick={setClick} />}
    </div>
  );
}
RetroDetails.propTypes = {
  retroBoard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image_path: PropTypes.string.isRequired,
    action_items: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,
  click: PropTypes.func.isRequired,
  setClick: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
};

export default RetroDetails;
