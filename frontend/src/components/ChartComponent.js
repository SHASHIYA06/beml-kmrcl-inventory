import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ inventory }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Inventory Levels',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const labels = inventory.map((item) => item[0]);
    const data = inventory.map((item) => parseInt(item[1]));
    setChartData({
      labels,
      datasets: [
        {
          label: 'Inventory Levels',
          data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    });
  }, [inventory]);

  return <Line data={chartData} />;
};

export default ChartComponent;
