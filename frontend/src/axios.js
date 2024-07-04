import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://api-homesquad.onrender.com/' // Replace with your API base URL
});

export default instance;