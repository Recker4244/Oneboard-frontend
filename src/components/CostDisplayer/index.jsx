/* eslint-disable jsx-a11y/no-static-element-interactions */
import { React, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';
import { GET_SUPPLEMENTARY_COST, GET_PERSONAL_COST } from '../../constants/apiEndpoints';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3
};

function CostDisplayer() {
  const token = localStorage.getItem('accessToken');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [supplementaryCost, setSupplementaryCost] = useState();
  const [totalSupplementaryCost, setTotalSupplementaryCost] = useState(0);
  const [personalCost, setPersonalCost] = useState();

  const { id } = useParams();

  useEffect(() => {
    makeRequest(GET_SUPPLEMENTARY_COST(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setSupplementaryCost(response.data[0]);
        setTotalSupplementaryCost(response.data[1]);
      });

    makeRequest(GET_PERSONAL_COST(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setPersonalCost(response.data);
      });
  }, []);

  return totalSupplementaryCost > 0 ? (
    <div className="relative justify-center self-center">
      <div className="flex flex-col bg-white mx-4 my-3 p-3 rounded-2xl">
        <p>
          {' '}
          <span className="font-bold text-2xl">
            $
            {' '}
            {personalCost + totalSupplementaryCost}
          </span>
          {' '}
          <span className="text-gray-400 text-xl">
            (
            {personalCost}
            {' '}
            +
            {' '}
            {totalSupplementaryCost}
            )
          </span>
        </p>
        <p className="text-xs text-gray-400">
          Total cost (Personal Cost +
          {' '}
          <button
            style={{ color: '#1A31E8' }}
            type="button"
            onClick={handleOpen}
          >
            Supplementary Cost

          </button>
          )
          {' '}
        </p>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex flex-col justify-items-start px-2 justify-center">
              <div className="flex flex-row justify-between">
                <div className=" text-2xl mb-2 pb-0.5 font-bold" style={{ color: '#020b81' }}>Supplementary Cost Split</div>
                <div className="flex flex-row cursor-pointer"><CloseIcon onClick={handleClose} /></div>
              </div>

              <div className="px-8 py-5 " style={{ backgroundColor: '#f2f9ff' }}>
                <TableContainer component={Paper}>
                  <Table sx={{ Width: 800 }} aria-label="customized table">
                    <TableHead>
                      <TableRow className="bg-McKinseyBlue" style={{ color: 'white' }}>
                        <TableCell style={{ color: 'white' }}>Cost Types</TableCell>
                        <TableCell style={{ color: 'white', paddingRight: '30px' }} align="right">Amount (in $)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {supplementaryCost.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.cost_type}</TableCell>
                          <TableCell align="right" style={{ paddingRight: '30px' }}>{row.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mr-25 pr-16" data-testid="bouncing-dots-loader">
      <BouncingDotsLoader />
    </div>
  );
}

export default CostDisplayer;
