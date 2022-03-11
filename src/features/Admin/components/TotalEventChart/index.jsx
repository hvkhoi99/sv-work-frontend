import React from 'react';
import PropTypes from 'prop-types';
import { PolarArea } from "react-chartjs-2";

TotalEventChart.propTypes = {
  chartData: PropTypes.object
};

TotalEventChart.defaultProps = {
  chartData: {}
}

function TotalEventChart(props) {
  const { chartData } = props;

  const data = {
    labels: [
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat'
    ],
    datasets: [{
      label: 'Event',
      data: chartData.events.total,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'green'
      ]
    }]
  };

  return (
    <>
      <PolarArea
        data={data}
        options={{
          // scales: {
          //   r: {
          //     pointLabels: {
          //       display: true,
          //       centerPointLabels: true,
          //       font: {
          //         size: 18
          //       }
          //     },
          //   }
          // },
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              // text: 'Total number of events by day of the week.',
              text: 'Total event',
              position: 'left',
              color: 'rgb(255, 99, 132)',
              font: '400',
            }
          }
        }}
      />
    </>
  );
}

export default TotalEventChart;