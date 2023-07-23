/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { decodeToken } from 'react-jwt';
import makeRequest from '../../utils/makeRequest';
import { GET_USER, UPDATE_USER } from '../../constants/apiEndpoints';

function ProfileBox({ setUsername, username }) {
  const [isEditing, setIsEditing] = useState(false); // state to manage edit mode
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [github, setGithub] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('accessToken');
  React.useEffect(() => {
    const myDecodedToken = decodeToken(token);
    makeRequest(GET_USER(myDecodedToken.username), {}, { headers: { 'x-auth-token': token } })
      .then((res) => {
        setName(res.name);
        setEmail(res.email);
        setGithub(res.github);
        setPhone(res.phoneno);
        setRole(res.role);
        setUsername(res.username);
        setId(res.id);
      }).catch((err) => {
        setError(err);
      });
  }, []);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    setIsEditing(false);
    try {
      await makeRequest(UPDATE_USER, {
        data: {
          id, name, email, github, phoneno: phone
        }
      }, { headers: { 'x-auth-token': token } });

      setError('Updated');
    } catch (err) {
      setError(err.response.data);
    }
  };

  const renderHeading = (text) => (
    <h2 className="font-bold text-lg mb-1">{text}</h2>
  );

  const renderEditableField = (label, value, onChange) => {
    if (isEditing) {
      return (
        <input
          className="border border-black rounded-md p-2 mb-8 w-full"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
    }
    return <p className="bg-gray border border-black rounded-md p-2 mb-8">{value}</p>;
  };

  return (
    <div className="bg-white flex flex-col p-5 w-full">
      <div className="flex justify-between mb-5">
        <h1 className="text-3xl text-[#040b81] font-bold">Profile</h1>
        {isEditing
          ? <button type="button" className="bg-white hover:text-white hover:bg-black text-black font-bold py-2 px-4 rounded border border-black" onClick={handleSave}>Save Values</button>
          : <button type="button" className="bg-white hover:text-white hover:bg-black text-black font-bold py-2 px-4 rounded border border-black" onClick={handleEdit}>Edit Values</button>}
      </div>
      {setName && (
        <div className="flex flex-row">
          <div className="w-1/2 pr-4">
            {renderHeading('Username')}
            <p className="bg-gray mb-8 border border-black rounded-md p-2">{username}</p>
            {renderHeading('Name')}
            {renderEditableField({ name }, name, setName)}
            {renderHeading('Email')}
            {renderEditableField({ email }, email, setEmail)}
          </div>
          <div className="w-1/2 pl-4">
            {renderHeading('Role')}
            <p className="bg-gray mb-8 border border-black rounded-md p-2">{role}</p>
            {renderHeading('GitHub Name')}
            {renderEditableField('GitHub Name', github, setGithub)}
            {renderHeading('Phone Number')}
            {renderEditableField('Phone Number', phone, setPhone)}
          </div>
        </div>
      )}

      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white w-96 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">{error}</h2>
            <div className="flex justify-end">
              <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded" onClick={() => setError(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileBox;
