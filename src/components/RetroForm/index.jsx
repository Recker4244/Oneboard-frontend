/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './RetroForm.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

function RetroForm({ click, setClick }) {
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);
  const [name, setName] = useState('');
  const [actions, setAction] = useState([]);
  const [title, setTitle] = useState('');
  const [buttonclick, setButtonClick] = useState(false);
  const [retroTitle, setRetroTitle] = useState('');
  const { id } = useParams();
  const handleTitleInput = (e) => {
    e.preventDefault();
    setRetroTitle('');
    setTitle(e.target.value);
  };

  const handleFileInput = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleClickButton = () => {
    setClick(!click);
  };
  const handleClick = () => {
    setRetroTitle(title);
    setSubmit(true);
  };
  useEffect(() => {
    const handleSubmit = async () => {
      const data = new FormData();
      data.append('image', file);
      console.log(actions);
      data.append('project_id', `${id}`);
      data.append('title', retroTitle);
      actions.forEach((action) => {
        data.append('action_items', action.name);
      });
      // console.log(data);

      const config = {
        method: 'post',
        url: 'http://localhost:8080/retro/',
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('accessToken')
        }
      };

      try {
        const response = await axios(config);
        console.log(JSON.stringify(response.data));
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    };

    if (submit) {
      handleSubmit();
    }
    // setFile();
  }, [submit, file, retroTitle, actions]);

  const deleteEntry = (actionName) => {
    const newAction = actions.filter((item) => item.name !== actionName);
    setAction(newAction);
  };

  return (
    <div className="retro-form z-50">
      <div className="retro-form-content">
        <div className="retro-form-title">
          <div className="retro-form-title-left">
            <input
              type="text"
              placeholder="Retro Board Title"
              onChange={handleTitleInput}
              className="title-input"
              data-testid="retro-title"
            />
          </div>
          <button type="button" className="cancel-button" onClick={handleClickButton} data-testid="cancel-button"><CloseRoundedIcon sx={{ fontSize: 40 }} /></button>

        </div>
        <div className="retro-form-body">
          <div className="label-container">
            <label htmlFor="input-tag" className="upload-image">
              {!file && (
              <div className="upload-images">
                <FileUploadIcon fontSize="large" />
                <h2 data-testid="retro-form">Upload Retro Board Images</h2>

                <input type="file" id="input-tag" onChange={handleFileInput} />
              </div>
              )}

              {/* create a preview for input image */}
              {file && (
                <div className="re-upload-image">
                  <img src={URL.createObjectURL(file)} alt="preview" />
                  <div className="re-upload">
                    <FileUploadIcon fontSize="large" />
                    <h3>Re-upload Retro Board Image</h3>
                  </div>
                  <input type="file" id="input-tag" onChange={handleFileInput} />
                </div>
              )}
            </label>
          </div>
          {/* <input type="file" className="retro-from-body" onChange={handleFileInput} /> */}
          <div className="retro-form-body-right">
            <h1>ACTION ITEMS</h1>
            {buttonclick && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Action Items"
              // data-testid="action-item-update"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && name.trim().length > 0) {
                  // setName('');
                  setButtonClick(!buttonclick);
                  setAction((item) => [
                    ...item,
                    {
                      // id: nextId + 1,
                      name
                    }
                  ]);
                }
              }}
              // placeholder="Action Items"
              className="action-item-input"
            />
            )}
            {!buttonclick && (
            <button
              type="submit"
              onClick={() => {
                setName('');
                setButtonClick(!buttonclick);
              }}
            >
              + Add an item
            </button>
            )}
            <ul className="action-lists" data-testId="action-lists">
              {actions.map((action) => (
                // eslint-disable-next-line no-alert
                <li key={action.id} className="action-list" onClick={() => deleteEntry(action.name)} data-testId="delete-action-item">
                  {action.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="rounded-3xl border-2 text-sm bg-button-hover text-white hover:font-bold w-36 h-10 mr-10" onClick={handleClick} data-TestId="submit-button">
            Submit
          </button>
        </div>

      </div>
    </div>

  );
}

RetroForm.propTypes = {
  click: PropTypes.bool.isRequired,
  setClick: PropTypes.func.isRequired
};

export default RetroForm;
