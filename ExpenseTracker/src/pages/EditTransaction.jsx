import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getOneTransaction, updateTransaction } from '../service/transactionService'
import { getAllCategories, getAllPayments } from '../service/customizationService'
import '../App.css'

function EditTransaction() {
    const navigate = useNavigate()
    const { transactionId } = useParams()

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
            console.log("Fetched categories:", fetchCategories)
            setCategories(fetchCategories)
        } catch (error) {
            console.log("Error fetching categories:", error)
        }
    }

    async function getPayments() {
        try {
            const fetchPayments = await getAllPayments()
            console.log("Fetched payments:", fetchPayments)
            setPayments(fetchPayments)
        } catch (error) {
            console.log("Error fetching payments:", error)
        }
    }

    async function getTransactionDetails() {
        try {
            const foundTransaction = await getOneTransaction(transactionId)
            setFormData({
                category_id: foundTransaction.category_id.name || "",
                payment_id: foundTransaction.payment_id.name || "",
                description: foundTransaction.description || "",
                amount: foundTransaction.amount || "",
            })
        } catch (error) {
            console.log("Error fetching transaction:", error)
        }
    }

    useEffect(() => {
        getTransactionDetails()
        getCategories()
        getPayments()
    }, [])


    async function handleSubmit(e){
        e.preventDefault()

        try{

       

            const requestData = {
                company_id: "67f540aba3cdafd584c3b51f",
                category_id: formData.category_id,
                payment_id: formData.payment_id,
                description: formData.description,
                amount: formData.amount,
            }

            console.log(`Check request: ${requestData.category_id}`)
            const response = updateTransaction( transactionId, requestData )
            navigate("/")
    
        }
        catch(err){
            console.log(err)
        }
    }

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
                        <option value="">{formData.category_id}</option>
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
                        <option value="">{formData.payment_id}</option>
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

export default EditTransaction
