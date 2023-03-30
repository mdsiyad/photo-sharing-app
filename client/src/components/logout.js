import React,{useEffect} from 'react'
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API } from "../utils/API";
export default function Logout() {
    const navigate = useNavigate();


    const logout = async (user) => {
        try {
          const response = await API.get(
            "/api/users/logout",
            
          );
    
          return response;
        } catch (error) {
            console.log(error.response.data.errors)
          return error.response.data
        }
      };


    useEffect(() => {

      logout()
        localStorage.removeItem('id')
        navigate("/");
        toast.warn("You logged out");
   
    }, [navigate])
    
  return (
    <div>logout</div>
  )
}
