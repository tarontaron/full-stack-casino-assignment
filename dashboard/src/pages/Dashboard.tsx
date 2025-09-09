import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Legend);

const pieChartData = {
  labels: ['Test 1', 'Test 2', 'Test 3'],
  datasets: [
    {
      label: 'Some Statistic',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const Dashboard = () => {
  return (
    <div style={{ width: '50%', height: 200 }}>
      <Pie data={pieChartData} />
    </div>
  );
};

export default Dashboard;
