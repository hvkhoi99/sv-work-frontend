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
  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(255, 205, 86)',
        'rgb(201, 203, 207)',
        'rgb(54, 162, 235)'
      ]
    }]
  };

  return (
    <>
      <PolarArea 
      data={data}
      />
    </>
  );
}

export default TotalEventChart;