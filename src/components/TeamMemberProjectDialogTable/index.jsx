/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
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
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';

function createData(username, role, keyMember, startDate, endDate, cost) {
  return {
    username, role, keyMember, startDate, endDate, cost
  };
}

export default function CustomizedTables({
  allUsers, teamMemberRows, setTeamMemberRows, teamMembersIsInput, setTeamMembersIsInput,
  responseTeam
}) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [keyMember, setKeyMember] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [cost, setCost] = useState('');
  const [inputIndex, setInputIndex] = useState(-1);

  const [usernameOptions, setUsernameOptions] = useState([]);

  useEffect(() => {
    if (responseTeam.length > 0) {
      const teamMembers = responseTeam.map((teamMember) => createData(
        teamMember.username,
        teamMember.role,
        teamMember.key_status,
        teamMember.start_date,
        teamMember.end_date,
        teamMember.cost
      ));
      const usernames = responseTeam.map((user) => user.username);
      setUsernameOptions(usernames);
      setTeamMemberRows(teamMembers);
    }
  }, [responseTeam]);

  const handleSubmit = () => {
    setTeamMemberRows(
      [
        ...teamMemberRows,
        createData(username, role, keyMember, startDate, endDate, cost)
      ]
    );
    setUsername('');
    setRole('');
    setKeyMember(false);
    setStartDate('');
    setEndDate('');
    setCost('');
    setTeamMembersIsInput(false);
  };

  const handleCellClick = (event) => {
    const row = event.target.closest('tr');
    const rowIndex = row.rowIndex - 1; // subtract 1 to account for table header
    setUsername(teamMemberRows[rowIndex].username);
    setRole(teamMemberRows[rowIndex].role);
    setKeyMember(teamMemberRows[rowIndex].keyMember);
    setStartDate(teamMemberRows[rowIndex].startDate);
    setEndDate(teamMemberRows[rowIndex].endDate);
    setCost(teamMemberRows[rowIndex].cost);
    setInputIndex(rowIndex);
  };

  const handleEditSubmit = () => {
    const newRows = [...teamMemberRows];
    newRows[inputIndex] = createData(username, role, keyMember, startDate, endDate, cost);
    setTeamMemberRows(newRows);
    setInputIndex(-1);
  };

  const allUsernameOptions = allUsers.map((item) => ({ label: item.username }));

  const rolesOptions = [
    {
      label: 'Frontend developer'
    },
    {
      label: 'Backend developer'
    },
    {
      label: 'Fullstack developer'
    },
    {
      label: 'DevOps/Cloud engineer'
    },
    {
      label: 'Team lead'
    },
    {
      label: 'Tester'
    },
    {
      label: 'Architect'
    },
    {
      label: 'Product Owner'
    },
    {
      label: 'ED'
    },
    {
      label: 'EM'
    }
  ];

  return (teamMemberRows.length !== 0 || teamMembersIsInput) ? (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead className="bg-McKinseyBlue">
          <TableRow>
            <TableCell style={{ color: 'white' }}>Username</TableCell>
            <TableCell style={{ color: 'white' }}>Role</TableCell>
            <TableCell style={{ color: 'white' }}>Key Member</TableCell>
            <TableCell style={{ color: 'white' }}>Start Date</TableCell>
            <TableCell style={{ color: 'white' }}>End Date</TableCell>
            <TableCell style={{ color: 'white' }}>Cost (in $)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            teamMemberRows.map((row) => (teamMemberRows.indexOf(row) === inputIndex
              ? (
                <TableRow>
                  <TableCell sx={{ width: 150 }}><Input defaultValue={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" sx={{ padding: '15px 0px 0px' }} /></TableCell>
                  <TableCell sx={{ width: 200 }}>
                    <Autocomplete
                      options={rolesOptions}
                      onChange={(e, value) => setRole(value.label)}
                      id="disable-clearable"
                      disableClearable
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Roles"
                          variant="standard"
                        />
                      )}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ width: 125 }}><Input checked={keyMember} onChange={(e) => setKeyMember(e.target.checked)} type="checkbox" className="border-2 border-grey rounded w-16 h-6 px-1 mt-5" /></TableCell>
                  <TableCell sx={{ width: 150 }}><Input placeholder="Start Date" defaultValue={startDate} onChange={(e) => setStartDate(e.target.value)} type="date" sx={{ padding: '15px 0px 0px' }} /></TableCell>
                  <TableCell sx={{ width: 150 }}><Input placeholder="End Date" defaultValue={endDate} onChange={(e) => setEndDate(e.target.value)} type="date" sx={{ padding: '15px 0px 0px' }} /></TableCell>
                  <TableCell>
                    <div className="flex">
                      <Input defaultValue={cost} onChange={(e) => setCost(e.target.value)} type="number" placeholder="Cost" sx={{ padding: '15px 0px 0px', width: 100 }} />
                      <div className="flex items-end pb-3">
                        <button className="mx-1" onClick={() => setInputIndex(-1)} type="button"><CloseIcon style={{ height: 20 }} /></button>
                        <button onClick={handleEditSubmit} type="button" style={{ color: 'blue' }}><CheckIcon style={{ height: 20 }} /></button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )
              : (
                <TableRow key={row.name}>
                  <TableCell sx={{ width: 150 }}>{row.username}</TableCell>
                  <TableCell sx={{ width: 200 }}>{row.role}</TableCell>
                  <TableCell align="center" sx={{ width: 125 }}><input disabled="true" checked={row.keyMember} onChange={(e) => setKeyMember(e.target.checked)} type="checkbox" className="border-2 border-grey rounded w-16 h-6 px-1" /></TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>
                    <div className="flex justify-between items-center">
                      {row.cost}
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
            teamMembersIsInput && (
              <TableRow>
                <TableCell sx={{ width: 150 }}>
                  <Autocomplete
                    required
                    options={allUsernameOptions}
                    onChange={(e, value) => { setUsername(value.label); }}
                    id="disable-clearable"
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Username"
                        variant="standard"
                      />
                    )}
                  />
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <Autocomplete
                    options={rolesOptions}
                    onChange={(e, value) => setRole(value.label)}
                    id="disable-clearable"
                    disableClearable
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Role"
                        variant="standard"
                      />
                    )}
                  />
                </TableCell>
                <TableCell align="center" sx={{ width: 125 }}><input checked={keyMember} onChange={(e) => { console.log(e.target.checked); setKeyMember(e.target.checked); }} type="checkbox" className="border-2 border-grey rounded w-16 h-6 px-1 mt-5" /></TableCell>
                <TableCell sx={{ width: 150 }}>
                  <Input
                    placeholder="Start Date"
                    onChange={(e) => setStartDate(e.target.value)}
                    type="date"
                    sx={{ padding: '15px 0px 0px' }}
                  />
                </TableCell>

                <TableCell sx={{ width: 150 }}>
                  <Input
                    onChange={(e) => setEndDate(e.target.value)}
                    placeholder="End Date"
                    type="date"
                    sx={{ padding: '15px 0px 0px' }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <Input onChange={(e) => setCost(e.target.value)} type="number" placeholder="Cost" sx={{ padding: '15px 0px 0px' }} />
                    <div className="flex items-end pb-3">
                      <button className="mx-1" onClick={() => setTeamMembersIsInput(false)} type="button"><CloseIcon style={{ height: 20 }} /></button>
                      <button onClick={handleSubmit} type="button" style={{ color: 'blue' }}><CheckIcon style={{ height: 20 }} /></button>
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
    <div className="flex flex-col justify-center items-center">
      <div>
        No team members added!
      </div>
      <div>
        Add team members.
      </div>
    </div>
  );
}

CustomizedTables.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  teamMemberRows: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTeamMemberRows: PropTypes.func.isRequired,
  teamMembersIsInput: PropTypes.bool.isRequired,
  setTeamMembersIsInput: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  responseTeam: PropTypes.arrayOf(PropTypes.object)
};

CustomizedTables.defaultProps = {
  responseTeam: []
};

