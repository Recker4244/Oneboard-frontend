/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import * as ChartModuleMore from 'highcharts/highcharts-more.js';
import HCSoldGauge from 'highcharts/modules/solid-gauge';
import Highcharts from 'highcharts';

import HighchartsReact from 'highcharts-react-official';
import CircularProgress from '@mui/material/CircularProgress';

ChartModuleMore(Highcharts);
HCSoldGauge(Highcharts);
function VelocityGauge({ velocity, color }) {
  const [options, setOptions] = useState();
  useEffect(() => {
    const defaultChartOptions = {
      chart: {
        type: 'solidgauge',
        height: '110px',
        width: '220',
        marginTop: -30,
        marginBottom: 0,
        marginLeft: -60,
        marginRight: -60
      },
      title: null,
      pane: {
        center: ['50%', '85%'],
        size: '110%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
          innerRadius: '80%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      exporting: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      // the value axis
      yAxis: {
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        labels: {
          y: 16
        },
        min: 0,
        max: 60
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        data: [{
          color: {
            linearGradient: [0, 0, 300, 0],
            stops: [
              [0.1, '#f50f0f'], // green
              [0.5, '#DDDF0D'], // yellow
              [0.9, '#55BF3B'] // red
            ]
          },
          y: Number(velocity),
          radius: 100,
          innerRadius: 80
        }],
        dataLabels: {
          format:
                '<div style="text-align:center">'
                + '<span style="font-size:16px">{y}</span><br/>'
                + '<span style="font-size:12px;opacity:0.4"></span>'
                + '</div>'
        }
      }]
    };

    const updatedChartOptions = color ? {
      ...defaultChartOptions,
      chart: {
        ...defaultChartOptions.chart,
        backgroundColor: color,
        plotBackgroundColor: color,
        plotBackgroundImage: null,
        plotBorderWidth: 0
      },
      series: [{
        ...defaultChartOptions.series[0],
        data: [{
          ...defaultChartOptions.series[0].data[0],
          color: '#808080'
        }]
      }]
    } : defaultChartOptions;

    setOptions(updatedChartOptions);
  }, [velocity, color]);

  return velocity ? (
    <div className="velocity-speedometer-container">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  ) : (<div><CircularProgress sx={{ color: '#040B81' }} /></div>);
}

export default VelocityGauge;
