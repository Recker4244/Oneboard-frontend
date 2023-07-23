/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import {
  Dialog, DialogContent, DialogTitle, Step, StepButton, Stepper
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import {
  CREATE_PROJECT, GET_ALL_USERS, GET_PROJECT_BY_ID,
  GET_REPOS, GET_SUPPLEMENTARY_COST, GET_TEAM_MEMBERS, UPDATE_PROJECT
} from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';
import ProjectDialogFirstForm from '../ProjectDialogFirstForm';
import ProjectDialogSecondForm from '../ProjectDialogSecondForm';
import ProjectDialogThirdForm from '../ProjectDialogThirdForm';

function ProjectDialog({ setIsDialogOpen, isEdit = false, id }) {
  const token = localStorage.getItem('accessToken');
  // const isStringValid = (str) => {
  //   if (str.length > 0) {
  //     return true;
  //   }
  //   return false;
  // };
  // const [projectName, setProjectName] = React.useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectChargeCodes, setProjectChargeCodes] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamMemberRows, setTeamMemberRows] = useState([]);
  const [supplementaryCostRows, setSupplementaryCostRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [repositoryRows, setRepositoryRows] = useState([]);
  const [responseProject, setResponseProject] = useState({});
  const [responseTeamMembers, setResponseTeamMembers] = useState([]);
  const [responseSupplementaryCost, setResponseSupplementaryCost] = useState([]);
  const [responseRepositoryRows, setResponseRepositoryRows] = useState([]);
  const makeRequestToGetBackend = () => {
    makeRequest(GET_PROJECT_BY_ID(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setResponseProject(response);
        makeRequest(GET_TEAM_MEMBERS(id), {}, { headers: { 'x-auth-token': token } }).then(
          (res) => {
            console.log('Team Members Info', res);
            setResponseTeamMembers(res);
          }
        );
        makeRequest(GET_SUPPLEMENTARY_COST(id), {}, { headers: { 'x-auth-token': token } }).then(
          (res) => {
            console.log(res);
            setResponseSupplementaryCost(res.data[0]);
            makeRequest(GET_REPOS(id), {}, { headers: { 'x-auth-token': token } }).then(
              (repoRes) => {
                console.log(repoRes);
                setResponseRepositoryRows(repoRes);
              }
            );
          }
        );
      });
  };
  useEffect(() => {
    if (isEdit) {
      makeRequestToGetBackend();
    }
    makeRequest(GET_ALL_USERS, {}, { headers: { 'x-auth-token': token } })
      .then((res) => {
        setAllUsers(res);
      });
  }, []);
  useEffect(() => {
    if (!isEdit) {
      makeRequest(CREATE_PROJECT, {
        data: {
          project_name: projectName,
          project_description: projectDescription,
          start_date: startDate,
          end_date: endDate,
          charge_codes: projectChargeCodes,
          team_members: teamMemberRows,
          supplementary_costs: supplementaryCostRows,
          repositories: repositoryRows
        }
      }, {
        headers: {
          'x-auth-token': token
        }
      }).then((res) => {
        window.location.reload();
      }).catch((e) => console.log(e));
    } else {
      makeRequest(UPDATE_PROJECT(id), {
        data: {
          project_name: projectName,
          project_description: projectDescription,
          start_date: startDate,
          end_date: endDate,
          charge_codes: projectChargeCodes,
          team_members: teamMemberRows,
          supplementary_costs: supplementaryCostRows,
          repositories: repositoryRows
        }
      }, {
        headers: {
          'x-auth-token': token
        }
      }).then((res) => {
        window.location.reload();
      }).catch((e) => console.log(e));
    }
  }, [repositoryRows]);
  const handleSubmitFirstForm = (name, description, start, end, chargeCodes) => {
    setProjectName(name);
    setProjectDescription(description);
    setStartDate(start);
    setEndDate(end);
    setProjectChargeCodes(chargeCodes);
  };
  const handleSubmitSecondForm = (teamMembers, supplementaryCosts) => {
    setTeamMemberRows(teamMembers);
    setSupplementaryCostRows(supplementaryCosts);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
    setIsDialogOpen(false);
  };
  const handleSubmitThirdForm = async (repositories) => {
    await setRepositoryRows(repositories);
    handleDialogClose();
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleDialogClose}
        fullWidth
        maxWidth={activeStep === 0 ? 'md' : 'lg'}
      >
        <DialogTitle>
          {isEdit ? <div className="text-2xl font-bold">Edit Project</div> : <div className="text-2xl font-bold">Create Project</div>}
        </DialogTitle>
        <DialogContent>
          <Stepper orientation="horizontal" activeStep={activeStep}>
            <Step>
              <StepButton><b>Project Details</b></StepButton>
            </Step>
            <Step>
              <StepButton><b>Logistic Details</b></StepButton>
            </Step>
            <Step>
              <StepButton><b>Repository Details</b></StepButton>
            </Step>
          </Stepper>
          <hr className="mt-8" />
          <div className="bg-dialog-bg p-10 px-8">
            {
              // eslint-disable-next-line no-nested-ternary
              activeStep === 0 ? (
                <div className="flex-col justify-between items-center bg-form-bg p-3 m-2">
                  <ProjectDialogFirstForm
                    response={responseProject}
                    setActiveStep={setActiveStep}
                    handleSubmitFirstForm={handleSubmitFirstForm}
                  />
                </div>
              ) : activeStep === 1 ? (
                <div className="flex-col justify-between items-center bg-form-bg p-3 m-2">
                  <ProjectDialogSecondForm
                    allUsers={allUsers}
                    responseTeam={responseTeamMembers}
                    responseCost={responseSupplementaryCost}
                    setActiveStep={setActiveStep}
                    handleSubmitSecondForm={handleSubmitSecondForm}
                  />
                </div>
              ) : (
                <div className="flex-col justify-between items-center bg-form-bg p-3 m-2">
                  <ProjectDialogThirdForm
                    handleSubmitThirdForm={handleSubmitThirdForm}
                    responseRepositoryRows={responseRepositoryRows}
                  />
                </div>
              )
            }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
ProjectDialog.propTypes = {
  setIsDialogOpen: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  id: PropTypes.string
};
ProjectDialog.defaultProps = {
  isEdit: false,
  id: ''
};
export default ProjectDialog;
