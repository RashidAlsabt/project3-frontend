import React, { useState, useEffect } from 'react'
import { getOneTransaction } from '../service/transactionService'
import { useNavigate, useParams } from 'react-router'
import '../App.css'

function EditTransaction() {
    const navigate = useNavigate()
    const { transactionId } = useParams()
    const [formData, setFormData] = useState({
        category_id: "",
        payment_id: "",
        description: "",
        amount: ""
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function getTransactionDetails() {
        try {
            const foundTransaction = await getOneTransaction(transactionId)
            setFormData({
                category_id: foundTransaction.category_id || "",
                payment_id: foundTransaction.payment_id || "",
                description: foundTransaction.description || "",
                amount: foundTransaction.amount || ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransactionDetails()
    }, [])

    return (
        <div className='main-content'>
            <h5 className="dashboard-title">Transaction Details</h5>
            <form className="form-container">
                <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <input
                        type="text"
                        name="category_id"
                        id="category_id"
                        className="form-field"
                        value={formData.category_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="payment_id">Payment</label>
                    <input
                        type="text"
                        name="payment_id"
                        id="payment_id"
                        className="form-field"
                        value={formData.payment_id}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows="4"
                        className="form-field"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        className="form-field"
                        value={formData.amount}
                        onChange={handleChange}
                    />
                </div>
            </form>
        </div>
    )
}

export default EditTransaction
