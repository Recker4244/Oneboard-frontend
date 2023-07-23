/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { FaRegEdit } from 'react-icons/fa';
import { Input } from '@mui/material';

function createData(name, link, baseUrl, projectKey, token) {
  return {
    name, link, baseUrl, projectKey, token
  };
}

function RepositoryDialogTable({
  repositoryRows, setRepositoryRows, repositoryIsInput, setRepositoryIsInput
}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [baseUrl, setBaseUrl] = useState('');
  const [projectKey, setProjectKey] = useState('');
  const [token, setToken] = useState('');
  const [inputIndex, setInputIndex] = useState(-1);

  useEffect(() => {
    setRepositoryRows(repositoryRows.map((item) => createData(
      item.link_name,
      item.url,
      item.base_url,
      item.sonar_project_key,
      item.token
    )));
  }, []);

  const handleSubmit = () => {
    setRepositoryRows(
      [
        ...repositoryRows,
        createData(name, link, baseUrl, projectKey, token)
      ]
    );
    setName('');
    setLink('');
    setBaseUrl('');
    setProjectKey('');
    setToken('');
    setRepositoryIsInput(false);
  };

  const handleCellClick = (event) => {
    const row = event.target.closest('tr');
    const rowIndex = row.rowIndex - 1; // subtract 1 to account for table header
    setName(repositoryRows[rowIndex].name);
    setLink(repositoryRows[rowIndex].link);
    setBaseUrl(repositoryRows[rowIndex].baseUrl);
    setProjectKey(repositoryRows[rowIndex].projectKey);
    setToken(repositoryRows[rowIndex].token);
    setInputIndex(rowIndex);
  };

  const handleEditSubmit = () => {
    const newRows = [...repositoryRows];
    newRows[inputIndex] = createData(name, link, baseUrl, projectKey, token);
    setRepositoryRows(newRows);
    setInputIndex(-1);
  };

  return (repositoryRows.length !== 0 || repositoryIsInput) ? (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead className="bg-McKinseyBlue">
          <TableRow>
            <TableCell sx={{ width: 150 }} style={{ color: 'white' }}>Name *</TableCell>
            <TableCell sx={{ width: 200 }} style={{ color: 'white' }}>Link *</TableCell>
            <TableCell style={{ color: 'white' }}>SonarQube Base Url</TableCell>
            <TableCell style={{ color: 'white' }}>SonarQube Project Key</TableCell>
            <TableCell style={{ color: 'white' }}>SonarQube Token</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            repositoryRows.map((row) => (repositoryRows.indexOf(row) === inputIndex
              ? (
                <TableRow>
                  <TableCell><Input required defaultValue={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /></TableCell>
                  <TableCell><Input required defaultValue={link} onChange={(e) => setLink(e.target.value)} type="text" placeholder="Link" /></TableCell>
                  <TableCell><Input defaultValue={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} type="text" placeholder="Base Url" /></TableCell>
                  <TableCell><Input defaultValue={projectKey} onChange={(e) => setProjectKey(e.target.value)} type="text" placeholder="Project Key" /></TableCell>
                  <TableCell>
                    <div className="flex justify-between">
                      <Input defaultValue={token} onChange={(e) => setToken(e.target.value)} type="password" placeholder="Token" />
                      <div className="flex">
                        <button className="mx-1" onClick={() => setRepositoryIsInput(false)} type="button"><CloseIcon /></button>
                        <button onClick={handleEditSubmit} type="button" style={{ color: 'blue' }}><CheckIcon /></button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )
              : (
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.link}</TableCell>
                  <TableCell>{row.baseUrl}</TableCell>
                  <TableCell>{row.projectKey}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center">
                      <div className="text-security-disc">
                        {row.token.replace(/./g, '\u2022')}
                      </div>
                      <button type="button" onClick={handleCellClick}>
                        <FaRegEdit style={{ color: 'blue' }} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            ))
          }
          {
            repositoryIsInput && (
              <TableRow>
                <TableCell><Input required onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" /></TableCell>
                <TableCell><Input required onChange={(e) => setLink(e.target.value)} type="text" placeholder="Link" /></TableCell>
                <TableCell><Input onChange={(e) => setBaseUrl(e.target.value)} placeholder="Base Url" type="text" /></TableCell>
                <TableCell><Input onChange={(e) => setProjectKey(e.target.value)} placeholder="Project Key" type="text" /></TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <Input onChange={(e) => setToken(e.target.value)} type="password" placeholder="Token" />
                    <div className="flex">
                      <button className="mx-1" onClick={() => setRepositoryIsInput(false)} type="button"><CloseIcon /></button>
                      <button onClick={handleSubmit} type="button" style={{ color: 'blue' }}><CheckIcon /></button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div className="flex self-center">
      No repository added!
    </div>
  );
}

RepositoryDialogTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  repositoryRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  setRepositoryRows: PropTypes.func.isRequired,
  repositoryIsInput: PropTypes.bool.isRequired,
  setRepositoryIsInput: PropTypes.func.isRequired
};

export default RepositoryDialogTable;
