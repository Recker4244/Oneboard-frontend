/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import BarGraph from '../BarGraph';
import Heatmap from '../Heatmap';
import makeRequest from '../../utils/makeRequest';
import { GET_HEATMAP } from '../../constants/apiEndpoints';
import ProjectCountDisplayer from '../ProjectCountDisplayer';
import StaffedPeopleCountDisplayer from '../StaffedPeopleCountDisplayer';

function LeadershipLandingPageSummary() {
  const [heatmap, setHeatmap] = React.useState([]);
  React.useEffect(() => {
    // axios.get('http://localhost:8080/github/heatmap', {
    //   headers: {
    //     'x-auth-token': `${localStorage.getItem('accessToken')}`
    //   }
    // })
    makeRequest(GET_HEATMAP, {}, {
      headers: {
        'x-auth-token': localStorage.getItem('accessToken')
      }
    })
      .then((res) => {
        // console.log(res);
        setHeatmap(res);
      }).catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex">
      <div className="flex flex-1 items-center bg-[#F4F3F3] m-6 py-3 justify-between">
        <div className="flex items-center justify-center w-2/12 h-48 ml-5 bg-white rounded-2xl">
          <ProjectCountDisplayer />
        </div>
        <div className="flex items-center justify-center w-2/12 ml-5 h-48 bg-white rounded-2xl">
          <StaffedPeopleCountDisplayer />
        </div>
        <div className="flex items-center justify-center w-4/12 ml-5 h-48 bg-white rounded-2xl">
          <Heatmap data={heatmap} />
        </div>
        <div className="flex items-center justify-center w-4/12 mx-5 h-48 bg-white rounded-2xl">
          <BarGraph
            title="Pulse Check"
            y="Responses"
            x="Months"
            colors={['#FF0000', '#0000FF', '#00FF00']}
          />
        </div>
      </div>
    </div>
  );
}
export default LeadershipLandingPageSummary;
