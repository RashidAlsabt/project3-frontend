import React, { useState, useEffect, useCallback, useRef } from 'react'
import { deleteTrasnaction, getAllTransaction } from '../service/transactionService'
import { useNavigate } from 'react-router'

function Transactions() {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const page = useRef(1)
  const seen = useRef(new Set())
  const limit = 10
  const navigate = useNavigate()
  const loadMore = useCallback(async () => {
    if (loading || done) return
    setLoading(true)

    try {
      const res = await getAllTransaction(page.current, limit)
      const newtransactions = res.data.filter(transaction => {
        if (!seen.current.has(transaction._id)) {
          seen.current.add(transaction._id)
          return true
        }
        return false
      })

      if (newtransactions.length > 0) {
        setList(prev => [...prev, ...newtransactions])
        page.current += 1
      } else {
        setDone(true)
      }
    } catch (err) {
      console.log('Error:', err)
    } finally {
      setLoading(false)
    }
  }, [loading, done])

  useEffect(() => {
    loadMore()
  }, [])

  useEffect(() => {
    let timer = null

    const onScroll = () => {
      if (timer) return

      timer = setTimeout(() => {
        timer = null
        if (
          window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.offsetHeight
        ) {
          loadMore()
        }
      }, 300)
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [loadMore])

  const handleDelete = async (transactionId) => {
    try {
      await deleteTrasnaction(transactionId)
      setList(prevList => prevList.filter(transaction => transaction._id !== transactionId))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <div className='main-content'>
      <h5 className="dashboard-title">All Transactions</h5>
      <button className="view-more" onClick={() => {navigate('/transaction/create')}}>Add Transaction</button>
      {list.map((transaction) => (
        <div className="full-width-card" key={transaction._id}>
          <div>
            <div className="card-header">
              <h3 className="transaction-title">{transaction.category_id.name}</h3>
              <h3 className="transaction-title">Spend: ${transaction.amount}</h3>
            </div>
            <h2 className='transaction-desc'>{transaction.description}</h2>
            <div className="card-header">
              <h2 className='transaction-sub-info'>Done through: {transaction.payment_id.name}</h2>
              <h2 className='transaction-sub-info'>Created at: {transaction.createdAt}</h2>
            </div>
          </div>
          <div className="end-tools-header">
            <button onClick={() => {
              navigate(`/transaction/${transaction._id}/edit`)
            }} >✏️</button>
            <button onClick={() => handleDelete(transaction._id)}>🗑️</button>
          </div>
        </div>
      ))}
      {loading && <p>Loading more...</p>}
      {done && <p>No more transactions to show</p>}
    </div>
  )
}

export default Transactions
