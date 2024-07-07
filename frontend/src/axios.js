import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  //baseURL: 'https://api-homesquad.onrender.com/'
  baseURL: 'https://localhost:5000/'
});

export default instance;