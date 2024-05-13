import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  useEffect(() => {
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Attendance',
          borderColor: '#D32029',
          backgroundColor: 'white',
          data: [0, 10, 5, 2, 20, 30, 45],
          pointRadius: 5,
        },
      ],
    };

    const configLineChart = {
      type: 'line',
      data,
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#ACACAC', // Change legend text color to white
            },
          },
        },
        scales: {
          x: {
            ticks: {
              borderWidth: 0.5,
              color: '#ACACAC', // Change x-axis text color to white
            },
            grid: {
              borderWidth: 0.5,
              color: '#ACACAC', // Change x-axis grid color to white
            },
          },
          y: {
            ticks: {
              borderWidth: 0.5,
              color: '#ACACAC', // Change y-axis text color to white
            },
            grid: {
              borderWidth: 0.5,
              color: '#ACACAC', // Change y-axis grid color to white
            },
          },
        },
      },
    };

    const chartLine = new Chart(
      document.getElementById('chartLine'),
      configLineChart
    );

    // Clean up function
    return () => {
      chartLine.destroy();
    };
  }, []); // Empty dependency array means this effect will only run once after the initial render

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* <div className="py-3 px-5 bg-gray-50">Line chart</div> */}
      <canvas className="p-10" id="chartLine"></canvas>
    </div>
  );
};

export default LineChart;
