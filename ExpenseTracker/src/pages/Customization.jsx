import React, { useState, useEffect } from 'react'
import { createCategory, createPayment, getAllCategories, getAllPayments } from '../service/customizationService'
import '../App.css'

function Customization() {
    const [formData, setFormData] = useState({
        pay_name: "",
        pay_img: "",
        cat_name: "",
        cat_img: "",
    })

    const [categories, setCategories] = useState([])
    const [payments, setPayments] = useState([])

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
        getCategories()
        getPayments()
    }, [])

    async function handleSubmitCategory(e) {
        e.preventDefault()
        try {
            const requestData = {
                name: formData.cat_name,
                image_url: formData.cat_img,
            }
            await createCategory(requestData)
            await getCategories()
            setFormData(prev => ({ ...prev, cat_name: "", cat_img: "" }))
        } catch (err) {
            console.log(err)
        }
    }

    async function handleSubmitPayment(e) {
        e.preventDefault()
        try {
            const requestData = {
                name: formData.pay_name,
                image_url: formData.pay_img,
            }
            await createPayment(requestData)
            await getPayments()
            setFormData(prev => ({ ...prev, pay_name: "", pay_img: "" }))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='main-content'>
            <div className='card-header-evenly'>
                <div className='left-column'>
                    <h5 className="dashboard-title">Categories</h5>
                    <form className="form-container" onSubmit={handleSubmitCategory}>
                        <div className="form-group">
                            <label htmlFor="cat_name">Name</label>
                            <input
                                type="text"
                                name="cat_name"
                                id="cat_name"
                                className="form-field"
                                value={formData.cat_name}
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                            <label htmlFor="cat_img">Image URL</label>
                            <input
                                type="text"
                                name="cat_img"
                                id="cat_img"
                                className="form-field"
                                value={formData.cat_img}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='view-more'>Submit</button>
                    </form>
                    {categories.map((category) => (
                        <div className="full-width-card-custom" key={category._id}>
                            <div>
                                <div className="card-header">
                                    <h3 className="transaction-title">{category.name}</h3>
                                    <div className="end-tools-header-custom">
                                        <button>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='right-column'>
                    <h5 className="dashboard-title">Payments Method</h5>
                    <form className="form-container" onSubmit={handleSubmitPayment}>
                        <div className="form-group">
                            <label htmlFor="pay_name">Name</label>
                            <input
                                type="text"
                                name="pay_name"
                                id="pay_name"
                                className="form-field"
                                value={formData.pay_name}
                                onChange={handleChange}
                            />
                            <br />
                            <br />
                            <label htmlFor="pay_img">Image URL</label>
                            <input
                                type="text"
                                name="pay_img"
                                id="pay_img"
                                className="form-field"
                                value={formData.pay_img}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='view-more'>Submit</button>
                    </form>
                    {payments.map((payment) => (
                        <div className="full-width-card-custom" key={payment._id}>
                            <div>
                                <div className="card-header">
                                    <h3 className="transaction-title">{payment.name}</h3>
                                    <div className="end-tools-header-custom">
                                        <button>🗑️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Customization
