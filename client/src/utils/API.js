import axios from "axios"
export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Cache: "no-cache",
      },
      withCredentials: true,
      timeout: 60000
 })
 

