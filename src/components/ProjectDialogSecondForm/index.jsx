/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SupplementaryCostTable from '../../SupplementaryCostTable';
import TeamMemberProjectDialogTable from '../TeamMemberProjectDialogTable';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function ProjectDialogSecondForm({
  allUsers, setActiveStep, handleSubmitSecondForm, responseTeam, responseCost
}) {
  // eslint-disable-next-line no-unused-vars
  const [teamMemberRows, setTeamMemberRows] = useState([]);
  const [teamMembersIsInput, setTeamMembersIsInput] = useState(false);
  const [supplementaryCostRows, setSupplementaryCostRows] = useState([]);
  const [supplementaryCostIsInput, setSupplementaryCostIsInput] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamMemberRows.length === 0) {
      toast.error('Please add atleast one member!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      });
      return;
    }
    handleSubmitSecondForm(teamMemberRows, supplementaryCostRows);
    setActiveStep(2);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`
    };
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Team Members" {...a11yProps(0)} />
              <Tab label="Project Expenditure" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="flex flex-col w-full">
              <div className="flex justify-end h-16">
                <button onClick={() => setTeamMembersIsInput(true)} type="button" className="rounded-3xl border-2 text-md text-button-primary bg-button-white py-2 w-36 h-11">
                  Add member
                </button>
              </div>
              <div>
                <TeamMemberProjectDialogTable
                  allUsers={allUsers}
                  responseTeam={responseTeam}
                  teamMemberRows={teamMemberRows}
                  setTeamMemberRows={setTeamMemberRows}
                  teamMembersIsInput={teamMembersIsInput}
                  setTeamMembersIsInput={setTeamMembersIsInput}
                />
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className="flex flex-col ml-1">
              <div className="flex justify-end h-16">
                <button onClick={() => setSupplementaryCostIsInput(true)} type="button" className="rounded-3xl border-2 text-md text-button-primary bg-button-white py-2 w-36 h-11">
                  Add Cost
                </button>
              </div>
              <div>
                <SupplementaryCostTable
                  responseCost={responseCost}
                  supplementaryCostRows={supplementaryCostRows}
                  setSupplementaryCostRows={setSupplementaryCostRows}
                  supplementaryCostIsInput={supplementaryCostIsInput}
                  setSupplementaryCostIsInput={setSupplementaryCostIsInput}
                />
              </div>
            </div>
          </TabPanel>
        </Box>
      </div>
      <div className="flex justify-end my-3">
        <button onClick={handleSubmit} type="submit" className="rounded-3xl border-2 text-md text-white bg-button-hover py-2 mr-5 w-36 h-11">Continue</button>
      </div>
      <ToastContainer />
    </div>
  );
}

ProjectDialogSecondForm.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  handleSubmitSecondForm: PropTypes.func.isRequired,
  responseTeam: PropTypes.arrayOf(PropTypes.object),
  responseCost: PropTypes.arrayOf(PropTypes.object)
};

ProjectDialogSecondForm.defaultProps = {
  responseTeam: [],
  responseCost: []
};

export default ProjectDialogSecondForm;
