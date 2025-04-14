import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

const api = axios.create({
    baseURL: BASE_URL 
});
  
const getAllPayments = async () => {
    try {
        const res = await api.get(`/payment`); 
        console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};
  
const getAllCategories = async () => {
    try {
        const res = await api.get(`/category`); 
        console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const createCategory = async (data) => {
    try {
        const res = await api.post(`/category/`, data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

const createPayment = async (data) => {
    try {
        const res = await api.post(`/payment/`, data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (id) => {
    try {
        const res = await api.delete(`/category/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

const deletePayment = async (id) => {
    try {
        const res = await api.delete(`/payment/${id}`);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export { 
    getAllCategories,
    getAllPayments,
    createCategory,
    createPayment,
    deleteCategory,
};