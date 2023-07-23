/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { decodeToken } from 'react-jwt';
import { GET_PROJECT_TIMELINE } from '../../constants/apiEndpoints';
import makeRequest from '../../utils/makeRequest';
import BouncingDotsLoader from '../BouncingDotsLoader';

function CurrentSprintStories(props) {
  const { projectId, isDevStories } = props;
  const [stories, setStories] = useState([]);
  const [onlyDevStories, setOnlyDevStories] = useState(isDevStories);
  const [devStories, setDevStories] = useState([]);
  const [swimlanes, setSwimlanes] = useState([]);

  const handleSelectDeveloperOnlyStories = () => {
    setOnlyDevStories(!onlyDevStories);
  };

  useEffect(() => {
    if (isDevStories) {
      const decodedToken = decodeToken(localStorage.getItem('accessToken'));

      const filteredDevStories = JSON.parse(JSON.stringify(stories));
      const statuses = Object.keys(filteredDevStories.issues);
      statuses.forEach((status) => {
        filteredDevStories.issues[status] = filteredDevStories.issues[status].filter(
          (story) => story.assignee === decodedToken.name
        );
      });
      if (!filteredDevStories.isEmpty) { setDevStories(filteredDevStories); }
      setOnlyDevStories(isDevStories);
    } else {
      setOnlyDevStories(false);
    }
  }, [isDevStories]);

  useEffect(() => {
    const fetchStories = async () => {
      const token = localStorage.getItem('accessToken');
      const response = await makeRequest(GET_PROJECT_TIMELINE(projectId), {}, { headers: { 'x-auth-token': token } });
      console.log('response', response);
      setStories(response);
      setSwimlanes(Object.keys(response.issues));
    };
    fetchStories();
  }, []);
  const swimlaneColors = ['bg-zinc-400', 'bg-[#2C72CF]', 'bg-emerald-400', 'bg-lime-400'];
  const swimlaneTitleColors = ['text-white', 'text-white', 'text-white', 'text-white'];

  return stories.length > 0 || swimlanes.length > 0 ? (
    <div className="current-sprint-stories">
      <div className="flex flex-row w-full justify-around">
        {swimlanes?.map((swimlane, index) => {
          const i = index;
          return (
            <div className="w-9/12 border-4 border-white ">
              <div className={`flex flex-row justify-center rounded-xl items-center my-2.5 mx-2 h-14 border-4 border-white ${swimlaneColors[i]} w-9/12`}>
                <h1 className={`text-2xl ${swimlaneTitleColors[i]}`}>{swimlane}</h1>
                <h1 className="ml-4 text-2xl">|</h1>
                <h2 className="ml-4
                 text-2xl
                  text-white"
                >
                  {onlyDevStories
                    ? devStories?.issues[swimlane]?.length : stories.issues[swimlane].length}

                </h2>
              </div>
              <div className="flex flex-col h-25v overflow-scroll mt-8 mx-2">
                {onlyDevStories
                  ? devStories?.issues[swimlane]?.map((story) => (
                    <div className="flex flex-row h-24 justify-between mb-4 w-9/12 rounded-md shadow-md">
                      {/* <div className={`w-3 ${'bg-McKinseyBlue'}`} /> */}

                      <div className="flex flex-col mx-5 my-5">
                        <div className="w-40">
                          <p className="h-8 ml-2 text-xl truncate">{story.title}</p>
                        </div>

                        {story.epic && (
                          <div className={`flex h-8 w-32 text-ellipsis line-clamp-1 justify-center items-center rounded-xl ${swimlaneColors[i]}`}>
                            <p className="text-center h-8 w-11/12 truncate">{story.epic}</p>
                          </div>
                        )}

                      </div>
                      <div className="mx-5 my-5">
                        <Avatar name={story.assignee} size="50" round="50px" />
                      </div>

                    </div>
                  ))
                  : stories.issues[swimlane].map((story) => (
                    <div className="flex flex-row h-24 justify-between mb-4 w-9/12 rounded-md shadow-md">
                      {/* <div className={`w-3 ${'bg-McKinseyBlue'}`} /> */}

                      <div className="flex flex-col mx-5 my-5">
                        <div className="w-40">
                          <p className="h-8 ml-2 text-xl truncate">{story.title}</p>
                        </div>

                        {story.epic && (
                          <div className={`flex h-8 w-32 text-ellipsis line-clamp-1 justify-center items-center rounded-xl ${swimlaneColors[i]}`}>
                            <p className="text-center h-8 w-11/12 truncate">{story.epic}</p>
                          </div>
                        )}

                      </div>
                      <div className="mx-5 my-5">
                        <Avatar name={story.assignee} size="50" round="50px" />
                      </div>

                    </div>
                  ))}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center mt-16 ml-24" data-testid="bouncing-dots-loader">
      <BouncingDotsLoader />
    </div>
  );
}
CurrentSprintStories.propTypes = {
  projectId: PropTypes.string.isRequired,
  isDevStories: PropTypes.bool.isRequired
};

export default CurrentSprintStories;
