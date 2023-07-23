/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';
import dev1 from '../../assets/images/Onboarding/Developer/1.svg';
import dev2 from '../../assets/images/Onboarding/Developer/2.svg';

function currentStepWidget(role, step) {
  const developerSteps = [
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          Welcome to your Dashboard!
        </DialogTitle>
        <img
          className="h-50v"
          src={dev1}
          alt="onboarding"
        />
        <div className="flex flex-col items-center my-10">
          <p className="xl">
            We&apos;re glad to have you onboard.
          </p>
          <p className="xl">
            We have setup your projects and metrics to be displayed at a glance
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          All at One Place
        </DialogTitle>
        <img
          className="h-50v"
          src={dev2}
          alt="onboarding"
        />
        <div className="flex flex-col items-center my-10">
          <p>
            View your team&apos;s progress, metrics and more
          </p>
          <p>
            Keep track of team events,deadlines and availability
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          Boost Your Productivity
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?w=1800&t=st=1679915717~exp=1679916317~hmac=9f22a2de2769a8662807308ff1cb48e6f6d51a432711d35ecf7810f6af543e9f"
          alt="onboarding"
        />
        <div className="my-10">
          <p>1. Check the barometer to gauge how busy you will be in the current sprint</p>
          <p>
            2. Get insights into the tech
            and roles you have been playing and choose to deepen or broaden expertise
          </p>
          <p>
            3. See key info such as Open PRs,
            Stories to complete and team availability to plan your work better

          </p>

        </div>
      </div>)

  ];
  const leadershipSteps = [
    (
      <div className="flex flex-col items-center">
        <DialogTitle align="center">
          Welcome to your Dashboard!
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/free-vector/new-employee-concept-illustration_114360-8899.jpg?w=1380&t=st=1679913015~exp=1679913615~hmac=64502aefbe7a14ce40dcfb6b02394c35f6b2af559eff1fa0ed4baa66f2817be3"
          alt="onboarding"
        />
        <div className="my-10">
          <p>
            We&apos;re glad to have you onboard
          </p>
          <p>
            Here are some quick tips to get you up and running
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle align="center">
          Quick Tips
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/premium-vector/people-configure-application-big-lcd-screen-with-gears-back-end-development-it-concept_566886-3065.jpg?w=1800"
          alt="onboarding"
        />
        <div className="my-10">
          <p className="text-md">
            1. Hub members get added
            to oneBoard via the admin panel that can be managed by IT/staffing team
          </p>
          <p className="text-md">
            2. Get your team leads(POs, Architects)
            to list your projects on OneBoard and
            see a consolidated view of the overall firm performance
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          What&apos;s In Store For You
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?w=1800&t=st=1679915717~exp=1679916317~hmac=9f22a2de2769a8662807308ff1cb48e6f6d51a432711d35ecf7810f6af543e9f"
          alt="onboarding"
        />
        <div className="my-10">
          <p>
            1. See nudges for upcoming events
            in your summary page and never miss an important project event
          </p>
          <p>
            2. Track the utilisation, productivity and
            mood of the overall Hub to take timely
            and effective course corrective measures
          </p>
          <p>
            3. Get an idea about individual project
            cost flow and performance by drilling down into the projects
          </p>
        </div>
      </div>)

  ];
  const managerSteps = [
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          Welcome to your Dashboard!
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/free-vector/new-employee-concept-illustration_114360-8899.jpg?w=1380&t=st=1679913015~exp=1679913615~hmac=64502aefbe7a14ce40dcfb6b02394c35f6b2af559eff1fa0ed4baa66f2817be3"
          alt="onboarding"
        />
        <div className="my-10">
          <p>
            We&apos;re glad to have you onboard.
            Here are some quick tips to get you up and running
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          Quick Tips
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/premium-vector/people-configure-application-big-lcd-screen-with-gears-back-end-development-it-concept_566886-3065.jpg?w=1800"
          alt="onboarding"
        />
        <div className="my-10">
          <p>
            1. Install OneBoard github app on your repository
          </p>
          <p>
            2. If your team uses sonarqube, you can link it to your dashboard
          </p>
          <p>
            3. Connect your scrum board with the dashboard
          </p>
        </div>
      </div>
    ),
    (
      <div className="flex flex-col items-center">
        <DialogTitle>
          See a summary of all your projects
        </DialogTitle>
        <img
          className="h-50v"
          src="https://img.freepik.com/free-vector/people-analyzing-growth-charts_23-2148866843.jpg?w=1800&t=st=1679915717~exp=1679916317~hmac=9f22a2de2769a8662807308ff1cb48e6f6d51a432711d35ecf7810f6af543e9f"
          alt="onboarding"
        />
        <div className="my-10">
          <p>Derive insights across work streams</p>
          <p>
            Deep Dive into project listings to get deeper understanding of your team&apos;s
            performance and plan for future success
          </p>

        </div>
      </div>)

  ];
  const steps = {
    developer: developerSteps,
    manager: managerSteps,
    leadership: leadershipSteps
  };
  return steps[role][step];
}

function progressIndicator(step) {
  console.log(step);
  return (
    <div className="flex flex-row justify-center ">
      {step === 0 ? <div className="bg-McKinseyBlue rounded-2xl w-3 h-3 mx-2" /> : <div className="bg-slate-200 rounded-2xl w-3 h-3 mx-2" />}
      {step === 1 ? <div className="bg-McKinseyBlue rounded-2xl w-3 h-3 mx-2" /> : <div className="bg-slate-200 rounded-2xl w-3 h-3 mx-2" />}
      {step === 2 ? <div className="bg-McKinseyBlue rounded-2xl w-3 h-3 mx-2" /> : <div className="bg-slate-200 rounded-2xl w-3 h-3 mx-2" />}
      {/* {step === 3 ?
       <div className="bg-McKinseyBlue rounded-2xl w-3 h-3 mx-2" />
       : <div className="bg-slate-200 rounded-2xl w-3 h-3 mx-2" />}
      {step === 4 ?
       <div className="bg-McKinseyBlue rounded-2xl w-3 h-3 mx-2" />
       : <div className="bg-slate-200 rounded-2xl w-3 h-3 mx-2" />} */}
    </div>
  );
}

function OnboardingDialog(props) {
  const { isOpen, setIsOpen, role } = props;
  const [roleOfUser, setRoleOfUser] = useState(role ?? 'developer');
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleComplete = () => {
    localStorage.setItem('isOnboarded', true);
    setIsOpen(true);
  };
  return (
    <div>
      <Dialog open={isOpen} fullWidth="true" maxWidth="lg">
        <DialogContent className="flex flex-col items-center">
          {currentStepWidget(roleOfUser, currentStep)}
          {progressIndicator(currentStep)}
          <div className="flex flex-row w-full justify-end">
            <DialogActions>
              <div className="rounded-2xl">
                <Button onClick={() => {
                  handleComplete();
                }}
                >
                  Skip
                </Button>
              </div>

              <div className="flex bg-McKinseyBlue rounded-2xl w-24 h-9">
                <Button
                  className="w-full"
                  onClick={() => {
                    if (currentStep === 2) {
                      handleComplete();
                    }
                    setCurrentStep(currentStep + 1);
                  }}
                >
                  <div className="text-white"><p className="capitalize text-center">Next</p></div>

                </Button>
              </div>
            </DialogActions>
          </div>

        </DialogContent>

      </Dialog>
    </div>

  );
}
OnboardingDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired
};
export default OnboardingDialog;
