/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Input, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function ProjectDialogFirstForm({
  setActiveStep, handleSubmitFirstForm, response
}) {
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [formattedStartDate, setFormattedStartDate] = useState();
  const [formattedEndDate, setFormattedEndDate] = useState();
  const [projectChargeCodes, setProjectChargeCodes] = useState();

  useEffect(() => {
    if (Object.keys(response).length > 0) {
      setProjectName(response.project_name);
      setProjectDescription(response.description);
      setStartDate(response.start_date);
      setEndDate(response.end_date);
      const formatStartDate = response.start_date.split('T')[0];
      setFormattedStartDate(formatStartDate);
      const formatEndDate = response.end_date.split('T')[0];
      setFormattedEndDate(formatEndDate);
      setProjectChargeCodes(response.charge_codes.join(','));
    }
  }, [response]);

  let startDateObj;
  let endDateObj;

  const handleSubmit = (e) => {
    e.preventDefault();
    startDateObj = new Date(startDate);
    endDateObj = new Date(endDate);
    handleSubmitFirstForm(
      projectName,
      projectDescription,
      startDateObj,
      endDateObj,
      projectChargeCodes?.split(',')?.map((item) => item.trim())
    );
    setActiveStep(1);
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="w-2/3">
        <Input value={projectName} required onChange={(e) => { setProjectName(e.target.value); }} type="text" placeholder="Project Name" className="py-2 my-3 rounded w-full" />
        <Input value={projectDescription} multiline rows={2} onChange={(e) => { setProjectDescription(e.target.value); }} type="text" placeholder="Project Description" className="w-full" />
        <Input value={projectChargeCodes} onChange={(e) => { setProjectChargeCodes(e.target.value); }} type="text" placeholder="Project Charge Codes Seperated By Commas" className="py-2 my-3 rounded w-full" />
        <div className="flex">
          <Input value={formattedStartDate} required onChange={(e) => { setStartDate(e.target.value); }} type="date" placeholder="Project Start Date" className="py-2 mr-3 my-3 rounded w-1/2" />
          <Input value={formattedEndDate} required onChange={(e) => { setEndDate(e.target.value); }} type="date" placeholder="Project Completion Date" className="py-2 ml-3 my-3 rounded w-1/2" />
        </div>
        <div className="flex justify-end my-3">
          <button type="submit" className="rounded-3xl border-2 text-md text-white bg-button-hover w-36 py-2 h-11">Continue</button>
        </div>
      </form>
    </div>
  );
}

ProjectDialogFirstForm.propTypes = {
  setActiveStep: PropTypes.func.isRequired,
  handleSubmitFirstForm: PropTypes.func.isRequired,
  response: PropTypes.objectOf(PropTypes.object)
};

ProjectDialogFirstForm.defaultProps = {
  response: PropTypes.objectOf(PropTypes.object)
};

export default ProjectDialogFirstForm;
