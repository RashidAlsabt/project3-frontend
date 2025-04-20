import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router'
import { createTrasnaction } from '../service/transactionService'
import { getAllCategories, getAllPayments } from '../service/customizationService'
import '../App.css'
import { authContext } from '../context/AuthContext'

function CreateTransaction() {
    const navigate = useNavigate()
    const { user } = useContext(authContext)

    const [categories, setCategories] = useState([])
    const [payments, setPayments] = useState([])

    const [formData, setFormData] = useState({
        category_id: "",
        payment_id: "",
        description: "",
        amount: "",
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function getCategories() {
        try {
            const fetchCategories = await getAllCategories()
            setCategories(fetchCategories)
        } catch (error) {
            console.log("Error fetching categories:", error)
        }
    }

    async function getPayments() {
        try {
            const fetchPayments = await getAllPayments()
            setPayments(fetchPayments)
        } catch (error) {
            console.log("Error fetching payments:", error)
        }
    }

    useEffect(() => {
        if (user) {
            getCategories()
            getPayments()
        }
    }, [user])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const requestData = {
                company_id: user._id,
                category_id: formData.category_id,
                payment_id: formData.payment_id,
                description: formData.description,
                amount: formData.amount,
            }

            console.log(requestData.company_id)
            await createTrasnaction(requestData)
            navigate("/transactions")
        } catch (err) {
            console.log(err)
        }
    }

    if (!user) return null

    return (
        <div className='main-content'>
            <h5 className="dashboard-title">Transaction Details</h5>
            <form className="form-container" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="category_id">Category</label>
                    <select
                        name="category_id"
                        id="category_id"
                        className="form-dropdown"
                        value={formData.category_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="payment_id">Payment</label>
                    <select
                        name="payment_id"
                        id="payment_id"
                        className="form-dropdown"
                        value={formData.payment_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Payment</option>
                        {payments.map((payment) => (
                            <option key={payment._id} value={payment._id}>
                                {payment.name}
                            </option>
                        ))}
                    </select>
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

                <button className='view-more'>Submit</button>
            </form>
        </div>
    )
}

export default CreateTransaction
