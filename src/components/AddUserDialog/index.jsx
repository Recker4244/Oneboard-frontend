/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Dialog, Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import makeRequest from '../../utils/makeRequest';
import { ADD_USER_URL } from '../../constants/apiEndpoints';
import roles from '../../constants';

function AddUserDialog(props) {
  const {
    isOpen, setOpen, title, onSubmit, oldUser
  } = props;
  const [user, setUser] = React.useState(oldUser);
  const [firstname, setFirstname] = React.useState(user?.name?.split(' ')[0] ?? '');
  const [lastname, setLastname] = React.useState(user?.name?.split(' ')[1] ?? '');
  const [formErrors, setFormErrors] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (formErrors === false) {
      const newUser = { ...user };
      newUser.name = `${firstname} ${lastname}`;
      setUser(newUser);
      setUser({});
      await onSubmit(newUser);
    }
  };

  const validateString = (value) => {
    if (value !== undefined && value.length > 0) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    setFormErrors(false);
    setUser(oldUser);
    setFirstname(oldUser?.name?.split(' ')[0] ?? '');
    setLastname(oldUser?.name?.split(' ')[1] ?? '');
  }, [oldUser]);
  console.log(oldUser);
  return (
    <div className="h-40v">
      <Dialog className="flex flex-col items-center" open={isOpen}>
        <DialogTitle className=" text-center">
          <div className="my-10 font-semibold text-3xl">{title}</div>
        </DialogTitle>
        <div className="bg-slate-50 border-slate-100 mx-10 mb-10">
          <DialogContent
            className="flex flex-row items-center flex-wrap justify-between"
          >
            <TextField
              className="w-48"
              error={validateString(firstname) === false}
              helperText={(oldUser !== {} && validateString(firstname) === false) === true ? 'First Name is required' : ''}
              required
              autoFocus
              onChange={(value) => {
                setFirstname(value.target.value);
              }}
              placeholder="First Name"
              margin="normal"
              id="firstname"
              value={firstname ?? ''}
              type="text"
              variant="outlined"
            />
            <TextField
              error={validateString(lastname) === false}
              helperText={validateString(lastname) === false ? 'Last Name is required' : ''}
              className="w-48"
              autoFocus
              margin="normal"
              id="lastname"
              placeholder="Last Name"
              value={lastname ?? ''}
              type="text"
              variant="outlined"
              onChange={(value) => {
                setLastname(value.target.value);
              }}
            />
            <TextField
              error={validateString(user?.email) === false}
              helperText={validateString(user?.email) === false ? 'Email is required' : ''}
              className="w-48"
              autoFocus
              margin="dense"
              id="name"
              placeholder="Email Address"
              type="email"
              variant="outlined"
              value={user?.email ?? ''}
              onChange={(value) => {
                setUser({ ...user, email: value.target.value });
              }}
            />
            <TextField
              className="w-48"
              margin="normal"
              id="role"
              select
              label="Role"
              placeholder="Role"
              variant="outlined"
              value={user?.role ?? ''}
              onChange={(event) => {
                setUser({ ...user, role: event.target.value });
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="w-48"
              autoFocus
              error={validateString(user?.phoneno) === false}
              helperText={validateString(user?.phoneno) === false ? 'Phone Number is required' : ''}
              margin="dense"
              id="phone"
              placeholder="Phone Number"
              type="number"
              variant="outlined"
              value={user?.phoneno ?? ''}
              onChange={async (value) => {
                setUser({ ...user, phoneno: value.target.value });
              }}
            />
            {user?.role === 'Developer' && (
              <TextField
                className="w-48"
                autoFocus
                error={validateString(user?.github) === false}
                helperText={validateString(user?.github) === false ? 'Github Username is required' : ''}
                margin="dense"
                id="github"
                placeholder="Github Username"
                type="text"
                variant="outlined"
                value={user?.github ?? ''}
                onChange={async (value) => {
                  setUser({ ...user, github: value.target.value });
                }}
              />
            )}
            <div className="flex flex-row items-center justify-end w-full">
              <button
                className="border-2 rounded-2xl border-blue-800 w-24 h-9 my-10 text-blue-800 mr-10"
                type="button"
                onClick={() => {
                  setUser({});
                  setOpen(false);
                }}
              >
                Cancel

              </button>
              <div className="flex bg-zinc-400 rounded-2xl w-24 h-9">
                <Button
                  className="w-full"
                  onClick={handleSubmit}
                >
                  <div className="text-white"><p className="capitalize text-center">Submit</p></div>

                </Button>
              </div>
            </div>

          </DialogContent>
        </div>
      </Dialog>

    </div>

  );
}
AddUserDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  oldUser: PropTypes.any
};

export default memo(AddUserDialog);
