/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { decodeToken } from 'react-jwt';
import OverviewTable from '../OverviewTable';
import ProjectDialog from '../ProjectDialog';
// import SonarqubeDetails from '../SonarqubeDetails';

function LandingPageOverview() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const decodedToken = decodeToken(localStorage.getItem('accessToken'));
  const { role } = decodedToken;
  console.log('role', role);

  return (
    <div className="flex flex-1 flex-col items-center mx-6 bg-body-bg">
      <div className="flex justify-between items-center w-11/12 m-5">
        <div className="flex text-2xl font-bold">
          Project Overview
        </div>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col items-center" />
          {
          // eslint-disable-next-line no-nested-ternary
          isDialogOpen ? <ProjectDialog setIsDialogOpen={setIsDialogOpen} /> : role !== 'developer' ? (
            <button type="button" onClick={() => setIsDialogOpen(true)} className="rounded-3xl border-2 text-sm bg-button-hover border-body-bg text-white p-3 hover:data-te-ripple-color">
              Create New Project
            </button>
          ) : null
        }
        </div>
      </div>
      <div className="flex w-11/12">
        <OverviewTable />
      </div>
      <div className="w-full">
        {/* <SonarqubeDetails /> */}
      </div>

    </div>
  );
}

export default LandingPageOverview;
