import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PropTypes } from 'prop-types';

const createData = (data) => {
  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const series = Object.entries(data).map(([language, values]) => ({
    name: language,
    data: values.map((value) => (value))
  }));

  const totals = categories.map(() => 0);
  series.forEach((serie) => {
    serie.data.forEach((value, index) => {
      totals[index] += value;
    });
  });

  series.forEach((serie) => {
    // eslint-disable-next-line no-param-reassign
    serie.data = serie.data.map((value, index) => {
      const percentage = totals[index] > 0 ? (value / totals[index]) * 100 : 0;
      return {
        y: percentage,
        value
      };
    });
  });

  return {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      marginTop: 55
    },
    title: {
      text: 'Language Trend',
      style: {
        color: 'black',
        fontSize: '1.0rem',
        fontWeight: 'bold'
      },
      align: 'left',
      y: 17
    },
    xAxis: {
      categories,
      labels: {
        step: 1
      }
    },
    yAxis: {
      min: 0,
      // max: 100,
      max: 100,
      title: {
        text: 'Total'
      },
      stackLabels: {
        enabled: false,
        // formatter() {
        //   return `${(this.total / 100).toFixed(0)}%`;
        // },
        style: {
          fontWeight: 'bold',
          color:
              // theme
              'gray'
        }
      }
    },
    legend: {
      layout: 'horizontal',
      align: 'right',
      x: -5,
      verticalAlign: 'top',
      y: 0,
      floating: true,
      itemStyle: {
        textOverflow: 'ellipsis'
      },
      width: 300,
      itemWidth: 100,
      backgroundColor:
          Highcharts.defaultOptions.legend
          && Highcharts.defaultOptions.legend.backgroundColor
            ? Highcharts.defaultOptions.legend.backgroundColor
            : 'transparent',
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y:.2f}%<br/>Total: {point.stackTotal:.2f}%'
    },
    plotOptions: {
      column: {
        stacking: 'normal'
        // dataLabels: {
        //     enabled: true,
        // },
      }
    },
    credits: {
      enabled: false
    },
    series
  };
};

function StackedColumnChart({ data }) {
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={createData(data)}
      containerProps={{
        style: {
          height: '100%', width: '100%', borderRadius: '15px'
        }
      }}
    />
  );
}

// make props type safe
StackedColumnChart.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired
};

export default StackedColumnChart;
