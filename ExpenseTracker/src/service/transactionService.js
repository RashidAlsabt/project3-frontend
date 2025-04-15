import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/transaction`;

const api = axios.create({
    baseURL: BASE_URL 
});

const token = localStorage.getItem("token")
  
const getAllTransaction = async (page, limit) => {
    try {
        const res = await api.get(`/${page}/${limit}`, {headers:{Authorization:`Bearer ${token}`}}); 
        console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const getGraphDetails = async () => {
    try {
        const res = await api.get(`/graph-details`, {headers:{Authorization:`Bearer ${token}`}}); 
        console.log('res', res.data);
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const getOneTransaction = async (id) => {
    try {
        const res = await api.get(`/${id}`, {headers:{Authorization:`Bearer ${token}`}}); 
        return res.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};

const updateTransaction = async (id, data) => {
    try {
        const res = await api.put(`/${id}`, data);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

const deleteTrasnaction = async (id) => {
    try {
        const res = await api.delete(`/${id}`, {headers:{Authorization:`Bearer ${token}`}});
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

const createTrasnaction = async (data) => {
    try {
        const res = await api.post(`/`, data, {headers:{Authorization:`Bearer ${token}`}});
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export { 
    getAllTransaction,
    getGraphDetails,
    getOneTransaction,
    updateTransaction,
    deleteTrasnaction,
    createTrasnaction,
};