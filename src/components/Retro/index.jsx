/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-named-as-default-member
import RetroDetails from '../RetroDetails';
import BouncingDotsLoader from '../BouncingDotsLoader';
import './Retro.css';

function Retro(retro) {
  const { retroData, role } = retro;
  const [imageSrc, setImageSrc] = React.useState(`${retroData.image_path}`);
  // const [imageNotFound, setImageNotFound] = React.useState(false);

  const handleImageError = () => {
    setImageSrc('https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg');
  };
  const [click, setClick] = React.useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  if (click) {
    return <RetroDetails retroBoard={retroData} click={click} setClick={setClick} role={role} />;
  }
  return retroData ? (
    <div className="retro-image">
      <img src={imageSrc} alt="retro" onError={handleImageError} className="retro-up" onClick={handleClick} />
      <h2 className="retro-down" data-testid="retro-data">{retroData.title}</h2>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-24" data-testid="bouncing-dots-loader">
      <BouncingDotsLoader />
    </div>
  );
}

export default Retro;
