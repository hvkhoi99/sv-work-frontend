import React from 'react';
import PropTypes from 'prop-types';
import { Line } from "react-chartjs-2";

TotalAccountChart.propTypes = {
  chartData: PropTypes.object
};

TotalAccountChart.defaultProps = {
  chartData: {}
}

function TotalAccountChart(props) {
  const { chartData } = props;
  // console.log(chartData.total_users)

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    legend: {
      display: true,
      labels: {
        boxWidth: 50,
        fontSize: 10,
        fontColor: '#bbb',
        padding: 5,
      }
    },
    datasets: [
      {
        label: 'Student',
        data: chartData.total_students,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
        ],
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Recruiter',
        data: chartData.total_recruiters,
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)'
        ],
        borderColor: [
          'green'
        ],
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'User',
        data: chartData.total_users,
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgb(153, 102, 255)',
        ],
        background: [
          'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)'
        ],
        borderWidth: 1,
        fill: true,
      },
    ],

  };

  return (
    <>
      <Line
        data={data}
        // width={100}
        // height={50}
        options={{
          responsive: true,
          // stroke: {
          //   width: 5,
          //   curve: 'smooth'
          // },
          // forecastDataPoints: {
          //   count: 7
          // },
          scales: {
            xAxis: {
              grid: {
                display: false
              }
            },
            yAxis: {
              display: true,
              stacked: false,
              // grid: {
              //   display: false,
              // },
              title: {
                display: true,
                text: 'Total account',
                color: 'orange',
              },
              ticks: {
                precision: 0,
                beginAtZero: true,
              },
              suggestedMin: 0,
              suggestedMax: 5
            }
          },
          tension: 0.4
        }}

      />
    </>
  );
}

export default TotalAccountChart;