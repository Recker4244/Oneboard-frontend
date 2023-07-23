import React from 'react';
import PropTypes from 'prop-types';
import HeatmapChart from '../HeatMapPlot';

function Heatmap({ data }) {
  const months = ['April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November',
    'December', 'January', 'February', 'March'];
    // const months = ['Apr', 'May', 'Jun',
    // 'Jul', 'Aug', 'Sep',
    // 'Oct', 'Nov',
    // 'Dec', 'Jan', 'Feb', 'Mar'];
  const heatmapData = months.map((month) => ({
    month,
    value: data[month] || 0
  }));
  return (
  // heatmap for heatmapdata
    <div className="flex items-center heatmap-elements" style={{ width: '100%', height: '100%' }}>
      <HeatmapChart
            // title='Github Contribution Trend' y='responses' x='months'
        data={heatmapData}
      />
    </div>

  );
}

// prop types for data
Heatmap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired
};

export default Heatmap;

