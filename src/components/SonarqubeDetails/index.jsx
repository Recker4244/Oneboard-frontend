/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import { decodeToken } from 'react-jwt';
import makeRequest from '../../utils/makeRequest';
import { DETAIL } from '../../constants/apiEndpoints';
import WidgetInfo from '../WidgetInfo';
import BouncingDotsLoader from '../BouncingDotsLoader';

function SonarqubeDetails() {
  const [sonarData, setSonarData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  if (token === null) {
    navigate('/login');
  }
  const { role } = decodeToken(token);
  React.useEffect(() => {
    makeRequest(DETAIL(id), {}, { headers: { 'x-auth-token': token } })
      .then((res) => {
        setLoading(true);
        setSonarData(res);
      }).catch((err) => {
        setLoading(true);
        setError(err);
      });
  }, []);

  const matrixBox = (color, text) => {
    let c = 'red';
    let t = 'A';
    if (color > 4) { c = 'bg-red'; t = 'E'; } else if (color > 3) { c = 'bg-red'; t = 'D'; } else if (color === 3) { c = 'bg-yellow'; t = 'C'; } else if (color < 1) { c = 'bg-green'; t = 'B'; } else if (color >= 1) { c = 'bg-green'; t = 'A'; }
    return (
      <div className="flex items-center p-1 px-2">
        <div className={`${c}  mr-2 w-4 h-4 rounded-full flex justify-center`}>
          <p className="text-xs">{t}</p>
        </div>
        <h1>{text}</h1>
      </div>
    );
  };
  const nameBox = (text, url) => (
    <div className="flex justify-between p-1">
      <h1 className="text-2xl font-light">{text}</h1>
      <a href={url} target="_blank" rel="noreferrer"><FaLink className="text-[#040b81]" /></a>
    </div>
  );
  // eslint-disable-next-line no-unused-vars
  const allContent = (name, maintainability, reliability, security, securityreview, sonar, git) => (
    <div className="flex flex-col my-2 mr-1 bg-light_blue mx-4 w-[96%]">
      <div className="bg-[#040b81] h-2 w-full" />
      <div className="p-2 flex-1 w-full">
        {nameBox(name, git)}

        <div className="bg-white p-2 flex flex-col font-extralight w-full text-base">
          <div className="flex justify-between">
            {/* <p href={sonar} className="font-bold ">Sonarqube Report Overview</p> */}
            {sonar !== null && <a href={sonar} className="font-bold " target="_blank" rel="noreferrer">Sonarqube Overview</a>}
          </div>
          {maintainability !== null ? (
            <div className="flex justify-between py-1">
              {matrixBox(reliability, 'Reliability')}
              {matrixBox(securityreview, 'Security Review')}
              {matrixBox(maintainability, 'Maintainability')}
              {matrixBox(security, 'Security')}
            </div>
          )
            : (<div className="w-full"><h1 className="text-center font-bold text-[#878787]">No SonarQube Data</h1></div>)}
        </div>

      </div>
    </div>
  );

  return loading ? (

    <div className="bg-white flex flex-col w-full h-[430px]">
      <div className="flex justify-between">
        <h1 className="font-bold flex text-[#040b81] text-2xl">
          Repositories
          {' '}
          <WidgetInfo widgetName="repositories" />
        </h1>
      </div>
      <div className="flex flex-wrap overflow-y-scroll">
        { error
          ? <h1>Loading...</h1>
          : sonarData.map((i) => (role === 'leadership' || role === 'developer'
            ? (
              <div className="w-1/2 pr-8 ">
                {allContent(i.link_name, i.maintainability, i.reliability, i.security, i.security_review, i.sonar_url, i.git_url)}
              </div>
            )
            : (
              <div className="w-full">
                {allContent(i.link_name, i.maintainability, i.reliability, i.security, i.security_review, i.sonar_url, i.git_url)}
              </div>
            )))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-24">
      <BouncingDotsLoader />
    </div>
  );
}

export default SonarqubeDetails;
