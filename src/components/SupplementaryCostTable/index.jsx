/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaRegEdit } from 'react-icons/fa';
import { Input } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

function createData(type, amount) {
  return {
    type, amount
  };
}

export default function CustomizedTables({
  supplementaryCostRows, setSupplementaryCostRows,
  supplementaryCostIsInput, setSupplementaryCostIsInput
}) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [inputIndex, setInputIndex] = useState(-1);

  const handleSubmit = () => {
    setSupplementaryCostRows(
      [
        ...supplementaryCostRows,
        createData(type, amount)
      ]
    );
    setType('');
    setAmount('');
    setSupplementaryCostIsInput(false);
  };

  const handleCellClick = (event) => {
    const row = event.target.closest('tr');
    const rowIndex = row.rowIndex - 1; // subtract 1 to account for table header
    setType(supplementaryCostRows[rowIndex].type);
    setAmount(supplementaryCostRows[rowIndex].amount);
    setInputIndex(rowIndex);
  };

  const handleEditSubmit = () => {
    const newRows = [...supplementaryCostRows];
    newRows[inputIndex] = createData(type, amount);
    setSupplementaryCostRows(newRows);
    setInputIndex(-1);
  };

  return (supplementaryCostRows.length !== 0 || supplementaryCostIsInput) ? (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead className="bg-McKinseyBlue">
          <TableRow>
            <TableCell style={{ color: 'white' }}>Type</TableCell>
            <TableCell style={{ color: 'white' }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          supplementaryCostRows.map((row) => (supplementaryCostRows.indexOf(row) === inputIndex
            ? (
              <TableRow>
                <TableCell><Input required defaultValue={type} onChange={(e) => setType(e.target.value)} type="text" placeholder="Type" /></TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <Input required defaultValue={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" />
                    <div className="flex">
                      <button className="mx-1" onClick={() => setInputIndex(-1)} type="button"><CloseIcon /></button>
                      <button onClick={handleEditSubmit} type="button" style={{ color: 'blue' }}><CheckIcon /></button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )
            : (
              <TableRow>
                <TableCell>{row.type}</TableCell>
                <TableCell>
                  <div className="flex justify-between items-center">
                    {row.amount}
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
            supplementaryCostIsInput && (
              <TableRow>
                <TableCell><Input required onChange={(e) => setType(e.target.value)} type="text" placeholder="Type" /></TableCell>
                <TableCell>
                  <div className="flex justify-between">
                    <Input required onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount" />
                    <div className="flex">
                      <button className="mx-1" onClick={() => setSupplementaryCostIsInput(false)} type="button"><CloseIcon /></button>
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
    <div className="flex justify-center items-center">
      No supplementary cost added!
    </div>
  );
}

CustomizedTables.propTypes = {
  supplementaryCostRows: PropTypes.number.isRequired,
  setSupplementaryCostRows: PropTypes.func.isRequired,
  supplementaryCostIsInput: PropTypes.bool.isRequired,
  setSupplementaryCostIsInput: PropTypes.func.isRequired
};

