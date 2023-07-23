/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RepositoryDialogTable from '../RepositoryDialogTable';

function ProjectDialogThirdForm({ handleSubmitThirdForm, responseRepositoryRows }) {
  const [repositoryRows, setRepositoryRows] = useState(responseRepositoryRows);
  const [repositoryIsInput, setRepositoryIsInput] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <button onClick={() => setRepositoryIsInput(true)} type="button" className="rounded-3xl border-2 text-md text-button-primary bg-white my-3 py-2 w-36 h-11"> Add Repository </button>
      <RepositoryDialogTable
        repositoryRows={repositoryRows}
        setRepositoryRows={setRepositoryRows}
        repositoryIsInput={repositoryIsInput}
        setRepositoryIsInput={setRepositoryIsInput}
      />
      <div className="flex justify-end my-3">
        <button onClick={() => { handleSubmitThirdForm(repositoryRows); }} type="submit" className="rounded-3xl border-2 text-md text-white bg-button-hover py-2 w-36 h-11">Submit</button>
      </div>
    </div>
  );
}

ProjectDialogThirdForm.propTypes = {
  handleSubmitThirdForm: PropTypes.func.isRequired
};

export default ProjectDialogThirdForm;
