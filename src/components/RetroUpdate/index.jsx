/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import './RetroUpdate.css';

function RetroUpdate(props) {
  const {
    id, retroBoard, edit, setEdit, click, setClick
  } = props;
  const [updatefile, setUpdateFile] = React.useState();
  const [updateTitle, setUpdateTitle] = React.useState(retroBoard.title);
  // const [updateActionItem, setUpdateActionItem] = React.useState(retroBoard.action_items);
  // const [titleInput, setTitleInput] = React.useState(false);
  const [buttonclick, setButtonClick] = useState(false);
  const [name, setName] = useState('');

  const handleClick = () => {
    setEdit(!edit);
  };

  const handleTitleUpdate = (e) => {
    e.preventDefault();
    setUpdateTitle(e.target.value);
  };
  const handleFileUpdate = (e) => {
    e.preventDefault();
    setUpdateFile(e.target.files[0]);
  };

  const [actionItems, setActionItems] = useState(retroBoard.action_items);
  const [updateActionIndex, setUpdateActionIndex] = useState(null);
  const [updateActionValue, setUpdateActionValue] = useState('');

  // function to update an action item
  const updateActionItem = (index, updatedItem) => {
    const updatedItems = [...actionItems];
    updatedItems[index] = updatedItem;
    setActionItems(updatedItems);
  };

  // function to handle edit button click
  const handleActionItemEdit = (index) => {
    setUpdateActionIndex(index);
    setUpdateActionValue(actionItems[index]);
  };

  const handleActionItemDelete = (index) => {
    const updatedItems = [...actionItems];
    updatedItems.splice(index, 1);
    setActionItems(updatedItems);
  };

  const handleDetails = () => {
    setClick(!click);
  };

  // function to handle input change
  const handleActionItemChange = (event) => {
    setUpdateActionValue(event.target.value);
  };

  // function to handle form submit
  const handleActionItemSubmit = () => {
    // event.preventDefault();
    updateActionItem(updateActionIndex, updateActionValue);
  };
  const [updateRetroTitle, setUpdateRetroTitle] = useState('');
  const [submit, setSubmit] = useState(false);
  // create a retro board update form here and pass the data to the backend with retro button at field title and action items and image
  const handleClickSubmit = () => {
    setUpdateRetroTitle(updateTitle);
    setSubmit(true);
  };
  useEffect(() => {
    const handleSubmit = async () => {
      const data = new FormData();
      data.append('image', updatefile);
      data.append('title', updateRetroTitle);
      actionItems.forEach((action) => {
        data.append('action_items', action);
      });
      // console.log(data);

      const config = {
        method: 'put',
        url: `http://localhost:8080/retro/update/${id}`,
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
  }, [submit, updatefile, updateRetroTitle, actionItems]);

  return (

    <div className="retro-form">
      <div className="retro-form-content">
        <div className="retro-form-heading-update">
          <div className="retro-update-left">
            <input
              type="text"
              value={updateTitle}
              onChange={handleTitleUpdate}
              className="header-input"
              data-testid="retro-title"
            />

          </div>
          <button type="button" className="cancel-button-retro-update" onClick={handleDetails}><CloseRoundedIcon sx={{ fontSize: 40, fontWeight: 900 }} data-testid="close-button" /></button>
        </div>
        <div className="retro-form-body-details-update">
          <label htmlFor="input-tag" className="upload-image-update">
            {!updatefile && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <div className="re-upload-images-update">
                <img
                  data-testid="retro-image"
                  src={`${retroBoard.image_path}`}
                  alt="retro"
                />
                <div className="re-upload-update">
                  <FileUploadIcon fontSize="large" />
                  <h3>Re-upload Retro Board Image</h3>
                  <input type="file" id="input-tag" onChange={handleFileUpdate} />
                </div>

              </div>
            )}
            {updatefile && (
              <div className="re-upload-image-update">
                <img src={URL.createObjectURL(updatefile)} alt="preview" />
                <div className="re-upload-update">
                  <FileUploadIcon fontSize="large" />
                  <h3>Change the file</h3>
                  <input type="file" id="input-tag" onChange={handleFileUpdate} />
                </div>

              </div>
            )}
          </label>

          <vr />
          <div className="retro-details-right-update">
            <h1>ACTION ITEMS</h1>
            {buttonclick && (
            <input
            //   value={name}

              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && name.trim().length > 0) {
                  setActionItems([...actionItems, name]);
                  //   setName('');
                  setButtonClick(!buttonclick);
                }
              }}
              // placeholder="Action Items"
              className="action-item-input-update"
            />
            )}
            {!buttonclick && (
            <button
              type="submit"
              className="action-item-button-update"
              onClick={() => {
                // setName('');
                setButtonClick(!buttonclick);
              }}
              data-testid="add-item"
              // data-testid="add-action-item"
            >
              +Add an item
            </button>
            )}
            <ul className="action-items-details-update" data-testid="action-item-count">
              {actionItems.map((action, index) => (
                <li key={index}>
                  {updateActionIndex !== index ? (
                    <div className="list-update">
                      <div className="li-title">{action}</div>
                      <div className="list-container">
                        <button type="button" className="edit-button-update" onClick={() => handleActionItemEdit(index)} data-testid="action-item-input"><EditIcon sx={{ fontSize: 30, fontWeight: 900 }} /></button>
                        <button type="button" className="delete-button-update" onClick={() => handleActionItemDelete(index)}><DeleteOutlineIcon sx={{ fontSize: 30, fontWeight: 900 }} /></button>
                      </div>
                    </div>
                  ) : (
                  // <form onSubmit={handleActionItemSubmit}>
                    <input
                      type="text"
                      value={updateActionValue}
                      onChange={handleActionItemChange}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleActionItemSubmit();
                          setUpdateActionIndex(null);
                        }
                      }}
                      className="action-item-input-update-list"
                      data-testid="action-item-input"
                    />
                  // </form>

                  )}
                </li>
              ))}

            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-5 mr-10">
          <button type="submit" className="rounded-3xl border-2 text-sm text-button-hover text-blue hover:font-bold w-36 h-10 mr-5" onClick={handleClick} data-testid="cancel-button">
            Cancel
          </button>

          <button type="submit" className="rounded-3xl border-2 text-sm bg-button-hover text-white hover:font-bold w-36 h-10 mr-30" onClick={handleClickSubmit} data-testid="update-button">
            Submit
          </button>
        </div>

      </div>
    </div>
  );
}

RetroUpdate.propTypes = {
  retroBoard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image_path: PropTypes.string.isRequired,
    action_items: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  edit: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  click: PropTypes.bool.isRequired,
  setClick: PropTypes.func.isRequired
};

export default RetroUpdate;
