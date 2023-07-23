/* eslint-disable react/jsx-boolean-value */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/prop-types */
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
// import CloseIcon from '@mui/icons-material/Close';
import Bookmark from '../Bookmark';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import ProjectDialog from '../ProjectDialog';
import { GET_PROJECT_BY_ID, UPDATE_CHARGE_CODES } from '../../constants/apiEndpoints';

function DeepdivePageHeader({ role, children }) {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openEditProjectDialog, setOpenEditProjectDialog] = useState(false);
  const [project, setProject] = useState();
  const token = localStorage.getItem('accessToken');
  const { id } = useParams();

  useEffect(() => {
    makeRequest(GET_PROJECT_BY_ID(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setProject(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return project ? (
    <div className="flex flex-col bg-slate-100 mx-12 my-7 sticky top-0 z-10">
      <div className="flex flex-row justify-between items-center border-b-2 border-white">
        <div className="flex flex-col mx-4">
          <div>
            <div className="text-4xl font-bold flex flex-row justify justify-between items-center">
              {project.project_name}
              <button type="button" onClick={() => { setOpenEditProjectDialog(true); }} className="ml-4"><FaEdit style={{ color: 'blue' }} size={28} /></button>
              { openEditProjectDialog && <ProjectDialog setIsDialogOpen={setOpenEditProjectDialog} isEdit={true} id={id} /> }
            </div>
            <p className="mt-2 ml-0 mr-0 mb-0 text-sm text-grey">CC(s): {project.charge_codes.map((chargeCodes, index) => ((index === 0) ? ` ${chargeCodes}` : ` | ${chargeCodes}`))}</p>
          </div>
          {/* <p className="text-xs text-blue-700">Sprint 2</p> */}
        </div>
        {children}
      </div>
      <div className="p-3 flex flex-row ">
        <Bookmark />
      </div>
    </div>
  ) : (
    <div className="flex mt-8 ml-24" data-testid="bouncing-dots-loader">
      <BouncingDotsLoader />
    </div>
  );
}

export default DeepdivePageHeader;
