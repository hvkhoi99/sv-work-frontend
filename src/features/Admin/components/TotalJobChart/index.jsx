import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from "react-chartjs-2";

TotalJobChart.propTypes = {
  chartData: PropTypes.object
};

TotalJobChart.defaultProps = {
  chartData: {}
}

function TotalJobChart(props) {
  const { chartData } = props;

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Recruitment',
        data: chartData.total_recruitments,
        backgroundColor: [
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      },
      {
        label: 'Application',
        data: chartData.total_applications,
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(153, 102, 255)',
        ],
        borderWidth: 1
      },
    ]
  };
  return (
    <>
      <Bar
        data={data}
        options={{
          scales: {
            yAxis: {
              title: {
                display: true,
                text: 'Total recruitment',
                color: 'rgb(153, 102, 255)',
              },
              ticks: {
                precision: 0,
                
              },
              suggestedMin: 0,
              suggestedMax: 5
            },
          }
        }}
      />
    </>
  );
}

export default TotalJobChart;