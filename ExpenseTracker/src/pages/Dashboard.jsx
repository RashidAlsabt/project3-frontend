import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const pieData1 = {
    labels: ['Completed', 'Pending', 'In Progress'],
    datasets: [
      {
        data: [60, 30, 10],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        hoverOffset: 4,
      },
    ],
  }

  const pieData2 = {
    labels: ['Success', 'Failure'],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ['#4CAF50', '#F44336'],
        hoverOffset: 4,
      },
    ],
  }

  const pieData3 = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        data: [40, 40, 20],
        backgroundColor: ['#FF5733', '#FFB833', '#DAF7A6'],
        hoverOffset: 4,
      },
    ],
  }

  return (
    <div>
      <h5 className="greeting">Estimated Budget : $100,000</h5>

      <div className="chart-container">
        <div className="chart-card">
          <h3 className="chart-title">Pie Chart 1</h3>
          <Pie data={pieData1} options={{responsive: true, plugins: {legend: {position: 'bottom'}, tooltip: {enabled: true}}}} />
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Pie Chart 2</h3>
          <Pie data={pieData2} options={{responsive: true, plugins: {legend: {position: 'bottom'}, tooltip: {enabled: true}}}}/>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Pie Chart 3</h3>
          <Pie data={pieData3} options={{responsive: true, plugins: {legend: {position: 'bottom'}, tooltip: {enabled: true}}}}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
