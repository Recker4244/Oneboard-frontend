/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUserDialog from '../../components/AddUserDialog';

import Navbar from '../../components/Navbar';
import CustomizedTables from '../../components/Table';
import { ADD_USER_URL, GET_USERS_URL, UPDATE_USER_BY_ID_URL } from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';

function AdminDashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const getAllUsers = async () => {
    const response = await makeRequest(GET_USERS_URL, {}, { headers: { 'x-auth-token': token } });
    setUsers(response.rows);
    setTotalCount(response.count);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const addUser = async (user) => {
    setIsOpen(!isOpen);
    const newUser = await makeRequest(ADD_USER_URL, {}, { headers: { 'x-auth-token': token } }, navigate, { data: { ...user } });
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = async (user) => {
    setEditUser(user);
    setIsEdit(true);
  };

  const handlePageChange = async (newPage, rowsPerPage) => {
    const response = await makeRequest(
      GET_USERS_URL,
      { params: { page: newPage, limit: rowsPerPage } },
      { headers: { 'x-auth-token': token } },
      navigate
    );
    setUsers(response.rows);
  };
  const handleChangeRowsPerPage = async (page, rowsPerPage) => {
    const response = await makeRequest(
      GET_USERS_URL,
      { params: { page, limit: rowsPerPage } },
      { headers: { 'x-auth-token': token } },
      navigate
    );
    setUsers(response.rows);
  };

  const updateUser = async (user) => {
    setIsEdit(!isEdit);
    const newUser = await makeRequest(UPDATE_USER_BY_ID_URL, { data: { ...user } }, { headers: { 'x-auth-token': token } }, navigate);
    const index = users.findIndex((element) => element.id === newUser.id);
    setUsers([
      ...users.slice(0, index),
      newUser,
      ...users.slice(index + 1)
    ]);
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col w-4/5 ">
        <h1 className="my-8 text-2xl">User Management</h1>
        <div className="flex flex-row h-24 justify-end">
          <button type="button" onClick={handleClickOpen} className="rounded-3xl border-2 text-sm text-button-primary border-button-primary hover:bg-button-hover hover:border-body-bg hover:text-white w-36 h-10">
            Add User
          </button>
          <AddUserDialog onSubmit={addUser} title="Add User" isOpen={isOpen} setOpen={setIsOpen} />
          <AddUserDialog onSubmit={updateUser} title="Edit User" oldUser={editUser} isOpen={isEdit} setOpen={setIsEdit} />
        </div>
        <CustomizedTables
          handleUpdateUser={handleUpdateUser}
          users={users}
          totalCount={totalCount}
          handlePageChange={handlePageChange}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
