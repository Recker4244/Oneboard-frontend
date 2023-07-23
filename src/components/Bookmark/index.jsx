/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { React, useState, useEffect } from 'react';
import { GrAdd } from 'react-icons/gr';
import Box from '@mui/material/Box';
import { Input, Tooltip } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import makeRequest from '../../utils/makeRequest';
import { GET_BOOKMARKS, CREATE_BOOKMARK } from '../../constants/apiEndpoints';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2
};

function Bookmark() {
  const [bookmarks, setBookmarks] = useState([]);
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('');
  const [name, setName] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const notify = () => toast.error('Invalid link', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

  const { id } = useParams();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    makeRequest(GET_BOOKMARKS(id), {}, { headers: { 'x-auth-token': token } })
      .then((response) => {
        setBookmarks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    if (!link) {
      notify();
    } else {
      makeRequest(CREATE_BOOKMARK(id), { data: { link, name } }, { headers: { 'x-auth-token': token } })
        .then((response) => {
          setBookmarks([...bookmarks, response.data]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setOpen(false);
  };

  const handleLink = (e) => {
    setLink(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="flex flex-row gap-3 overflow-scroll text-ellipsis whitespace-nowrap w-full [&::-webkit-scrollbar]:hidden" data-testid="bookmark">
      {bookmarks && bookmarks?.map((bookmark) => (
        <Tooltip title={`${bookmark.link}`}>
          <a href={`${bookmark.link}`} target="_blank" rel="noreferrer">
            <div className="flex flex-row items-center justify-center p-2  rounded-xl bg-white  ">
              <img className="" src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.link}`} alt="favicon" />
              <p className="ml-1 w-32 overflow-hidden text-ellipsis whitespace-nowrap">{bookmark.name || bookmark.link}</p>
            </div>
          </a>
        </Tooltip>
      ))}

      <div onClick={handleOpen} className="flex rounded-sm justify-center items-center cursor-pointer self-center sticky right-0 bg-slate-100 m-2 h-full px-2"><GrAdd margin="2" /></div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <h1 className="p-2 text-xl font-bold text-McKinseyBlue">Add Bookmark</h1>
              <CloseIcon onClick={handleClose} className="cursor-pointer" />
            </div>
            <div className="flex flex-col justify-between p-2">
              <Input placeholder="Link" onChange={handleLink} type="text" required />
            </div>
            <div className="flex flex-col justify-between p-2">

              <Input placeholder="Name" onChange={handleName} type="text" />
            </div>
            <div className="flex flex-row justify-end p-2">
              <button onClick={handleClick} className="rounded-3xl border-2 text-sm   bg-button-hover text-white w-36 h-10">Add</button>
            </div>
          </div>
        </Box>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Bookmark;

