import React from 'react';
import CountUp from 'react-countup';
import PropTypes from 'prop-types';
import pr from '../../assets/icons/pr2.png';

function OpenPRs({ openpr, color }) {
  const iconStyle = color ? { filter: 'grayscale(100%)' } : {};

  return (
    <div className="flex flex-row">
      <img src={pr} alt="pr" className="h-10 w-10 " style={iconStyle} />
      <p className="text-2xl  self-start">
        <CountUp end={openpr} duration={9} />
        {' '}
      </p>
    </div>
  );
}

OpenPRs.propTypes = {
  openpr: PropTypes.number.isRequired,
  color: PropTypes.bool.isRequired
};

export default OpenPRs;
