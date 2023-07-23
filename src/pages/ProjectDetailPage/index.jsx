/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable jsx-a11y/aria-role */
import { React, useState } from 'react';
import { decodeToken } from 'react-jwt';
import { useParams } from 'react-router-dom';
import {
  FormControl, FormControlLabel, Radio, RadioGroup
} from '@mui/material';
import Navbar from '../../components/Navbar';
import DeepdivePageHeader from '../../components/DeepdivePageHeader';
import DeepdivePageBodyContainer from '../../components/DeepdivePageBodyContainer';
import CostDisplayer from '../../components/CostDisplayer';
import CommitDisplayer from '../../components/CommitDisplayer';
import EffortDistribution from '../../components/EffortDistribution';
import EventCalendar from '../../components/EventCalendar';

import RollOfDate from '../../components/RollOfDateForDeveloperPage';
import TeamDistribution from '../../components/TeamDistribution';
import TeamMemberBox from '../../components/TeamMemberBox';
import ProjectTimelineGraph from '../../components/ProjectTimelineGraph';
import RetroBoardGallery from '../../components/RetroBoardGallery';
import RetroBoard from '../../components/RetroBoard';
import VelocityDisplayer from '../../components/VelocityDisplayer';
import SonarqubeDetails from '../../components/SonarqubeDetails';
import CurrentSprintStories from '../../components/CurrentSprintStories';
import WidgetInfo from '../../components/WidgetInfo';

function ProjectDetailPage() {
  const token = localStorage.getItem('accessToken');
  const myDecodedToken = decodeToken(token);
  const { role } = myDecodedToken;
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [devOnly, setDevOnly] = useState(false);
  const [eventFilter, setEventFilter] = useState('allEvents');

  const developerDetailPage = () => (
    <div>
      <Navbar />
      <DeepdivePageHeader role="developer">
        <CommitDisplayer />
        <VelocityDisplayer />
        <RollOfDate projectId={id} />
      </DeepdivePageHeader>
      <DeepdivePageBodyContainer>
        <div className="flex flex-row">
          <div className="flex flex-col bg-white h-[470px] w-full p-6 m-6 pt-2 ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <p className="text-2xl text-[#040b81] font-bold">Current Sprint Stories</p>
                <WidgetInfo widgetName="sprint stories" />
              </div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={devOnly ? 'Mine' : 'All'}
                  onChange={(e) => {
                    setDevOnly(e.target.value === 'Mine');
                  }}
                >
                  <FormControlLabel value="All" control={<Radio />} label="All" />
                  <FormControlLabel value="Mine" control={<Radio />} label="Mine" />
                </RadioGroup>
              </FormControl>
            </div>
            <CurrentSprintStories projectId={id} isDevStories={devOnly} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="bg-white w-full p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <SonarqubeDetails />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div className="flex justify-between">
              <div className="flex items-center">
                <p className="text-2xl mb-2 text-[#040b81] font-bold">Project Calendar </p>
                <WidgetInfo widgetName="events calendar" />
              </div>
              <div className="flex flex-row items-center gap-1 justify-self-end">
                <input type="radio" name="calendar" value="allEvents" defaultChecked className="ml-2" onChange={() => setEventFilter('allEvents')} />
                <p className="text-[#040b81]">All</p>
                <input type="radio" name="calendar" value="events" className="ml-2" onChange={() => setEventFilter('events')} />
                <p className="text-[#040b81]">Events</p>
                <input type="radio" name="calendar" value="pto" className="ml-2" onChange={() => setEventFilter('pto')} />
                <p className="text-[#040b81]">PTOs</p>
              </div>
            </div>
            <EventCalendar role={role} eventFilter={eventFilter} />
          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2">
            <div className="flex">
              <p className="text-2xl text-[#040b81] font-bold">Retro Board Gallery</p>
              <WidgetInfo widgetName="retro board gallery" />
            </div>
            <RetroBoard role="developer" />
          </div>
        </div>
      </DeepdivePageBodyContainer>
    </div>
  );

  const managerDetailPage = () => (
    <div>
      <Navbar />
      <DeepdivePageHeader role="manager">
        <CostDisplayer />
      </DeepdivePageHeader>
      <DeepdivePageBodyContainer>
        <div className="flex flex-row">
          <div className="flex flex-col bg-white h-[470px] w-full p-6 m-6 pt-2 ">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <p className="text-2xl text-[#040b81] font-bold">Current Sprint Stories</p>
                <WidgetInfo widgetName="sprint stories" />
              </div>
            </div>
            <CurrentSprintStories projectId={id} isDevStories={devOnly} />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 ">
            <div className="flex">
              <p className="text-2xl mb-2 text-[#040b81] font-bold">Burndown Chart</p>
              <WidgetInfo widgetName="project timeline" />
            </div>
            <ProjectTimelineGraph />
          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 ">
            <div className="flex">
              <p className="text-2xl mb-2 text-[#040b81] font-bold">Effort Distribution</p>
              <WidgetInfo widgetName="effort distribution" />
            </div>
            <EffortDistribution />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 ">
            {/* <p className="text-2xl mb-2 text-[#040b81] font-bold">Repositories</p> */}
            {/* <SonarqubeDetails /> */}
            <TeamMemberBox />

          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2">
            <div className="flex mb-2">
              <p className="text-2xl mb-2 text-[#040b81] font-bold">Retro Board Gallery</p>
              <WidgetInfo widgetName="retro board gallery" />
            </div>
            <RetroBoardGallery />
          </div>
        </div>
      </DeepdivePageBodyContainer>
    </div>
  );

  const leadershipDetailPage = () => (
    <div>
      <Navbar />
      <DeepdivePageHeader role="leadership">
        <CostDisplayer />
      </DeepdivePageHeader>
      <DeepdivePageBodyContainer>
        <div className="flex flex-row max-sm:flex-col max-md:flex-col">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            {/* <div className="flex mb-2">
              <p className="text-2xl text-[#040b81] font-bold">Team Members</p>
              <WidgetInfo widgetName="team members" />
            </div> */}
            <TeamMemberBox />
          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div className="flex mb-2">
              <p className="text-2xl text-[#040b81] font-bold">Team Distribution Graph</p>
              <WidgetInfo widgetName="team distribution graph" />
            </div>
            <TeamDistribution />
          </div>
        </div>
        <div className="flex flex-row max-sm:flex-col max-md:flex-col">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div className="flex">
              <p className="text-2xl mb-2 text-[#040b81] font-bold">Burndown Chart</p>
              <WidgetInfo widgetName="project timeline" />
            </div>
            <ProjectTimelineGraph />
          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div className="flex">
              <p className="text-2xl mb-2 text-[#040b81] font-bold">Effort Distribution</p>
              <WidgetInfo widgetName="effort distribution" />
            </div>
            <EffortDistribution />
          </div>
        </div>
        <div className="flex flex-row max-sm:flex-col max-md:flex-col">
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div className="flex justify-between">
              <div className="flex items-center">
                <p className="text-2xl mb-2 text-[#040b81] font-bold">Project Calendar </p>
                <WidgetInfo widgetName="events calendar" />
              </div>
              <div className="flex flex-row items-center gap-1 justify-self-end">
                <input type="radio" name="calendar" value="allEvents" defaultChecked className="ml-2" onChange={() => setEventFilter('allEvents')} />
                <p className="text-[#040b81]">All</p>
                <input type="radio" name="calendar" value="events" className="ml-2" onChange={() => setEventFilter('events')} />
                <p className="text-[#040b81]">Events</p>
                <input type="radio" name="calendar" value="pto" className="ml-2" onChange={() => setEventFilter('pto')} />
                <p className="text-[#040b81]">PTOs</p>
              </div>
            </div>
            <EventCalendar role={role} eventFilter={eventFilter} />
          </div>
          <div className="bg-white h-[470px] w-1/2 p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <div>
              <div className="flex">
                <p className="text-2xl mb-2 text-[#040b81] font-bold">Retro Board Gallery</p>
                <WidgetInfo widgetName="retro board gallery" />
              </div>
            </div>
            <RetroBoardGallery />
            {/* <RetroBoard /> */}
          </div>
        </div>
        {/* <div className="flex flex-row">
          <div className="bg-white w-full p-6 m-6 pt-2 max-md:w-full max-md:m-0">
            <SonarqubeDetails />
          </div>
        </div> */}
      </DeepdivePageBodyContainer>
    </div>
  );
  if (role === 'manager') {
    return managerDetailPage();
  }
  if (role === 'leadership') {
    return leadershipDetailPage();
  }
  return developerDetailPage();
}

export default ProjectDetailPage;
