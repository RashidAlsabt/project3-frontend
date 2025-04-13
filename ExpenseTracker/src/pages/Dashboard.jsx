import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { getAllTransaction, getGraphDetails } from '../service/transactionService'

ChartJS.register(ArcElement, Tooltip, Legend)

const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const [totalAverage, setAverage] = useState(0.0)
  const [allCategories, setCategories] = useState([])
  const [allPayments, setPayments] = useState([])

  const navigate = useNavigate()

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  async function getTransactions() {
    try {
      const fetchedTransactions = await getAllTransaction(1, 5)
      setTransactions(fetchedTransactions.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getGraphs() {
    try {
      const fetchedGraphss = await getGraphDetails()
      setAverage(fetchedGraphss.chartsDetails.totalSpendedAmount)
      setCategories(fetchedGraphss.chartsDetails.categories)
      setPayments(fetchedGraphss.chartsDetails.payments)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getGraphs()
    getTransactions()
  },[])

  let remaining = 0.0
  let overBudget = 0.0
  const totalCalculation = 700000 - totalAverage

  if (totalCalculation > 0) {
    remaining = totalCalculation
  } else {
    overBudget = totalCalculation
  }

  

  const pieData1 = {
    labels: ["Over Budget",'Spend', 'Remaining'],
    datasets: [
      {
        data: [overBudget, totalAverage, remaining],
        backgroundColor: ['#4CAF50', '#FFC107', '#2196F3'],
        hoverOffset: 4,
      },
    ],
  }

  const pieData2 = {
    labels: allCategories.map(cat => cat.category_name),
    datasets: [
      {
        data: allCategories.map(cat => cat.total),
        backgroundColor: allCategories.map(() => generateRandomColor()),
        hoverOffset: allCategories.length,
      },
    ],
  }

  const pieData3 = {
    labels: allPayments.map(pay => pay.payment_name),
    datasets: [
      {
        data: allPayments.map(pay => pay.count),
        backgroundColor: allPayments.map(() => generateRandomColor()),
        hoverOffset: allPayments.length,
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
              <div className="end-tools-header">
                  <button>✏️</button>
                  <button>🗑️</button>
              </div>
            </div>
          )
        })
      }
      <button className="view-more" onClick={() => {navigate('/transactions')}}>View More</button>
    </div>
  )
}

export default Dashboard
