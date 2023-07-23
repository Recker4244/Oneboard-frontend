import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';

import React from 'react';

import heatmap from 'highcharts/modules/heatmap';
// initiate the module
heatmap(Highcharts);

function HeatmapChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const options = {
    chart: {
      type: 'heatmap',
      height: 160,
      backgroundColor: 'transparent'
    },

    title: {
      align: 'left',
      text: 'Github Contribution Trend',
      style: {
        fontSize: '15px',
        fontWeight: 'bold'
      },
      y: 2
    },

    xAxis: {
      gapSize: 5,
      categories: data.map((d) => d.month),
      labels: {
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          return this.value.slice(0, 3);
        }
      }
    },

    yAxis: {
      min: 0,
      max: 0,
      gapSize: 5,
      title: {
        text: 'Commits'
      },
      categories: ['']
    },
    legend: {
      align: 'right',
      verticalAlign: 'top',
      layout: 'horizontal',
      y: -50
    },
    colorAxis: {
      min: 0,
      max: maxVal,
      stops: [
        [0, '#f8a392'],
        [0.16, '#f24725'],
        [0.33, '#fce287'],
        [0.55, '#fac712'],
        [0.67, '#9edcd0'],
        [0.833, '#0da789']
      ]
    },

    tooltip: {
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      heatmap: {
        // borderWidth: 1,
        pointPadding: 2
      }
    },
    series: [{
      type: 'heatmap',
      data: data.map((d, i) => ({
        x: i,
        y: 0,
        value: d.value
      })),
      dataLabels: {
        enabled: true,
        color: '#000000'
      }
    }]

  };
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <div className="heatmap w-full">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </React.Suspense>
  );
}

HeatmapChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    month: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired
  })).isRequired
};

export default HeatmapChart;
