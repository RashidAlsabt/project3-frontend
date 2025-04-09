import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect, useContext } from 'react'
import { getAllTransaction } from '../service/transactionService'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])

  async function getTransactions() {
    try {
      const fetchedTransactions = await getAllTransaction()
      setTransactions(fetchedTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getTransactions()
  },[])

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
        data: [85, 30],
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
    <div className='main-content'>
      <h5 className="dasboard-title">Estimated Budget : $100,000</h5>

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
      <h5 className='dasboard-title'>Transactions</h5>
      {
        transactions.map((transaction) => {
          return (
            <div className="full-width-card" key={transaction._id}>
              <div>
                <div className="card-header">
                  <h3 className="transaction-title">{transaction.category_id.name}</h3>
                  <h3 className="transaction-title">Spend: ${transaction.amount}</h3>
                </div>
                <h2 className='transaction-desc'>{transaction.description}</h2>
                <div className="card-header">
                  <h2 className='transaction-sub-info'>Done through: {transaction.payment_id.name}</h2>
                  <h2 className='transaction-sub-info'>Created at: ${transaction.createdAt}</h2>
                </div>
              </div>
            </div>
          )
  })
}
    </div>
  )
}

export default Dashboard
